import { Avatar } from '@mui/material'
import { useDispatch } from 'react-redux'
import { userService } from '../services/user.service'
import { updateFollowStatus } from '../store/user.actions'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'

const ActionList = ({ listType, users, onClose }) => {
    // const [usersWithUsernames, setUsersWithUsernames] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // useEffect(() => {
    //     if (usersProp && usersProp.length) {
    //         getUsernamesForList()
    //     }
    // }, [usersProp])

    // async function getUsernamesForList() {
    //     try {
    //         const fetchedUsersWithUsernames = await Promise.all(
    //             usersProp.map(async (user) => {
    //                 const username = await userService.getUsernameById(user._id)
    //                 return { ...user, username }
    //             })
    //         )
    //         setUsersWithUsernames(fetchedUsersWithUsernames)
    //     } catch (err) {
    //         console.error(
    //             'Cmp - Suggestion - Cannot get suggested users to follow',
    //             err
    //         )
    //     }
    // }

    function isFollowing(user) {
        return userService
            .getLoggedinUser()
            .following.some((followedUser) => followedUser._id === user)
    }

    async function handleToggleFollow(userId) {
        try {
            const { updatedUserToFollow, updatedCurrentUser } =
                await userService.toggleFollow(userId)
            dispatch(
                updateFollowStatus(updatedUserToFollow, updatedCurrentUser)
            )
        } catch (err) {
            console.error('Error in handleToggleFollow:', err)
        }
    }

    return (
        <div className="action-list">
            <h2 className="list-header">{listType}</h2>
            <ul>
                {users.map((user) => {
                    const followingStatus = isFollowing(user._id)
                    const toggleFollowBtnTxt = followingStatus
                        ? 'Unfollow'
                        : 'Follow'
                    return (
                        <li key={user._id} className="user-action-container">
                            <Avatar
                                onClick={() => {
                                    onClose()
                                    navigate(`/user/${user.username}`)
                                }}
                                className="user-img"
                                src={user.imgUrl}
                                alt={user.username + 'image'}
                                title={user.username + `'s image`}
                            />
                            <div className="username-fullname flex column">
                                <span
                                    className="username"
                                    onClick={() => {
                                        onClose()
                                        navigate(`/user/${user.username}`)
                                    }}
                                >
                                    {user.username}
                                </span>
                                {console.log('user fullname', user.fullname)}
                                <span>{user.fullname}</span>
                            </div>
                            <button
                                onClick={() => handleToggleFollow(user._id)}
                            >
                                {toggleFollowBtnTxt}
                            </button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default ActionList

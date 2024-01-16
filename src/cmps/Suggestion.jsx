import { useState, useEffect } from 'react'
import { userService } from '../services/user.service'
import { Avatar } from '@mui/material'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { updateFollowStatus } from '../store/user.actions'
import { useNavigate } from 'react-router'
import Loader from '../pages/Loader'
// import { toggleUserFollow } from '../store/user.actions'

export function Suggestion() {
    const loggedinUser = useSelector((storeState) => storeState.userModule.user)
    const [suggestedUsers, setSuggestedUsers] = useState([])
    // const [isFollowed, setIsFollowed] = useState(
    // user?.followers?.some(
    // (u) => u._id === userService.getLoggedinUser()?._id || false
    // )
    // )
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        loadSuggestedUsersToFollow()
    }, [])

    // useEffect(() => {
    //     // Update the isFollowed state whenever the user's followers array changes
    //     const isUserFollowed = user.followers?.some(
    //         (follower) => follower._id === userService.getLoggedinUser()?._id
    //     )

    //     setIsFollowed(isUserFollowed || false)
    // }, [user.following])

    async function loadSuggestedUsersToFollow() {
        try {
            const fetchedUsers = await userService.getSuggestedUsersToFollow()
            // const usersWithNames = await Promise.all(
            // fetchedUsers.map(async (user) => {
            // const username = await userService.getUsernameById(user._id)
            // return { ...user, username }
            // })
            // )
            setSuggestedUsers(fetchedUsers)
        } catch (err) {
            console.error(
                'Cmp - Suggestion - Cannot get suggested users to follow',
                err
            )
        }
    }

    function isFollowing(suggestedUserId) {
        return userService
            .getLoggedinUser()
            .following.some(
                (followedUser) => followedUser._id === suggestedUserId
            )
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

    // const toggleFollowBtnTxt = isFollowing ? 'Unfollow' : 'Follow'
    // if (!suggestedUsers || !suggestedUsers.length) return <Loader />
    return (
        <aside className="suggestion">
            <span className="suggested-for-you">Suggested for you</span>

            <ul className="suggested-for-you">
                {suggestedUsers.map((suggestedUser) => {
                    const followingStatus = isFollowing(suggestedUser._id)
                    const toggleFollowBtnTxt = followingStatus
                        ? 'Unfollow'
                        : 'Follow'
                    return (
                        <li
                            key={suggestedUser._id}
                            className="suggestion-container"
                        >
                            <Avatar
                                className="suggested-user-img"
                                src={suggestedUser.imgUrl}
                                alt={suggestedUser.username + 'image'}
                                title={suggestedUser.username + `'s image`}
                                onClick={() =>
                                    navigate(`/user/${suggestedUser?.username}`)
                                }
                            />
                            <div className="username-suggested flex column">
                                <span
                                    className="username"
                                    onClick={() =>
                                        navigate(
                                            `/user/${suggestedUser?.username}`
                                        )
                                    }
                                >
                                    {suggestedUser.username}
                                </span>
                                <span>Suggested for you</span>
                            </div>
                            <button
                                onClick={() =>
                                    handleToggleFollow(suggestedUser._id)
                                }
                            >
                                {toggleFollowBtnTxt}
                            </button>
                        </li>
                    )
                })}
            </ul>
        </aside>
    )
}

import { useNavigate, useParams } from 'react-router'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { NavBar } from '../cmps/NavBar'

import { userService } from '../services/user.service'
import { storyService } from '../services/story.service.local'

import ProfilePostsSvg from '../img/svg/profile-page/profile-posts.svg'
import ProfileSavedSvg from '../img/svg/profile-page/profile-saved.svg'
import ProfileTaggedSvg from '../img/svg/profile-page/profile-tagged.svg'
import { Modal } from '../cmps/Modal'
import { StoryDetail } from './StoryDetail'
import ActionList from '../cmps/ActionList'

export function ProfilePage() {
    const { username } = useParams()
    const [user, setUser] = useState(userService.getByUsername(username) || {})
    const [stories, setStories] = useState([])
    const [selectedStory, setSelectedStory] = useState({})
    const [isFollowed, setIsFollowed] = useState(
        user?.followers?.some(
            (u) => u._id === userService.getLoggedinUser()?._id || false
        )
    )
    const [isStoryDetailModalOpen, setIsModalOpen] = useState(false)
    const loggedinUser = useSelector((storeState) => storeState.userModule.user)
    const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false)
    const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false)
    // const navigate = useNavigate()

    useEffect(() => {
        async function fetchUser() {
            try {
                const fetchedUser = await userService.getByUsername(username)
                if (fetchedUser) setUser(fetchedUser)
                else console.log('ProfilePage cmp - User not found')
            } catch {
                console.error('ProfilePage cmp useEffect - Cannot fetch user')
            }
        }

        fetchUser()
    }, [username])

    useEffect(() => {
        loadUserStories()
        async function loadUserStories() {
            try {
                const fetchedStories = await storyService.getUserStories(
                    user._id
                )
                console.log(
                    'ProfilePage cmp - Succesfuly fetched user stories from service'
                )
                setStories(fetchedStories)
            } catch {
                console.error(
                    'Profile Page Cmp - Cannot fetch user stories from service'
                )
            }
        }
    }, [user])

    useEffect(() => {
        // Update the isFollowed state whenever the user's followers array changes
        const isUserFollowed = user.followers?.some(
            (follower) => follower._id === userService.getLoggedinUser()?._id
        )

        setIsFollowed(isUserFollowed || false)
    }, [user.followers])

    function onSelectStory(selectedStory) {
        if (selectedStory) {
            setSelectedStory(selectedStory)
            setIsModalOpen(true) // Opens the modal
        }
    }

    function handleCloseStoryDetailModal() {
        setSelectedStory({})
        setIsModalOpen(false) // Close the modal
    }

    function handleOpenFollowersModal() {
        setIsFollowersModalOpen(true)
    }

    function handleCloseFollowersModal() {
        setIsFollowersModalOpen(false) // Close the modal
    }

    function handleOpenFollowingModal() {
        setIsFollowingModalOpen(true)
    }

    function handleCloseFollowingModal() {
        setIsFollowingModalOpen(false) // Close the modal
    }

    async function handleToggleFollow() {
        try {
            const { updatedUserToFollow, updatedCurrentUser } =
                await userService.toggleFollow(user._id)

            // Update the state for the user profile being viewed
            setIsFollowed(
                updatedUserToFollow.followers.some(
                    (u) => u._id === userService.getLoggedinUser()._id
                )
            )
            setUser({ ...user, ...updatedUserToFollow })
        } catch (err) {
            console.error('Profile Page Cmp - cannot toggle follow', err)
        }
    }

    const isAnotherUserMode = username !== loggedinUser.username
    const toggleFollowBtnTxt = isFollowed ? 'Unfollow' : 'Follow'

    return (
        <>
            <NavBar />
            <div className="profile-page flex column">
                <div className="profile-container">
                    <header className="profile-header flex">
                        <div className="profile-photo">
                            {user?.imgUrl && (
                                <img
                                    src={user?.imgUrl}
                                    alt="Profile image"
                                    title="Profile image"
                                />
                            )}
                        </div>
                        <div className="profile-info flex column">
                            <div className="profile-info-header flex">
                                <a>{username}</a>
                                {isAnotherUserMode && (
                                    <div className="flex">
                                        <button
                                            className="follow"
                                            onClick={handleToggleFollow}
                                        >
                                            {toggleFollowBtnTxt}
                                        </button>
                                        <button>Message</button>
                                    </div>
                                )}
                            </div>

                            <div className="user-info flex">
                                <section>
                                    <a className="user-number">
                                        {stories?.length}
                                    </a>
                                    <a> posts</a>
                                </section>

                                <section
                                    style={{ cursor: 'pointer' }}
                                    onClick={handleOpenFollowersModal}
                                >
                                    <a className="user-number">
                                        {user?.followers?.length}
                                    </a>
                                    <a> followers</a>
                                </section>

                                <section
                                    onClick={handleOpenFollowingModal}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <a className="user-number">
                                        {user?.following?.length}
                                    </a>
                                    <a> following</a>
                                </section>
                            </div>

                            <div className="user-bio flex">
                                {/* <a className="user-name">{username}</a> */}
                                <a className="bio">{user?.bio}</a>
                            </div>
                        </div>
                    </header>
                </div>
                <main className="content-container">
                    <div className="profile-links flex">
                        <div className="profile-pics-link active">
                            <a className="posts-icon">
                                <img src={ProfilePostsSvg} alt="Posts icon" />
                            </a>
                            <span>POSTS</span>
                        </div>

                        <div className="profile-pics-link">
                            <a className="posts-icon">
                                <img src={ProfileSavedSvg} alt="Saved icon" />
                            </a>
                            <span>SAVED</span>
                        </div>

                        <div className="profile-pics-link">
                            <a className="posts-icon">
                                <img src={ProfileTaggedSvg} alt="Tagged icon" />
                            </a>
                            <span>TAGGED</span>
                        </div>
                    </div>
                    {stories && (
                        <div className="profile-stories">
                            {stories.map((story) => {
                                return (
                                    <div
                                        className="story"
                                        key={story._id}
                                        onClick={() => {
                                            onSelectStory(story)
                                        }}
                                    >
                                        <div className="post-info flex">
                                            <div className="likes-comm">
                                                <div className="flex">
                                                    <i
                                                        className="fa-solid fa-heart"
                                                        aria-hidden="true"
                                                    ></i>
                                                    <span>
                                                        {story?.likedBy?.length}
                                                    </span>
                                                </div>

                                                <div className="flex">
                                                    <i
                                                        className="fa-solid fa-comment"
                                                        aria-hidden="true"
                                                    ></i>
                                                    <span>
                                                        {
                                                            story?.comments
                                                                ?.length
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <img
                                            src={story?.imgUrl}
                                            alt="Post image"
                                        ></img>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </main>
            </div>

            {/* Modal Component */}
            {isStoryDetailModalOpen && (
                <Modal
                    isOpen={isStoryDetailModalOpen}
                    onClose={handleCloseStoryDetailModal}
                >
                    {/* Modal content here */}
                    <StoryDetail
                        story={selectedStory}
                        onClose={handleCloseStoryDetailModal}
                    />
                </Modal>
            )}

            {/* ActionList - Followers -  Modal Component */}
            {isFollowersModalOpen && user.followers.length > 0 && (
                <Modal
                    className="followers-modal"
                    isOpen={isFollowersModalOpen}
                    onClose={handleCloseFollowersModal}
                >
                    {/* Modal content here */}
                    <ActionList
                        listType="Followers"
                        users={user.followers}
                        onClose={handleCloseFollowersModal}
                    />
                </Modal>
            )}

            {/* ActionList - Following -  Modal Component */}
            {isFollowingModalOpen && user.following.length > 0 && (
                <Modal
                    className="following-modal"
                    isOpen={isFollowingModalOpen}
                    onClose={handleCloseFollowingModal}
                >
                    {/* Modal content here */}
                    <ActionList
                        listType="Following"
                        users={user.following}
                        onClose={handleCloseFollowingModal}
                    />
                </Modal>
            )}
        </>
    )
}

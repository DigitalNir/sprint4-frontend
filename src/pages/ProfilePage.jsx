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

export function ProfilePage() {
    const { username } = useParams()
    const [user, setUser] = useState(userService.getByUsername(username) || {})
    const [stories, setStories] = useState([])
    const [selectedStory, setSelectedStory] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false)
    const loggedinUser = useSelector((storeState) => storeState.userModule.user)

    // const navigate = useNavigate()

    useEffect(() => {
        async function fetchUser() {
            try {
                console.log('username', username)
                const fetchedUser = await userService.getByUsername(username)
                console.log('🚀 ~ fetchUser ~ fetchedUser:', fetchedUser)
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

    function onSelectStory(selectedStory) {
        console.log('🚀 ~ onSelectStory ~ selectedStory:', selectedStory)
        if (selectedStory) {
            setSelectedStory(selectedStory)
            setIsModalOpen(true) // Opens the modal
        }
    }

    function handleCloseModal() {
        setSelectedStory({})
        setIsModalOpen(false) // Close the modal
    }

    const isAnotherUserMode = username !== loggedinUser.username

    return (
        <>
            <NavBar />
            <div className="profile-page flex column">
                <div className="profile-container">
                    <header className="profile-header flex">
                        <div className="profile-photo">
                            <img
                                src={user?.imgUrl}
                                alt="Profile image"
                                title="Profile image"
                            />
                        </div>
                        <div className="profile-info flex column">
                            <div className="profile-info-header flex">
                                <a>{username}</a>
                                {isAnotherUserMode && (
                                    <div className="flex">
                                        <button className="follow">
                                            Follow
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

                                <section>
                                    <a className="user-number">
                                        {user?.followers?.length}
                                    </a>
                                    <a> followers</a>
                                </section>

                                <section>
                                    <a className="user-number">
                                        {user?.following?.length}
                                    </a>
                                    <a> following</a>
                                </section>
                            </div>

                            <div className="user-bio flex">
                                {/* <a className="user-name">{username}</a> */}
                                <a className="bio">{user.bio}</a>
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
                                            console.log('story from map', story)
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
            {/* <script
                src="https://kit.fontawesome.com/7de500428a.js"
                crossOrigin="anonymous"
            ></script> */}
            {/* Modal Component */}
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                    {/* Modal content here */}
                    <StoryDetail story={selectedStory} />
                </Modal>
            )}
        </>
    )
}

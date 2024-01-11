import { useNavigate, useParams } from 'react-router'
import { userService } from '../services/user.service'
import { storyService } from '../services/story.service.local'
import { useState } from 'react'
import { useEffect } from 'react'
import { NavBar } from '../cmps/NavBar'
import ProfilePostsSvg from '../img/svg/profile-page/profile-posts.svg'
import ProfileSavedSvg from '../img/svg/profile-page/profile-saved.svg'
import ProfileTaggedSvg from '../img/svg/profile-page/profile-tagged.svg'
export function ProfilePage() {
    const { fullname } = useParams()
    const [user, setUser] = useState(userService.getByFullName(fullname) || {})
    // const navigate = useNavigate()

    useEffect(() => {
        async function fetchUser() {
            try {
                console.log('fullname', fullname)
                const fetchedUser = await userService.getByFullName(fullname)
                console.log('🚀 ~ fetchUser ~ fetchedUser:', fetchedUser)
                if (fetchedUser) setUser(fetchedUser)
                else console.log('User not found')
            } catch {
                console.error('ProfilePage cmp useEffect - Cannot fetch user')
            }
        }

        fetchUser()
    }, [fullname])

    useEffect(() => {
        storyService.getUserStories(user._id)
    }, [user])

    return (
        <>
            <NavBar />
            {/* <main className="contant-container"> */}
            <div className="profile-page flex column">
                <div className="profile-container">
                    <header className="profile-header flex">
                        <div className="profile-photo">
                            <img
                                src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
                                alt="Profile image"
                                title="Profile image"
                            />
                        </div>
                        <div className="profile-info flex column">
                            <div className="profile-info-header flex">
                                <a>User Full Name</a>
                                <div className="flex">
                                    <button className="follow">Follow</button>
                                    <button>Message</button>
                                </div>
                            </div>

                            <div className="user-info flex">
                                <section>
                                    <a className="user-number">555</a>
                                    <a> posts</a>
                                </section>

                                <section>
                                    <a className="user-number">666</a>
                                    <a> followers</a>
                                </section>

                                <section>
                                    <a className="user-number">999</a>
                                    <a> following</a>
                                </section>
                            </div>

                            <div className="user-bio flex">
                                <a className="user-name">
                                    Moshe-UserName-placeholder
                                </a>
                                <a className="bio"></a>
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
                    <div className="profile-stories">
                        <div className="story">
                            <div className="post-info flex">
                                <div className="likes-comm">
                                    <div className="flex">
                                        <i
                                            className="fa-solid fa-heart"
                                            aria-hidden="true"
                                        ></i>
                                        <span>0</span>
                                    </div>

                                    <div className="flex">
                                        <i
                                            className="fa-solid fa-comment"
                                            aria-hidden="true"
                                        ></i>
                                        <span>0</span>
                                    </div>
                                </div>
                            </div>

                            <img src="https://res.cloudinary.com/dg4wljfe6/image/upload/v1704300860/my-meme_15_vqimir.png"></img>
                        </div>
                    </div>
                </main>
            </div>
            {/* </main> */}
            {/* <script
                src="https://kit.fontawesome.com/7de500428a.js"
                crossOrigin="anonymous"
            ></script> */}
        </>
    )
}

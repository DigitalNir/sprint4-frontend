import { useNavigate, useParams } from 'react-router'
import { userService } from '../services/user.service'
import { storyService } from '../services/story.service.local'
import { useState } from 'react'
import { useEffect } from 'react'
import { NavBar } from '../cmps/NavBar'

export function ProfilePage() {
    const userFullName = useParams()
    const [user, setUser] = useState(
        userService.getByFullname(userFullName) || {}
    )
    // const navigate = useNavigate()

    useEffect(() => {
        async function fetchUser() {
            try {
                const fetchedUser = await userService.getByFullname(
                    userFullName
                )
                if (fetchedUser) setUser(fetchedUser)
                else console.log('User not found')
            } catch {
                console.error('ProfilePage cmp useEffect - Cannot fetch user')
            }
        }

        fetchUser()
    }, [userFullName])

    useEffect(() => {
        storyService.getUserStories(user._id)
    }, [user])

    return (
        <>
            <NavBar />
            <div className="profile-page flex">
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
            </div>
        </>
    )
}

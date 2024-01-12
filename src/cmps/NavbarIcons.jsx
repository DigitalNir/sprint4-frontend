import Home from '../img/svg/home.svg'
import Search from '../img/svg/search.svg'
import Explore from '../img/svg/explore.svg'
import Reels from '../img/svg/reels.svg'
import Message from '../img/svg/message.svg'
import Notification from '../img/svg/notification.svg'
import Create from '../img/svg/create.svg'
import More from '../img/svg/more.svg'
import { Avatar } from '@mui/material'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useState } from 'react'

const iconsData = [
    { name: 'home', src: Home, alt: 'Home', title: 'Home' },
    { name: 'search', src: Search, alt: 'Search', title: 'Search' },
    { name: 'explore', src: Explore, alt: 'Explore', title: 'Explore' },
    { name: 'reels', src: Reels, alt: 'Reels', title: 'Reels' },
    { name: 'message', src: Message, alt: 'Message', title: 'Message' },
    {
        name: 'notification',
        src: Notification,
        alt: 'Notification',
        title: 'Notification',
    },
    { name: 'create', src: Create, alt: 'Create', title: 'Create' },
    { name: 'profile', src: null, alt: 'Profile', title: 'Profile' }, // Special case for profile
    { name: 'more', src: More, alt: 'More', title: 'More' },
]

export function NavBarIcons({ handleIconClick, activeLink }) {
    const user = useSelector((storeState) => storeState.userModule.user)
    const [username, setUsername] = useState('') // State for username

    useEffect(() => {
        async function fetchStoryUsername() {
            try {
                const fetchedUsername = await userService.getUsernameById(
                    user._id
                )
                console.log(
                    'StoryHeader Cmp - Successfully fetched username: ',
                    fetchedUsername
                )
                setUsername(fetchedUsername) // Set the username in state
            } catch {
                console.error(
                    'StoryHeader Cmp - cannot fetch username of the story creator'
                )
            }
        }

        fetchStoryUsername()
    }, [user._id]) // Dependency array: useEffect will run when user._id changes

    return (
        <>
            {iconsData.map((icon) => (
                <div
                    key={icon.name}
                    className={`icons-row ${icon.name} flex ${
                        activeLink === icon.name ? 'active' : ''
                    }`}
                    onClick={() => handleIconClick(icon.name)}
                >
                    {icon.name === 'profile' ? (
                        user?.imgUrl ? (
                            <Avatar
                                className="avatar"
                                src={user?.imgUrl}
                                alt={username}
                            />
                        ) : (
                            <Avatar className="avatar">
                                {username.charAt(0)}
                            </Avatar>
                        )
                    ) : (
                        <img
                            className={`icon-img`}
                            src={icon.src}
                            alt={icon.alt}
                            title={icon.title}
                        />
                    )}
                    <span className="icon-text">{icon.title}</span>
                </div>
            ))}
        </>
    )
}

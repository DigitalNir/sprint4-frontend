import React, { useState } from 'react'
import { Avatar } from '@mui/material'
import Logo from '../img/svg/logo.svg'
import Home from '../img/svg/home.svg'
import Search from '../img/svg/search.svg'
import Explore from '../img/svg/explore.svg'
import Reels from '../img/svg/reels.svg'
import Message from '../img/svg/message.svg'
import Notification from '../img/svg/notification.svg'
import Create from '../img/svg/create.svg'
import More from '../img/svg/more.svg'

export function NavBar() {
    const [activeLink, setActiveLink] = useState(null)

    const handleClick = (linkName) => {
        setActiveLink(linkName)
    }

    return (
        <nav className="nav-bar flex">
            <div className="logo-container">
                <a href="/">
                    <img
                        className="logo"
                        src={Logo}
                        alt="logo"
                        title="Instagram"
                    />
                </a>
            </div>
            <div className="icons-container flex">
                <div
                    className={`icons-row flex ${
                        activeLink === 'home' ? 'active' : ''
                    }`}
                    onClick={() => handleClick('home')}
                >
                    <img
                        className="icon-img"
                        src={Home}
                        alt="Home"
                        title="Home"
                    />
                    <span className="icon-text">Home</span>
                </div>

                <div
                    className={`icons-row flex ${
                        activeLink === 'search' ? 'active' : ''
                    }`}
                    onClick={() => handleClick('search')}
                >
                    <img
                        className="icon-img"
                        src={Search}
                        alt="Search"
                        title="Search"
                    />
                    <span className="icon-text">Search</span>
                </div>

                <div
                    className={`icons-row flex ${
                        activeLink === 'explore' ? 'active' : ''
                    }`}
                    onClick={() => handleClick('explore')}
                >
                    <img
                        className="icon-img"
                        src={Explore}
                        alt="Explore"
                        title="Explore"
                    />
                    <span className="icon-text">Explore</span>
                </div>

                <div
                    className={`icons-row flex ${
                        activeLink === 'reels' ? 'active' : ''
                    }`}
                    onClick={() => handleClick('reels')}
                >
                    <img
                        className="icon-img"
                        src={Reels}
                        alt="Reels"
                        title="Reels"
                    />
                    <span className="icon-text">Reels</span>
                </div>

                <div
                    className={`icons-row flex ${
                        activeLink === 'message' ? 'active' : ''
                    }`}
                    onClick={() => handleClick('message')}
                >
                    <img
                        className="icon-img"
                        src={Message}
                        alt="Message"
                        title="Message"
                    />
                    <span className="icon-text">Messages</span>
                </div>

                <div
                    className={`icons-row flex ${
                        activeLink === 'notification' ? 'active' : ''
                    }`}
                    onClick={() => handleClick('notification')}
                >
                    <img
                        className="icon-img"
                        src={Notification}
                        alt="Notification"
                        title="Notification"
                    />
                    <span className="icon-text">Notifications</span>
                </div>

                <div
                    className={`icons-row flex ${
                        activeLink === 'create' ? 'active' : ''
                    }`}
                    onClick={() => handleClick('create')}
                >
                    <img
                        className="icon-img"
                        src={Create}
                        alt="Create"
                        title="Create"
                    />
                    <span className="icon-text">Create</span>
                </div>

                <div
                    className={`icons-row flex ${
                        activeLink === 'profile' ? 'active' : ''
                    }`}
                    onClick={() => handleClick('profile')}
                >
                    <Avatar className="avatar">N</Avatar>
                    <span className="icon-text">Profile</span>
                </div>

                <div
                    className={`icons-row icon-more flex ${
                        activeLink === 'more' ? 'active' : ''
                    }`}
                    onClick={() => handleClick('more')}
                >
                    <img
                        className="icon-img"
                        src={More}
                        alt="More"
                        title="More"
                    />
                    <span className="icon-text">More</span>
                </div>
            </div>
        </nav>
    )
}

import React, { useState } from 'react'
import Logo from '../img/svg/logo.svg'

import { NavBarIcons } from './NavBarIcons'
import { Modal } from './Modal'
import { StoryCreate } from './StoryCreate'

export function NavBar() {
    const [activeLink, setActiveLink] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleIconClick = (linkName) => {
        setActiveLink(linkName)
        if (linkName === 'create') {
            setIsModalOpen(true)
        }
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    return (
        <>
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
                <NavBarIcons
                    activeLink={activeLink}
                    handleIconClick={handleIconClick}
                />
            </nav>
            {isModalOpen && activeLink === 'create' && (
                <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                    {/* Modal content here */}
                    <StoryCreate />
                </Modal>
            )}
        </>
    )
}

/*                <div
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
                </div> */

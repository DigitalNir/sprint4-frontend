import React, { useState } from 'react'
import Logo from '../img/svg/logo.svg'

import { NavBarIcons } from './NavBarIcons'
import { Modal } from './Modal'
import { StoryCreate } from './StoryCreate'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { setActivePage } from '../store/story.actions'

export function NavBar() {
    // const [activeLink, setActiveLink] = useState(null)
    const activePage = useSelector(
        (storeState) => storeState.storyModule.activePage
    )
    const [isModalOpen, setIsModalOpen] = useState(false)
    const user = useSelector((storeState) => storeState.userModule.user)

    const navigate = useNavigate()

    const handleIconClick = (pageName) => {
        console.log('🚀 ~ handleIconClick ~ linkName:', pageName)

        setActivePage(pageName)
        if (pageName === 'create') {
            setIsModalOpen(true)
        }

        if (pageName === 'profile') {
            navigate(`/user/${user.username}`)
        }

        if (pageName === 'home') {
            navigate(`/`)
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
                    activeLink={activePage}
                    handleIconClick={handleIconClick}
                />
            </nav>
            {isModalOpen && activePage === 'create' && (
                <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                    {/* Modal content here */}
                    <StoryCreate onCloseModal={handleCloseModal} />
                </Modal>
            )}
        </>
    )
}

import React, { useState } from 'react'
import Logo from '../img/svg/logo.svg'

import { NavBarIcons } from './NavBarIcons'
import { Modal } from './Modal'
import { StoryCreate } from './StoryCreate'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

export function NavBar() {
    const [activeLink, setActiveLink] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const user = useSelector((storeState) => storeState.userModule.user)

    const navigate = useNavigate()

    const handleIconClick = (linkName) => {
        setActiveLink(linkName)
        if (linkName === 'create') {
            setIsModalOpen(true)
        }

        if (linkName === 'profile') {
            navigate(`/user/${user.fullname}`)
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
                    <StoryCreate onCloseModal={handleCloseModal} />
                </Modal>
            )}
        </>
    )
}

import { Avatar } from '@mui/material'
import ThreeDots from '../img/svg/3dots.svg'
import { utilService } from '../services/util.service'
import { useState } from 'react'
import { Modal } from './Modal'
import { StoryMoreOptions } from './storyMoreOptions'
import { useSelector } from 'react-redux'
export function StoryHeader({ story, cmpName }) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const shouldRender = cmpName === 'StoryPreview' ? true : false

    function onOpenModal() {
        setIsModalOpen(true)
    }

    function onCloseModal() {
        setIsModalOpen(false)
    }

    return (
        <>
            <div className="story-header flex align-center">
                <Avatar className="avatar">
                    {story.by.fullname.charAt(0)}
                </Avatar>
                <div className="username-time-location flex column">
                    <div className="username-time flex align-center">
                        <span className="username">{story.by.fullname}</span>
                        {shouldRender && (
                            <>
                                <span className="dot"> • </span>
                                <span className="time">
                                    {utilService.formatTimestamp(
                                        story.createdAt
                                    )}
                                </span>
                            </>
                        )}
                    </div>
                    {shouldRender && (
                        <span className="location">
                            {story.loc
                                ? story.loc.name
                                : 'Somewhere over the rainbow'}
                        </span>
                    )}
                </div>

                <img
                    className="icon-img more"
                    src={ThreeDots}
                    alt="More options"
                    title="More options"
                    onClick={onOpenModal}
                />
            </div>
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={onCloseModal}>
                    {/* Modal content here */}.
                    <StoryMoreOptions
                        onCloseModal={onCloseModal}
                        story={story}
                    />
                </Modal>
            )}
        </>
    )
}

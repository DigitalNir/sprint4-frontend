import { Avatar } from '@mui/material'
import ThreeDots from '../img/svg/3dots.svg'
import { utilService } from '../services/util.service'
import { useState } from 'react'
import { Modal } from './Modal'
import { StoryMoreOptions } from './storyMoreOptions'
import { useSelector } from 'react-redux'
import { userService } from '../services/user.service'
import { useEffect } from 'react'
import { StoryDetail } from '../pages/StoryDetail'
export function StoryHeader({ story, cmpName }) {
    const [isStoryMoreOptionsModalOpen, setIsStoryMoreOptionsModalOpen] =
        useState(false)
    const [isStoryDetailModalOpen, setIsStoryDetailModalOpen] = useState(false)
    const [username, setUsername] = useState('') // State for username

    const shouldRender = cmpName === 'StoryPreview' ? true : false

    useEffect(() => {
        async function fetchStoryUsername() {
            try {
                const fetchedUsername = await userService.getUsernameById(
                    story.by._id
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
    }, [story.by._id]) // Dependency array: useEffect will run when story.by._id changes

    function onOpenStoryMoreOptionsModal() {
        setIsStoryMoreOptionsModalOpen(true)
    }

    function onCloseStoryMoreOptionsModal() {
        setIsStoryMoreOptionsModalOpen(false)
    }

    return (
        <>
            <div className="story-header flex align-center">
                <Avatar className="avatar">{username.charAt(0)}</Avatar>
                <div className="username-time-location flex column">
                    <div className="username-time flex align-center">
                        <span className="username">{username}</span>
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
                    onClick={onOpenStoryMoreOptionsModal}
                />
            </div>
            {isStoryMoreOptionsModalOpen && (
                <Modal
                    isOpen={isStoryMoreOptionsModalOpen}
                    onClose={onCloseStoryMoreOptionsModal}
                >
                    {/* Modal content here */}.
                    <StoryMoreOptions
                        onCloseModal={onCloseStoryMoreOptionsModal}
                        story={story}
                    />
                </Modal>
            )}

            {isStoryDetailModalOpen && (
                <Modal
                    isOpen={isStoryDetailModalOpen}
                    onClose={onCloseStoryDetailModal}
                >
                    {/* Modal content here */}.
                    <StoryDetail
                        onCloseModal={onCloseStoryDetailModal}
                        story={story}
                    />
                </Modal>
            )}
        </>
    )
}

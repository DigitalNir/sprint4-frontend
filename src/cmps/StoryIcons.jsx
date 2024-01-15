import { useState } from 'react'
import { useEffect } from 'react'

import { eventBus } from '../services/event-bus.service'
import { storyService } from '../services/story.service.local'
import { userService } from '../services/user.service'
import { utilService } from '../services/util.service'
import { Modal } from './Modal'
import ActionList from './ActionList'

export function StoryIcons({ story }) {
    const [isLiked, setIsLiked] = useState(
        story.likedBy.some((u) => u._id === userService.getLoggedinUser()._id)
    )
    const [isAnimating, setIsAnimating] = useState(false)
    const [isLikersModalOpen, setIsLikersModalOpen] = useState(false)

    // useEffect(() => {}, [isLiked])

    async function handleToggleLike() {
        try {
            const updatedStory = await storyService.toggleLike(story)
            setIsLiked(
                updatedStory.likedBy.some(
                    (u) => u._id === userService.getLoggedinUser()._id
                )
            )

            setIsAnimating(true)
            // setTimeout(() => setIsAnimating(false), 1000) // Reset animation state after 1 second
            //  setIsAnimating(false)// Reset animation state after 1 second

            eventBus.emit('toggleLike', updatedStory)
        } catch (err) {
            console.error('Cannot toggle like', err)
        }
    }

    function handleOpenLikersModal() {
        setIsLikersModalOpen(true)
    }

    function handleCloseLikersModal() {
        setIsLikersModalOpen(false) // Close the modal
    }

    let likeStr = utilService.createLikeStr(story.likedBy.length)

    const iconLikeCls = `icon-img like ${isLiked ? 'liked' : ''} ${
        isAnimating ? 'pulse' : ''
    }`

    // const iconLikeCls = `icon-img like ${isLiked ? 'liked' : ''} ${
    //     isAnimating ? 'animate__animated animate__pulse animate__delay-1s' : ''
    // }`
    const toggleLikeTitleCls = `${isLiked ? 'Unlike' : 'Like'}`
    return (
        <>
            <div className="story-icons flex align-center">
                <button
                    className={iconLikeCls}
                    title={toggleLikeTitleCls}
                    onClick={handleToggleLike}
                ></button>

                <button className="icon-img comment" title="Comment"></button>
                <button className="icon-img share" title="Share"></button>
                <button className="icon-img save" title="Save"></button>
            </div>
            <span className="like-count" onClick={handleOpenLikersModal}>
                {likeStr}
            </span>

            {/* ActionList - Likers -  Modal Component */}
            {isLikersModalOpen && (
                <Modal
                    className="likers-modal"
                    isOpen={isLikersModalOpen}
                    onClose={handleCloseLikersModal}
                >
                    {/* Modal content here */}
                    <ActionList listType="likers" data={story.likedBy} />
                </Modal>
            )}
        </>
    )
}

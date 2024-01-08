import { useState } from 'react'

import { Modal } from './Modal'
import { StoryDetail } from '../pages/StoryDetail'
import { StoryHeader } from './StoryHeader'
import { StoryIcons } from './StoryIcons'

const MAX_LENGTH = 43

export function StoryPreview({ story }) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    let lastSpaceIndex = story.txt.slice(0, MAX_LENGTH).lastIndexOf(' ')

    const snippet =
        story.txt.length > MAX_LENGTH
            ? story.txt.slice(0, lastSpaceIndex) + '... '
            : story.txt

    const isShowMore = story.txt.length > MAX_LENGTH

    const handleViewComment = () => {
        setIsModalOpen(true) // Open the modal
    }

    const handleCloseModal = () => {
        setIsModalOpen(false) // Close the modal
    }

    return (
        <article className="story-preview">
            <StoryHeader story={story} cmpName={'StoryPreview'} />
            <img
                className="story-img"
                src={story.imgUrl}
                alt="Image"
                title="Image"
            />
            <section className="story-interaction-container flex column">
                <StoryIcons story={story} />
                <div className="username-story-snippet flex align-center">
                    <span className="username">{story.by.fullname}</span>
                    <span className="snippet">{snippet}</span>
                    {isShowMore && <span className="snippet-more">more</span>}
                </div>
                <span className="view-comment" onClick={handleViewComment}>
                    View {story.comments.length} comments
                </span>
                <input
                    className="add-comment"
                    type="text"
                    name="add-comment"
                    id="add-comment"
                    placeholder="Add a comment..."
                />
            </section>
            {/* Modal Component */}
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                    {/* Modal content here */}
                    <StoryDetail story={story} />
                </Modal>
            )}
        </article>
    )
}

import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { Modal } from './Modal'
import { StoryDetail } from '../pages/StoryDetail'
import { StoryHeader } from './StoryHeader'
import { StoryIcons } from './StoryIcons'
import { storyService } from '../services/story.service.local'
import { utilService } from '../services/util.service'
import { getActionUpdateStory } from '../store/story.actions'
import { AddComment } from './AddComment'

const MAX_LENGTH = 43

export function StoryPreview({ story }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isShowMore, setIsShowMore] = useState(story.txt.length > MAX_LENGTH)

    const dispatch = useDispatch()

    let lastSpaceIndex = story.txt.slice(0, MAX_LENGTH).lastIndexOf(' ')

    const snippet =
        story.txt.length > MAX_LENGTH
            ? story.txt.slice(0, lastSpaceIndex) + '... '
            : story.txt

    function handleViewComment() {
        setIsModalOpen(true) // Open the modal
    }

    function handleCloseModal() {
        setIsModalOpen(false) // Close the modal
    }

    const commentStr = story.comments.length > 1 ? 'comments' : 'comment'

    let likeStr = utilService.createLikeStr(story.likedBy.length)

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
                    <span>
                        <span className="username">{story.by.fullname}</span>
                        {isShowMore && (
                            <span className="snippet">{snippet}</span>
                        )}
                        {isShowMore && (
                            <span
                                className="snippet-more"
                                onClick={() => setIsShowMore(!isShowMore)}
                            >
                                more
                            </span>
                        )}
                        {!isShowMore && (
                            <span className="snippet">{story.txt}</span>
                        )}{' '}
                    </span>
                </div>
                {story.comments.length > 0 && (
                    <span className="view-comment" onClick={handleViewComment}>
                        View {`${story.comments.length} ${commentStr}`}
                    </span>
                )}
                <AddComment story={story} />
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

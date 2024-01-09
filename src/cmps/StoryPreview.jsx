import { useState } from 'react'

import { Modal } from './Modal'
import { StoryDetail } from '../pages/StoryDetail'
import { StoryHeader } from './StoryHeader'
import { StoryIcons } from './StoryIcons'
import { storyService } from '../services/story.service.local'
import { useDispatch } from 'react-redux'
import { getActionUpdateStory } from '../store/story.actions'

const MAX_LENGTH = 43

export function StoryPreview({ story }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [commentText, setCommentText] = useState('')
    const dispatch = useDispatch()

    let lastSpaceIndex = story.txt.slice(0, MAX_LENGTH).lastIndexOf(' ')

    const snippet =
        story.txt.length > MAX_LENGTH
            ? story.txt.slice(0, lastSpaceIndex) + '... '
            : story.txt

    const isShowMore = story.txt.length > MAX_LENGTH

    function handleViewComment() {
        setIsModalOpen(true) // Open the modal
    }

    function handleCloseModal() {
        setIsModalOpen(false) // Close the modal
    }

    async function handleSubmitComment(ev) {
        try {
            ev.preventDefault()

            if (!commentText) return

            let commentToAdd = storyService.getEmptyComment()
            commentToAdd.txt = commentText
            commentToAdd.by.fullname = 'moshe-placeholder-fullname'
            console.log('story from preview as prop: ', story)
            const updatedStory = await storyService.addComment(
                story,
                commentToAdd.txt,
                commentToAdd.by.fullname
            )
            console.log('updatedStory after service', updatedStory)

            console.log('Successfully added comment')
            setCommentText('') // Reset the input field after submission

            // dispatch(getActionUpdateStory(updatedStory))
        } catch (err) {
            console.log('Cannot add comment', err)
        }
    }

    const commentStr = story.comments.length > 1 ? 'comments' : 'comment'

    let likeStr

    if (story.likedBy.length > 1) likeStr = `${story.likedBy.length} likes`
    else if (story.likedBy.length === 1) likeStr = `1 like`
    else if (story.likedBy.length === 0) likeStr = `Be the first to like this`
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

                <span className="like-count">{likeStr}</span>

                <div className="username-story-snippet flex align-center">
                    <span className="username">{story.by.fullname}</span>
                    <span className="snippet">{snippet}</span>
                    {isShowMore && <span className="snippet-more">more</span>}
                </div>
                {story.comments.length > 0 && (
                    <span className="view-comment" onClick={handleViewComment}>
                        View {`${story.comments.length} ${commentStr}`}
                    </span>
                )}
                <form onSubmit={(ev) => handleSubmitComment(ev)}>
                    <input
                        className="add-comment"
                        type="text"
                        name="add-comment"
                        id="add-comment"
                        placeholder="Add a comment..."
                        value={commentText}
                        onChange={(ev) => setCommentText(ev.target.value)}
                    />
                </form>
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

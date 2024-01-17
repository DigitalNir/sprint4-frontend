import { useState } from 'react'
import { storyService } from '../services/story.service.local'
import { useDispatch } from 'react-redux'
import { getActionUpdateStory } from '../store/story.actions'
import EmojiPicker from 'emoji-picker-react'
import { Modal } from './Modal'
import EmojiSvg from '../img/svg/emoji.svg'

export function AddComment({ story, onAddComment }) {
    const [commentText, setCommentText] = useState('')
    const [isEmojiModalOpen, setIsEmojiModalOpen] = useState(false)

    const dispatch = useDispatch()

    async function handleSubmitComment(ev) {
        try {
            ev.preventDefault()

            if (!commentText) return

            let commentToAdd = storyService.getEmptyComment()
            commentToAdd.txt = commentText

            const updatedStory = await storyService.addComment(
                story,
                commentToAdd.txt
            )

            console.log('Successfully added comment')

            // Check if onAddComment is a function before calling it
            if (typeof onAddComment === 'function') {
                console.log('on add comment is function')
                onAddComment()
            }
            setCommentText('') // Reset the input field after submission

            dispatch(getActionUpdateStory(updatedStory))
        } catch (err) {
            console.log('Cannot add comment', err)
        }
    }

    const handleEmojiClick = (emojiObject, event) => {
        if (emojiObject && emojiObject.emoji) {
            setCommentText((prevText) => prevText + emojiObject.emoji)
            setIsEmojiModalOpen(false)
        } else {
            console.error('Emoji data not found')
        }
    }

    const toggleEmojiPicker = () => {
        setIsEmojiModalOpen(!isEmojiModalOpen)
    }

    const handleCloseEmojiModal = () => {
        setIsEmojiModalOpen(false)
    }
    return (
        <form
            className="form-add-comment"
            onSubmit={(ev) => handleSubmitComment(ev)}
        >
            <textarea
                className="add-comment"
                name="add-comment"
                id="add-comment"
                placeholder="Add a comment..."
                value={commentText}
                onChange={(ev) => setCommentText(ev.target.value)}
                rows="1" // set the number of rows to define its height
            />
            {isEmojiModalOpen && (
                <Modal
                    isOpen={isEmojiModalOpen}
                    onClose={handleCloseEmojiModal}
                >
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                </Modal>
            )}
            <span className="toggle-emoji-picker" onClick={toggleEmojiPicker}>
                <img src={EmojiSvg} alt="Emoji Picker" title="Emoji Picker" />
            </span>
            {commentText.length > 0 && (
                <button type="submit" className="submit-comment-button">
                    Post
                </button>
            )}
        </form>
    )
}

import { useState } from 'react'
import { storyService } from '../services/story.service.local'
import { useDispatch } from 'react-redux'
import { getActionUpdateStory } from '../store/story.actions'

export function AddComment({ story }) {
    const [commentText, setCommentText] = useState('')
    const dispatch = useDispatch()
    async function handleSubmitComment(ev) {
        try {
            ev.preventDefault()

            if (!commentText) return

            let commentToAdd = storyService.getEmptyComment()
            commentToAdd.txt = commentText
            commentToAdd.by.fullname = 'moshe-placeholder-fullname'
            const updatedStory = await storyService.addComment(
                story,
                commentToAdd.txt,
                commentToAdd.by.fullname
            )

            console.log('Successfully added comment')
            setCommentText('') // Reset the input field after submission

            dispatch(getActionUpdateStory(updatedStory))
        } catch (err) {
            console.log('Cannot add comment', err)
        }
    }

    return (
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
    )
}

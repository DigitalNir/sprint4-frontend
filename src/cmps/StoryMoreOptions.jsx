import { useDispatch } from 'react-redux'
import { storyService } from '../services/story.service.local'
import { useNavigate } from 'react-router'
import { getActionRemoveStory } from '../store/story.actions'

export function StoryMoreOptions({ onCloseModal, story }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    function onDeleteStory() {
        storyService.remove(story._id)
        dispatch(getActionRemoveStory(story._id))
        navigate('/')
        onCloseModal()
    }

    return (
        <ul className="story-more-options">
            <li
                style={{ color: '#ed4956', fontWeight: '700' }}
                onClick={onDeleteStory}
            >
                Delete
            </li>
            <li>Edit</li>
            <li onClick={onCloseModal}>Cancel</li>
        </ul>
    )
}

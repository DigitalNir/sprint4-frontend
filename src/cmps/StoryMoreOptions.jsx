import { storyService } from '../services/story.service.local'
import { useNavigate } from 'react-router'

export function StoryMoreOptions({ onCloseModal, story }) {
    const navigate = useNavigate()
    function onDeleteStory() {
        storyService.remove(story._id)
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

import { useDispatch, useSelector } from 'react-redux'
import { storyService } from '../services/story.service.local'
import { useNavigate } from 'react-router'
import { getActionRemoveStory } from '../store/story.actions'
import { useState } from 'react'
import { Modal } from './Modal'
import { StoryDetail } from '../pages/StoryDetail'
import { StoryCreate } from './StoryCreate'

export function StoryMoreOptions({ onCloseModal, story }) {
    const user = useSelector((storeState) => storeState.userModule.user)
    const [isStoryModalOpen, setIsStoryModalOpen] = useState(false)
    const [isStoryCreateModalOpen, setIsStoryCreateModalOpen] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    async function onDeleteStory() {
        try {
            if (!user || user._id !== story.by._id) return

            await storyService.remove(story._id)
            dispatch(getActionRemoveStory(story._id))
            navigate('/')
            onCloseModal()
            console.log('Cmp - Succesfuly removed story')
        } catch (err) {
            console.error('Cmp - Cannot remove story: ', err)
        }
    }

    function handleShowStoryModal() {
        setIsStoryModalOpen(true) // Open the modal
        // onCloseModal() // Closing the more options modal
    }

    function handleCloseStoryModal() {
        setIsStoryModalOpen(false) // Close the modal
    }

    function handleCloseStoryCreateModal() {
        setIsStoryCreateModalOpen(false) // Close the modal
    }

    // Handler for navigating to the edit page
    const handleEditStory = () => {
        // console.log(
        //     'navigating from StoryMoreOptions to: ',
        //     `/story/edit/${story._id}`
        // )
        // navigate(`/story/edit/${story._id}`)
        setIsStoryCreateModalOpen(true)
    }

    const isShowDeleteEdit = user._id === story.by._id

    return (
        <ul className="story-more-options">
            <li onClick={handleShowStoryModal}>Go to post</li>
            {isShowDeleteEdit && (
                <>
                    <li
                        style={{ color: '#ed4956', fontWeight: '700' }}
                        onClick={onDeleteStory}
                    >
                        Delete
                    </li>
                    <li onClick={handleEditStory}>Edit</li>
                </>
            )}

            <li onClick={onCloseModal}>Cancel</li>
            {/* Modal Component */}
            {isStoryModalOpen && (
                <Modal
                    isOpen={isStoryModalOpen}
                    onClose={handleCloseStoryModal}
                >
                    {/* Modal content here */}
                    <StoryDetail story={story} />
                </Modal>
            )}

            {isStoryCreateModalOpen && (
                <Modal
                    isOpen={isStoryCreateModalOpen}
                    onClose={handleCloseStoryCreateModal}
                >
                    {/* Modal content here */}
                    <StoryCreate
                        storyProp={story}
                        onCloseModal={handleCloseStoryCreateModal}
                    />
                </Modal>
            )}
        </ul>
    )
}

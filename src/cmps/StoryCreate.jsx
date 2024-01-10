import { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getActionAddStory, getActionUpdateStory } from '../store/story.actions'
import { useNavigate } from 'react-router'

import EmojiPicker from 'emoji-picker-react'

import { storyService } from '../services/story.service.local'
import { utilService } from '../services/util.service'
import Back from '../img/svg/back.svg'
import { Modal } from './Modal'

export function StoryCreate({ onCloseModal }) {
    const [image, setImage] = useState(null)
    const [previewUrl, setPreviewUrl] = useState('')
    const [text, setText] = useState('')
    // const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [isEmojiModalOpen, setIsEmojiModalOpen] = useState(false)
    const user = useSelector((storeState) => storeState.userModule.user)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleFileChange(ev) {
        const file = ev.target.files[0]
        if (file) {
            setImage(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewUrl(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    function handleTextChange(ev) {
        setText(ev.target.value)
    }

    async function handleSubmit(ev) {
        try {
            ev.preventDefault()
            if (!text && !previewUrl) return

            let storyToAdd = storyService.getEmptyStory()

            storyToAdd.createdAt = Date.now()
            storyToAdd.by = user
            storyToAdd.txt = text
            storyToAdd.imgUrl = previewUrl

            const addedStory = await onAddStory(storyToAdd)
            console.log(
                '🚀 ~ file: StoryCreate.jsx:41 ~ handleSubmit ~ addedStory:',
                addedStory
            )
            dispatch(getActionAddStory(addedStory))
            console.log(
                '🚀 ~ file: StoryCreate.jsx:65 ~ handleSubmit ~ addedStory:',
                addedStory
            )
            navigate('/')
            onCloseModal()
            console.log('Succesfuly added story')
        } catch (err) {
            console.log('Cannot add story', err)
        }
    }

    async function onAddStory(storyToAdd) {
        console.log(
            '🚀 ~ file: StoryCreate.jsx:55 ~ onAddStory ~ storyToAdd:',
            storyToAdd
        )
        try {
            const addedStory = await storyService.save(storyToAdd)
            return addedStory
            // showSuccessMsg(`Story added (id: ${addedStory._id})`)
        } catch (err) {
            console.log('Cannot add story:', err)
            // showErrorMsg('Cannot add story', err)
        }
    }

    function onBack() {
        navigate('/')
        onCloseModal()
    }

    const handleEmojiClick = (emojiObject, event) => {
        console.log(
            '🚀 ~ file: StoryCreate.jsx:89 ~ handleEmojiClick ~ emojiObject:',
            emojiObject
        )
        if (emojiObject && emojiObject.emoji) {
            setText((prevText) => prevText + emojiObject.emoji)
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
        <div className="story-create">
            <header className="story-create-header flex ">
                <img
                    className="icon-img back"
                    src={Back}
                    alt="Back"
                    title="Back"
                    onClick={onBack}
                />
                <span className="create-post-title">Create new post</span>
                <h1
                    className="create-post-share"
                    onClick={handleSubmit}
                    title="Share"
                >
                    Share
                </h1>
            </header>
            <form className="story-create-form flex " onSubmit={handleSubmit}>
                {!previewUrl && (
                    <input
                        className="story-create-upload"
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*"
                        required
                    />
                )}
                {previewUrl && <img src={previewUrl} alt="Preview" />}
                <div className="story-user-text-emoji ">
                    <textarea
                        className="story-create-textarea"
                        value={text}
                        placeholder="Write a caption..."
                        onChange={handleTextChange}
                        required
                    />

                    {isEmojiModalOpen && (
                        <Modal
                            isOpen={isEmojiModalOpen}
                            onClose={handleCloseEmojiModal}
                        >
                            <EmojiPicker onEmojiClick={handleEmojiClick} />
                        </Modal>
                    )}
                    <span
                        className="toggle-emoji-picker"
                        onClick={toggleEmojiPicker}
                    >
                        😊
                    </span>
                </div>

                {/* <button type="submit">Submit</button> */}
            </form>
        </div>
    )
}

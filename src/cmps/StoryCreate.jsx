import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'

import EmojiPicker from 'emoji-picker-react'

import Back from '../img/svg/back.svg'
import { Modal } from './Modal'

import { getActionAddStory, getActionUpdateStory } from '../store/story.actions'
import { storyService } from '../services/story.service.local'

export function StoryCreate({ onCloseModal, storyProp }) {
    // const { storyId } = useParams()
    const [story, setStory] = storyProp
        ? useState(storyProp)
        : useState(storyService.getEmptyStory())

    const [image, setImage] = useState(null)
    const [previewUrl, setPreviewUrl] = useState('')
    const [text, setText] = useState('')
    const [isEmojiModalOpen, setIsEmojiModalOpen] = useState(false)
    const [fileError, setFileError] = useState('') // New state for file upload error

    const user = useSelector((storeState) => storeState.userModule.user)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        console.log(storyProp, 'StoryProp')
        if (storyProp) {
            setText(story.txt)
            setPreviewUrl(story.imgUrl)
        }
    }, [])

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
        ev.preventDefault()
        if (!previewUrl && !storyId) {
            setFileError('File is required') // Set error message if no file
            return
        }
        setFileError('') // Reset error message

        // let storyToAdd = storyService.getEmptyStory()

        let storyToSave = {
            ...story,
            txt: text,
            imgUrl: previewUrl,
            by: user,
        }
        if (!storyId) {
            storyToSave.createdAt = Date.now()
        }

        try {
            const savedStory = await storyService.save(storyToSave)
            if (storyId) {
                dispatch(getActionUpdateStory(savedStory))
            } else {
                dispatch(getActionAddStory(savedStory))
            }
            // onCloseModal()
            navigate('/')
        } catch (err) {
            console.error('Cannot save story', err)
        }
    }

    // async function onAddStory(storyToAdd) {
    //     try {
    //         const addedStory = await storyService.save(storyToAdd)
    //         return addedStory
    //         // showSuccessMsg(`Story added (id: ${addedStory._id})`)
    //     } catch (err) {
    //         console.log('Cannot add story:', err)
    //         // showErrorMsg('Cannot add story', err)
    //     }
    // }

    function onBack() {
        navigate('/')
        onCloseModal()
    }

    const handleEmojiClick = (emojiObject, event) => {
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
            <form className="story-create-form flex  " onSubmit={handleSubmit}>
                {!previewUrl && (
                    <>
                        <input
                            className="story-create-upload"
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*"
                            required
                        />
                        {fileError && (
                            <div className="file-error-message">
                                {fileError}
                            </div>
                        )}
                        {/* Display error message */}
                    </>
                )}
                {previewUrl && <img src={previewUrl} alt="Preview" />}
                <div className="story-user-text-emoji ">
                    <textarea
                        className="story-create-textarea"
                        value={text}
                        placeholder="Write a caption..."
                        onChange={handleTextChange}
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
            </form>
        </div>
    )
}

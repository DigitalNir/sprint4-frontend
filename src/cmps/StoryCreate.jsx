import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'

import EmojiPicker from 'emoji-picker-react'

import BackSvg from '../img/svg/back.svg'
import UploadPhotoSvg from '../img/svg/upload-photo.svg'
import EmojiSvg from '../img/svg/emoji.svg'
import { Modal } from './Modal'

import { getActionAddStory, getActionUpdateStory } from '../store/story.actions'
import { storyService } from '../services/story.service.local'
import { uploadService } from '../services/upload.service'

export function StoryCreate({ onCloseModal, storyProp }) {
    // const { storyId } = useParams()
    const [story, setStory] = useState(
        storyProp || storyService.getEmptyStory()
    )

    const [image, setImage] = useState(null)
    const [previewUrl, setPreviewUrl] = useState('')
    const [text, setText] = useState('')
    const [isEmojiModalOpen, setIsEmojiModalOpen] = useState(false)
    const [fileError, setFileError] = useState('') // State for file upload error

    const user = useSelector((storeState) => storeState.userModule.user)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        console.log(storyProp, 'StoryProp')
        if (storyProp) {
            setText(storyProp.txt)
            setPreviewUrl(storyProp.imgUrl)
            setStory({ ...story, ...storyProp })
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
        const cloudinaryObject = await uploadService.uploadImg(image)

        // The following if statement might not be required. Check later if need to remove
        if (!previewUrl && !story._id) {
            // If no Id exists, we are in Create mode and not. So File is required.
            setFileError('File is required') // Set error message if no file
            return
        }
        setFileError('') // Reset error message

        // let storyToAdd = storyService.getEmptyStory()

        let storyToSave = {
            ...story,
            txt: text,
            imgUrl: cloudinaryObject.url,
            by: user,
        }
        if (!storyToSave._id) {
            storyToSave.createdAt = Date.now()
        }

        try {
            const savedStory = await storyService.save(storyToSave)
            if (storyToSave._id) {
                dispatch(getActionUpdateStory(savedStory))
            } else {
                dispatch(getActionAddStory(savedStory))
            }
            onCloseModal()
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

    const actionStr = story._id ? 'Done' : 'Share'

    return (
        <div className="story-create">
            <header className="story-create-header flex ">
                <img
                    className="icon-img back"
                    src={BackSvg}
                    alt="Back"
                    title="Back"
                    onClick={onBack}
                />
                <span className="create-post-title">Create new post</span>
                <h1
                    className="create-post-share"
                    onClick={handleSubmit}
                    title={actionStr}
                >
                    {actionStr}
                </h1>
            </header>
            <form className="story-create-form flex  " onSubmit={handleSubmit}>
                {!previewUrl && (
                    <>
                        <div className="upload-svg-btn-container flex column">
                            <img
                                className="upload-photo-svg"
                                src={UploadPhotoSvg}
                                alt="Select from computer"
                            />
                            <input
                                className="story-create-upload"
                                type="file"
                                id="fileInput"
                                onChange={handleFileChange}
                                accept="image/*"
                                style={{ display: 'none' }} // Hide the actual input
                            />
                            <label
                                htmlFor="fileInput"
                                className="btn-custom-upload"
                            >
                                Select from computer
                            </label>
                            {fileError && (
                                <div className="file-error-message">
                                    {fileError}
                                </div>
                            )}
                            {/* Display error message */}
                        </div>
                    </>
                )}
                {previewUrl && (
                    <div className="image-preview-container">
                        <button
                            className="btn-change-image"
                            type="button"
                            onClick={() => {
                                setImage(null)
                                setPreviewUrl('')
                            }}
                        >
                            Change Image
                        </button>
                        <img src={previewUrl} alt="Preview" />
                    </div>
                )}

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

                    <div className="emoji-text-length">
                        <img
                            src={EmojiSvg}
                            className="toggle-emoji-picker"
                            onClick={toggleEmojiPicker}
                        />
                        <span className="text-length">{text.length}/2,200</span>
                    </div>
                </div>
            </form>
        </div>
    )
}

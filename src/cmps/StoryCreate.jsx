import { useState } from 'react'
import { storyService } from '../services/story.service.local'
import { utilService } from '../services/util.service'
import { useDispatch, useSelector } from 'react-redux'
import { getActionUpdateStory } from '../store/story.actions'
import { useNavigate } from 'react-router'
export function StoryCreate({ onCloseModal }) {
    const [image, setImage] = useState(null)
    const [previewUrl, setPreviewUrl] = useState('')
    const [text, setText] = useState('')
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
            dispatch(getActionUpdateStory(addedStory))
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

    return (
        <div className="story-create flex column">
            <h1>Create new post</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    required
                />
                {previewUrl && <img src={previewUrl} alt="Preview" />}
                <textarea value={text} onChange={handleTextChange} required />
                <button type="submit">Submit</button>
            </form>
            <p>Text: {text}</p> {/* Displaying the text for demonstration */}
        </div>
    )
}

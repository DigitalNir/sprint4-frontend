import { useState } from 'react'
import { storyService } from '../services/story.service.local'
import { utilService } from '../services/util.service'
export function StoryCreate() {
    const [image, setImage] = useState(null)
    const [previewUrl, setPreviewUrl] = useState('')
    const [text, setText] = useState('')

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

    function handleSubmit(ev) {
        ev.preventDefault()
        let storyToAdd = storyService.getEmptyStory()
        console.log(
            '🚀 ~ file: StoryCreate.jsx:27 ~ handleSubmit ~ storyToAdd:',
            storyToAdd
        )
        storyToAdd.createdAt = Date.now()
        storyToAdd.by.fullname = 'Moshe Ufnik'
        storyToAdd.txt = text
        storyToAdd.imgUrl = previewUrl
        console.log('hi adding story')
        onAddStory(storyToAdd)
    }

    async function onAddStory(storyToAdd) {
        try {
            const addedStory = await storyService.save(storyToAdd)
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

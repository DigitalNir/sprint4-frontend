import { useState } from 'react'
export function StoryCreate() {
    const [image, setImage] = useState(null)
    const [previewUrl, setPreviewUrl] = useState('')

    const handleFileChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            setImage(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewUrl(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="story-create flex column">
            <h1>Create new post</h1>
            <div>
                <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                />
                {previewUrl && <img src={previewUrl} alt="Preview" />}
            </div>
        </div>
    )
}

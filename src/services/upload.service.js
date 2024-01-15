export const uploadService = {
    uploadImg,
}
async function uploadImg(file) {
    // console.log('🚀 ~ uploadImg ~ file:', file)
    const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

    try {
        const formData = new FormData()
        formData.append('upload_preset', UPLOAD_PRESET)
        formData.append('file', file)

        const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData,
        })
        const imgUrl = await res.json()
        return imgUrl
    } catch (err) {
        console.error('Failed to upload', err)
        throw err
    }
}

import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { storyData } from './story.js'
const STORAGE_KEY = 'story'

export const storyService = {
    query,
    getById,
    save,
    remove,
    addComment,
    getDefaultFilter,
    getEmptyStory,
    getEmptyComment,
    toggleLike,
    getUserStories,
}
window.storyService = storyService

_createStories()

async function query(filterBy = { txt: '' }, sortBy = { date: '' }) {
    let stories = await storageService.query(STORAGE_KEY)

    stories = stories.filter((story) => {
        const regex = new RegExp(filterBy.txt, 'i')
        return filterBy.txt
            ? regex.test(story.txt) ||
                  story.tags.some((tag) => regex.test(tag)) ||
                  regex.test(story.by.fullname)
            : true
    })

    return stories
}

async function getById(storyId) {
    const story = await storageService.get(STORAGE_KEY, storyId)
    return story
}

async function remove(storyId) {
    const user = userService.getLoggedinUser()

    if (!user) {
        console.error('Service -Cannot remove story - user is not logged in')
        throw new Error('Service - Cannot remove story - user is not logged in')
    }

    const story = await getById(storyId)

    if (story.by._id !== user._id) {
        console.error('Service - Cannot remov story - this is not your story')
        throw new Error(
            'Service - Cannot remove story - this is not your story'
        )
    } else {
        try {
            await storageService.remove(STORAGE_KEY, storyId)
            console.log('Service - Succesfuly removed story')
        } catch (err) {
            console.error('Service - Cannot remove story: ', err)
            throw new Error('Service - Cannot remove story: ', err)
        }
    }
}

async function save(story) {
    let savedStory
    if (story._id) {
        try {
            savedStory = await storageService.put(STORAGE_KEY, story)
            console.log('Service - Succesfuly updated story')
        } catch (err) {
            onsole.error('Service - Cannot update story: ', err)
            throw new Error('Service - Cannot update story: ', err)
        }
    } else {
        // Later, owner is set by the backend
        // story.by = userService.getLoggedinUser()
        try {
            savedStory = await storageService.post(STORAGE_KEY, story)

            console.log('Service - Succesfuly created new story')
        } catch (err) {
            throw new Error('Service - Cannot create new story: ', err)
        }
    }
    return savedStory
}

async function _createStories() {
    try {
        let stories = await query()

        // Check if stories is empty (length is 0)
        if (!stories.length) {
            stories = storyData
            localStorage.setItem(STORAGE_KEY, JSON.stringify(stories))
        }

        return stories
    } catch (err) {
        console.error('Error: cannot create stories from demo data', err)
        // Consider how I want to handle the error.
        // Maybe set storyData to localStorage in case of an error?
    }
}

function getDefaultFilter() {
    return { txt: '' }
}

function getEmptyStory() {
    return {
        _id: '', // Generate a unique ID when creating a new story
        createdAt: '',
        txt: '', // Story text
        imgUrl: '', // URL to the story image
        by: {
            _id: '', // User ID of the story creator
            fullname: '', // Full name of the story creator
            imgUrl: '', // URL to the profile image of the story creator
        },
        loc: {
            lat: 0, // Latitude for the location
            lng: 0, // Longitude for the location
            name: '', // Name of the location
        },
        comments: [], // Array of comments, initially empty
        likedBy: [], // Array of users who liked the story, initially empty
        tags: [], // Array of tags, initially empty
    }
}

// Comments

async function addComment(story, txt) {
    // Later, this is all done by the backend
    try {
        // const story = getById(storyId)

        if (!story.comments) story.comments = []

        const user = userService.getLoggedinUser()

        const comment = {
            id: utilService.makeId(),
            by: user,
            txt,
        }

        story.comments.push(comment)
        const storyToUpdate = await storageService.put(STORAGE_KEY, story)
        console.log('Story to update from service', storyToUpdate)
        return storyToUpdate
    } catch (err) {
        console.log('Cannot get story in order to add comment', err)
        throw err
    }
}

function getEmptyComment() {
    return {
        id: '', // Unique identifier for the comment, probably to be generated when creating a new comment
        createdAt: '', // Current timestamp in milliseconds
        by: {
            _id: '', // User ID of the comment creator
            fullname: '', // Full name of the comment creator
            imgUrl: '', // URL to the profile image of the comment creator
        },
        txt: '', // Text of the comment
    }
}

// Likes
async function toggleLike(story) {
    try {
        if (!story.likedBy) story.likedBy = []

        const user = userService.getLoggedinUser()
        if (!user) {
            console.error('Cannot toggle like - user is not logged in')
            throw new Error('Cannot toggle like - user is not logged in')
        }

        const userIdx = story.likedBy.findIndex((u) => u._id === user._id)

        if (userIdx === -1) {
            story.likedBy.push(user) // Add like
            // console.log('Liked by user:', user)
        } else {
            story.likedBy.splice(userIdx, 1) // Remove like
            // console.log('Unliked by user:', user)
        }

        // console.log('Updated story likedBy:', story.likedBy)

        const storyToUpdate = await storageService.put(STORAGE_KEY, story)
        console.log('Story updated in storage:', storyToUpdate)

        return storyToUpdate
    } catch (err) {
        console.error('Cannot toggle like', err)
        throw err
    }
}

async function getUserStories(userId) {
    let stories = await storageService.query(STORAGE_KEY)

    // Filter stories where 'by._id' matches the given userId
    const userStories = stories.filter((story) => story.by._id === userId)

    return userStories
}

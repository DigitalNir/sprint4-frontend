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
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, storyId)
}

async function save(story) {
    let savedStory
    if (story._id) {
        savedStory = await storageService.put(STORAGE_KEY, story)
    } else {
        // Later, owner is set by the backend
        // story.by = userService.getLoggedinUser()
        savedStory = await storageService.post(STORAGE_KEY, story)
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

async function addComment(story, txt, fullname) {
    // Later, this is all done by the backend
    try {
        // const story = getById(storyId)

        if (!story.comments) story.comments = []
        // Later remove the comment from the following line + remove  'moshe-placeholder-fullname' from this function arguments
        // const user = userService.getLoggedinUser()

        const comment = {
            id: utilService.makeId(),
            by: {
                fullname: fullname,
                // _id: user._id,
                // fullname: user.fullname,
                // imgUrl: user.imgUrl,
            },
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

// async function addComment(storyId, comment) {
//     comment.createdAt = Date.now()
//     const story = getById(storyId)
//     story.comments.unshift(comment)
//     try {
//         await save(story)
//         console.log('Succesfuly saved story with new comment')
//     } catch (err) {
//         console.log('Cannot save story with new comment', err)
//         throw err
//     }
// }

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

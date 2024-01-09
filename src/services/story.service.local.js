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
}
window.storyService = storyService

_createStories()

async function query(filterBy = { txt: '' }) {
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

function getById(storyId) {
    return storageService.get(STORAGE_KEY, storyId)
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

async function addComment(storyId, txt) {
    // Later, this is all done by the backend
    const story = await getById(storyId)
    if (!story.comments) story.comments = []

    const comment = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt,
    }
    story.comments.push(comment)
    await storageService.put(STORAGE_KEY, story)

    return comment
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
// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))

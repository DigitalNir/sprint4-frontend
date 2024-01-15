import { storyService } from '../services/story.service.local.js'
import { userService } from '../services/user.service.js'
import { store } from './store.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import {
    ADD_STORY,
    REMOVE_STORY,
    SET_STORIES,
    UNDO_REMOVE_STORY,
    UPDATE_STORY,
} from './story.reducer.js'
import { LOADING_DONE, LOADING_START } from './system.reducer.js'

// Action Creators:
export function getActionRemoveStory(storyId) {
    return {
        type: REMOVE_STORY,
        storyId,
    }
}
export function getActionAddStory(story) {
    return {
        type: ADD_STORY,
        story,
    }
}
export function getActionUpdateStory(story) {
    return {
        type: UPDATE_STORY,
        story,
    }
}

export async function loadStories() {
    try {
        // store.dispatch({ type: LOADING_START }) // TODO: uncomment with Ori
        const { filterBy } = store.getState().storyModule

        const stories = await storyService.query(filterBy)
        // const sortedStory = storyService.sortStories()
        console.log('Stories from DB:', stories)
        store.dispatch({
            type: SET_STORIES,
            stories,
        })
        // dispatch(systemReducer({}, { type: LOADING_DONE }))
    } catch (err) {
        console.log('Story action -> Cannot load stories', err)
        throw err
    } finally {
        // store.dispatch({ type: LOADING_DONE }) // TODO: uncomment with Ori
    }
}

export async function removeStory(storyId) {
    try {
        await storyService.remove(storyId)
        store.dispatch(getActionRemoveStory(storyId))
    } catch (err) {
        console.log('Cannot remove story', err)
        throw err
    }
}

export async function addStory(story) {
    try {
        const savedStory = await storyService.save(story)
        console.log('Added Story', savedStory)
        store.dispatch(getActionAddStory(savedStory))
        return savedStory
    } catch (err) {
        console.log('Cannot add story', err)
        throw err
    }
}

export function updateStory(story) {
    return storyService
        .save(story)
        .then((savedStory) => {
            console.log('Updated Story:', savedStory)
            store.dispatch(getActionUpdateStory(savedStory))
            return savedStory
        })
        .catch((err) => {
            console.log('Cannot save story', err)
            throw err
        })
}

export function setStoryFilter(filterBy = storyService.getDefaultFilter()) {
    // dispatch
    store.dispatch({ type: SET_FILTER_BY, filterBy })
    return Promise.resolve(filterBy)
    // return loadToys()
}

// Demo for Optimistic Mutation
// (IOW - Assuming the server call will work, so updating the UI first)
export function onRemoveStoryOptimistic(storyId) {
    store.dispatch({
        type: REMOVE_STORY,
        storyId,
    })
    showSuccessMsg('Story removed')

    storyService
        .remove(storyId)
        .then(() => {
            console.log('Server Reported - Deleted Succesfully')
        })
        .catch((err) => {
            showErrorMsg('Cannot remove story')
            console.log('Cannot load stories', err)
            store.dispatch({
                type: UNDO_REMOVE_STORY,
            })
        })
}

import { storyService } from '../services/story.service.local'

export const SET_STORIES = 'SET_STORIES'
export const REMOVE_STORY = 'REMOVE_STORY'
export const ADD_STORY = 'ADD_STORY'
export const UPDATE_STORY = 'UPDATE_STORY'
export const UNDO_REMOVE_STORY = 'UNDO_REMOVE_STORY'
export const SET_FILTER_BY = 'SET_FILTER_BY'

const initialState = {
    stories: [],
    lastRemovedStory: null,
    filterBy: storyService.getDefaultFilter(),
}

export function storyReducer(state = initialState, action = {}) {
    let newState = state
    let stories
    switch (action.type) {
        case SET_STORIES:
            newState = { ...state, stories: action.stories }
            break
        case REMOVE_STORY:
            const lastRemovedStory = state.stories.find(
                (story) => story._id === action.storyId
            )
            stories = state.stories.filter(
                (story) => story._id !== action.storyId
            )
            newState = { ...state, stories, lastRemovedStory }
            break
        case ADD_STORY:
            newState = { ...state, stories: [...state.stories, action.story] }
            break
        case UPDATE_STORY:
            stories = state.stories.map((story) =>
                story._id === action.story._id ? action.story : story
            )
            newState = { ...state, stories }
            break

        case UNDO_REMOVE_STORY:
            if (state.lastRemovedStory) {
                newState = {
                    ...state,
                    stories: [...state.stories, state.lastRemovedStory],
                    lastRemovedStory: null,
                }
            }
            break
        //Filter
        case SET_FILTER_BY:
            newState = { ...state, filterBy: action.filterBy }
            break
        default:
    }
    return newState
}

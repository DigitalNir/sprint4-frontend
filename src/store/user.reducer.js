import { userService } from '../services/user.service.js'
// import { UPDATE_USER_FOLLOW_STATUS } from './user.actions'

export const SET_USER = 'SET_USER'
export const SET_WATCHED_USER = 'SET_WATCHED_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_USERS = 'SET_USERS'
export const UPDATE_USER_FOLLOW_STATUS = 'UPDATE_USER_FOLLOW_STATUS'

const initialState = {
    // count: 10,
    user: userService.getLoggedinUser(),
    users: [],
    watchedUser: null,
}

export function userReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case SET_USER:
            newState = { ...state, user: action.user }
            break
        case SET_WATCHED_USER:
            newState = { ...state, watchedUser: action.user }
            break
        case REMOVE_USER:
            newState = {
                ...state,
                users: state.users.filter((user) => user._id !== action.userId),
            }
            break
        case SET_USERS:
            newState = { ...state, users: action.users }
            break

        case UPDATE_USER_FOLLOW_STATUS:
            const { updatedUserToFollow, updatedCurrentUser } = action
            return {
                ...state,
                user:
                    state.user._id === updatedCurrentUser._id
                        ? updatedCurrentUser
                        : state.user,
                users: state.users.map((user) =>
                    user._id === updatedUserToFollow._id
                        ? updatedUserToFollow
                        : user
                ),
            }

        default:
    }
    // For debug:
    // window.userState = newState
    // console.log('State:', newState)
    return newState
}

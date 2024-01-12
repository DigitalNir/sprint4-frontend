import { storageService } from './async-storage.service'
import { httpService } from './http.service'
import { userData } from './userdata'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

_createUsers()

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    // update,
    getByUsername,
    createEmptyUser,
    getUsernameById,
    toggleFollow,
}

window.userService = userService

async function getUsers() {
    return await storageService.query('user')
    // return httpService.get(`user`)
}

async function getUsernameById(userId) {
    try {
        const users = await storageService.query('user')
        const user = users.find((user) => user._id === userId)
        console.log('User Service - getUserNameById', user.username)
        return user.username
    } catch (err) {
        console.error('User Service - Cannot get username by Id', err)
        throw err
    }
}

async function getByUsername(username) {
    const users = await storageService.query('user')

    const res = users.find((user) => user.username === username)
    console.log('res fronm service', res)
    return res
}

async function getById(userId) {
    const user = await storageService.get('user', userId)
    // const user = await httpService.get(`user/${userId}`)
    return user
}

function remove(userId) {
    return storageService.remove('user', userId)
    // return httpService.delete(`user/${userId}`)
}

// TODO - I might need to uncomment later on, and refactor to allow Editing User Profile

// async function update({ _id, score }) {
//     const user = await storageService.get('user', _id)
//     user.score = score
//     await storageService.put('user', user)

//     // const user = await httpService.put(`user/${_id}`, {_id, score})

//     // When admin updates other user's details, do not update loggedinUser
//     if (getLoggedinUser()._id === user._id) saveLocalUser(user)
//     return user
// }

async function login(userCred) {
    const users = await storageService.query('user')
    const user = users.find((user) => user.username === userCred.username)
    // const user = await httpService.post('auth/login', userCred)
    if (user) return saveLocalUser(user)
}

async function signup(userCred) {
    userCred = {
        ...userCred,
        following: [],
        followers: [],
        savedStoryIds: [],
        imgUrl:
            userCred.imgUrl ||
            'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
    }

    const newUser = await storageService.post('user', userCred)
    // const newUser = await httpService.post('auth/signup', userCred)

    return saveLocalUser(newUser)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // return await httpService.post('auth/logout')
}

async function toggleFollow(userIdToToggleFollow) {
    try {
        const loggedinUser = userService.getLoggedinUser()

        if (!loggedinUser) {
            console.error('Cannot toggle follow - user is not logged in')
            throw new Error('Cannot toggle follow - user is not logged in')
        }

        const users = await getUsers()

        const userToFollow = users.find(
            (user) => user._id === userIdToToggleFollow
        )

        if (!userToFollow.followers) userToFollow.followers = []

        const loggedinUserIdx = userToFollow.followers.findIndex(
            (follower) => follower._id === loggedinUser._id
        )

        if (loggedinUserIdx === -1) userToFollow.followers.push(loggedinUser)
        else userToFollow.followers.splice(loggedinUserIdx, 1)

        const userToUpdate = await storageService.put('user', userToFollow)
        console.log(
            'User Service - toggleFollow - User updated in storage:',
            userToUpdate
        )
        return userToUpdate
    } catch (err) {
        console.error('User Service - Cannot toggle follow', err)
        throw err
    }
}

function saveLocalUser(user) {
    const userForSession = {
        _id: user._id,
        username: user.username,
        fullname: user.fullname,
        bio: user.bio,
        imgUrl: user.imgUrl,
        following: user.following,
        followers: user.followers,
        savedStoryIds: user.savedStoryIds,
    }

    sessionStorage.setItem(
        STORAGE_KEY_LOGGEDIN_USER,
        JSON.stringify(userForSession)
    )
    return userForSession
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function createEmptyUser() {
    return {
        _id: '',
        username: '',
        password: '',
        fullname: '',
        bio: '',
        imgUrl: '',
        following: [],
        followers: [],
        savedStoryIds: [],
    }
}

async function _createUsers() {
    try {
        let users = await getUsers()
        // Check if users is empty (length is 0)
        if (!users.length) {
            users = userData
            localStorage.setItem('user', JSON.stringify(users))
        }

        return users
    } catch (err) {
        console.error('Error: cannot create users from demo data', err)
    }
}

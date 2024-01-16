import moment from 'moment'

export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    debounce,
    randomPastTime,
    saveToStorage,
    loadFromStorage,
    formatTimestamp,
    createLikeStr,
    createAdvancedLikeStr,
}

function createLikeStr(likedByLength) {
    if (likedByLength > 1) return `${likedByLength} likes`
    else if (likedByLength === 1) return `1 like`
    else if (likedByLength === 0) return `Be the first to like this`
}

function createAdvancedLikeStr(likedBy, loggedInUserId, followedUserIds) {
    const totalLikes = likedBy.length
    const isLikedByUser = likedBy.some((u) => u._id === loggedInUserId)
    const namesOfFollowedWhoLiked = likedBy
        .filter(
            (u) => followedUserIds.includes(u._id) && u._id !== loggedInUserId
        )
        .map((u) => u.username)

    if (totalLikes === 0) return `Be the first to like this`

    let likeStr = ''

    if (isLikedByUser) {
        if (namesOfFollowedWhoLiked.length === 1 && totalLikes === 2) {
            // Special case: Liked by you and one other followed user
            likeStr = `Liked by you and ${namesOfFollowedWhoLiked[0]}`
        } else {
            likeStr = 'Liked by you'
            if (namesOfFollowedWhoLiked.length > 0) {
                likeStr += `, ${namesOfFollowedWhoLiked.join(', ')}`
            }
            const otherLikesCount =
                totalLikes - namesOfFollowedWhoLiked.length - 1
            if (otherLikesCount > 0) {
                likeStr += ` and ${otherLikesCount} other${
                    otherLikesCount > 1 ? 's' : ''
                }`
            }
        }
    } else {
        if (namesOfFollowedWhoLiked.length > 0) {
            likeStr = `Liked by ${namesOfFollowedWhoLiked.join(', ')}`
            const otherLikesCount = totalLikes - namesOfFollowedWhoLiked.length
            if (otherLikesCount > 0) {
                likeStr += ` and ${otherLikesCount} other${
                    otherLikesCount > 1 ? 's' : ''
                }`
            }
        } else {
            likeStr = `${totalLikes} like${totalLikes > 1 ? 's' : ''}`
        }
    }

    return likeStr
}

function makeId(length = 6) {
    var txt = ''
    var possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = [
        'The sky',
        'above',
        'the port',
        'was',
        'the color of television',
        'tuned',
        'to',
        'a dead channel',
        '.',
        'All',
        'this happened',
        'more or less',
        '.',
        'I',
        'had',
        'the story',
        'bit by bit',
        'from various people',
        'and',
        'as generally',
        'happens',
        'in such cases',
        'each time',
        'it',
        'was',
        'a different story',
        '.',
        'It',
        'was',
        'a pleasure',
        'to',
        'burn',
    ]
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

function randomPastTime() {
    const HOUR = 1000 * 60 * 60
    const DAY = 1000 * 60 * 60 * 24
    const WEEK = 1000 * 60 * 60 * 24 * 7

    const pastTime = getRandomIntInclusive(HOUR, WEEK)
    return Date.now() - pastTime
}

function formatTimestamp(timestamp) {
    return moment(timestamp).fromNow()
}

function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, timeout)
    }
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : undefined
}

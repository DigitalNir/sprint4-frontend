export const userData = [
    {
        _id: 'u102',
        username: 'AnnaS',
        password: 'annapass',
        fullname: 'Anna Smith',
        imgUrl: '../../img/faces/anna.png',
        following: [],
        followers: [
            {
                _id: 'u107',
                fullname: 'Emily',
                imgUrl: '../../img/faces/emily.png',
            },
        ],
        savedStoryIds: ['s102', 's105'],
    },
    {
        _id: 'u103',
        username: 'MichaelB',
        password: 'michael123',
        fullname: 'Michael Brown',
        imgUrl: '../../img/faces/michael.png',
        following: [],
        followers: [
            {
                _id: 'u109',
                fullname: 'Alice',
                imgUrl: '../../img/faces/alice.png',
            },
        ],
        savedStoryIds: ['s103', 's106'],
    },
    {
        _id: 'u104',
        username: 'ChrisJ',
        password: 'chrispass',
        fullname: 'Chris Johnson',
        imgUrl: '../../img/faces/chris.png',
        following: [
            {
                _id: 'u110',
                fullname: 'Sarah',
                imgUrl: '../../img/faces/sarah.png',
            },
        ],
        followers: [],
        savedStoryIds: ['s104'],
    },
    {
        _id: 'u105',
        username: 'LindaG',
        password: 'linda123',
        fullname: 'Linda Gates',
        imgUrl: '../../img/faces/linda.png',
        following: [
            {
                _id: 'u112',
                fullname: 'Kevin',
                imgUrl: '../../img/faces/kevin.png',
            },
        ],
        followers: [],
        savedStoryIds: ['s105'],
    },
    {
        _id: 'u106',
        username: 'DavidL',
        password: 'davidpass',
        fullname: 'David Lee',
        imgUrl: '../../img/faces/david.png',
        following: [
            {
                _id: 'u114',
                fullname: 'Emma',
                imgUrl: '../../img/faces/emma.png',
            },
        ],
        followers: [],
        savedStoryIds: ['s106'],
    },

    // Commenters and Likers
    {
        _id: 'u107',
        username: 'EmilyC',
        password: 'emilypass',
        fullname: 'Emily',
        imgUrl: '../../img/faces/emily.png',
        following: [
            {
                _id: 'u102',
                fullname: 'Anna Smith',
                imgUrl: '../../img/faces/anna.png',
            },
        ],
        followers: [],
        savedStoryIds: ['s102'],
    },
    {
        _id: 'u108',
        username: 'JohnD',
        password: 'john123',
        fullname: 'John',
        imgUrl: '../../img/faces/john.png',
        following: [],
        followers: [],
        savedStoryIds: ['s102', 's104'],
    },
    {
        _id: 'u109',
        username: 'AliceM',
        password: 'alice123',
        fullname: 'Alice',
        imgUrl: '../../img/faces/alice.png',
        following: [],
        followers: [
            {
                _id: 'u103',
                fullname: 'Michael Brown',
                imgUrl: '../../img/faces/michael.png',
            },
        ],
        savedStoryIds: ['s103'],
    },
    {
        _id: 'u110',
        username: 'SarahK',
        password: 'sarahpass',
        fullname: 'Sarah',
        imgUrl: '../../img/faces/sarah.png',
        following: [
            {
                _id: 'u104',
                fullname: 'Chris Johnson',
                imgUrl: '../../img/faces/chris.png',
            },
        ],
        followers: [],
        savedStoryIds: ['s104', 's105'],
    },
    {
        _id: 'u111',
        username: 'MikeL',
        password: 'mikepass',
        fullname: 'Mike',
        imgUrl: '../../img/faces/mike.png',
        following: [],
        followers: [],
        savedStoryIds: ['s104'],
    },
    {
        _id: 'u112',
        username: 'KevinT',
        password: 'kevinpass',
        fullname: 'Kevin',
        imgUrl: '../../img/faces/kevin.png',
        following: [
            {
                _id: 'u105',
                fullname: 'Linda Gates',
                imgUrl: '../../img/faces/linda.png',
            },
        ],
        followers: [],
        savedStoryIds: ['s105', 's106'],
    },
    {
        _id: 'u113',
        username: 'GraceW',
        password: 'grace123',
        fullname: 'Grace',
        imgUrl: '../../img/faces/grace.png',
        following: [],
        followers: [],
        savedStoryIds: ['s105'],
    },
    {
        _id: 'u114',
        username: 'EmmaP',
        password: 'emmapass',
        fullname: 'Emma',
        imgUrl: '../../img/faces/emma.png',
        following: [
            {
                _id: 'u106',
                fullname: 'David Lee',
                imgUrl: '../../img/faces/david.png',
            },
        ],
        followers: [],
        savedStoryIds: ['s106'],
    },
]

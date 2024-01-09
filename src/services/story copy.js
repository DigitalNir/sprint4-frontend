export const storyData = [
    {
        _id: 's102',
        txt: 'Loving the beach life!',
        imgUrl: '../img/story/beach.jpg',
        by: {
            _id: 'u102',
            fullname: 'Anna Smith',
            imgUrl: 'http://example.com/profile/anna.jpg',
        },
        loc: {
            lat: 33.91,
            lng: -118.41,
            name: 'Santa Monica',
        },
        comments: [
            {
                id: 'c2001',
                by: {
                    _id: 'u107',
                    fullname: 'Emily',
                    imgUrl: 'http://example.com/profile/emily.jpg',
                },
                txt: 'Wow, looks amazing!',
            },
            {
                id: 'c2002',
                by: {
                    _id: 'u108',
                    fullname: 'John',
                    imgUrl: 'http://example.com/profile/john.jpg',
                },
                txt: 'I miss this place!',
            },
        ],
        likedBy: [
            {
                _id: 'u107',
                fullname: 'Emily',
                imgUrl: 'http://example.com/profile/emily.jpg',
            },
            {
                _id: 'u108',
                fullname: 'John',
                imgUrl: 'http://example.com/profile/john.jpg',
            },
        ],
        tags: ['beach', 'sunset'],
    },
    {
        _id: 's103',
        txt: 'Exploring the mountains!',
        imgUrl: '../img/story/mountains.jpg',
        by: {
            _id: 'u103',
            fullname: 'Michael Brown',
            imgUrl: 'http://example.com/profile/michael.jpg',
        },
        loc: {
            lat: 45.66,
            lng: -110.56,
            name: 'Rocky Mountains',
        },
        comments: [
            {
                id: 'c3001',
                by: {
                    _id: 'u109',
                    fullname: 'Alice',
                    imgUrl: 'http://example.com/profile/alice.jpg',
                },
                txt: 'Breathtaking view!',
            },
        ],
        likedBy: [
            {
                _id: 'u109',
                fullname: 'Alice',
                imgUrl: 'http://example.com/profile/alice.jpg',
            },
        ],
        tags: ['hiking', 'adventure'],
    },
    {
        _id: 's104',
        txt: 'Had an amazing time trying out street photography in New York. The energy of the city is just mesmerizing. Every corner tells a different story.',
        imgUrl: '../img/story/newyork.jpg',
        by: {
            _id: 'u104',
            fullname: 'Chris Johnson',
            imgUrl: 'http://example.com/profile/chris.jpg',
        },
        loc: {
            lat: 40.71,
            lng: -74.01,
            name: 'New York City',
        },
        comments: [
            {
                id: 'c4001',
                by: {
                    _id: 'u110',
                    fullname: 'Sarah',
                    imgUrl: 'http://example.com/profile/sarah.jpg',
                },
                txt: 'NYC is always full of surprises!',
            },
            {
                id: 'c4002',
                by: {
                    _id: 'u111',
                    fullname: 'Mike',
                    imgUrl: 'http://example.com/profile/mike.jpg',
                },
                txt: 'These shots are incredible! I wish I could visit there as soon as possible!',
            },
        ],
        likedBy: [
            {
                _id: 'u110',
                fullname: 'Sarah',
                imgUrl: 'http://example.com/profile/sarah.jpg',
            },
        ],
        tags: ['photography', 'urban'],
    },
    {
        _id: 's105',
        txt: "There's something profoundly serene about sunrises. Woke up early for this view and it was totally worth it. Nature's way of reminding us to enjoy every moment.",
        imgUrl: '../img/story/sunrise.jpg',
        by: {
            _id: 'u105',
            fullname: 'Linda Gates',
            imgUrl: 'http://example.com/profile/linda.jpg',
        },
        loc: {
            lat: 34.05,
            lng: -118.24,
            name: 'Los Angeles',
        },
        comments: [
            {
                id: 'c5001',
                by: {
                    _id: 'u112',
                    fullname: 'Kevin',
                    imgUrl: 'http://example.com/profile/kevin.jpg',
                },
                txt: 'This is stunning, Linda!',
            },
        ],
        likedBy: [
            {
                _id: 'u112',
                fullname: 'Kevin',
                imgUrl: 'http://example.com/profile/kevin.jpg',
            },
            {
                _id: 'u113',
                fullname: 'Grace',
                imgUrl: 'http://example.com/profile/grace.jpg',
            },
        ],
        tags: ['sunrise', 'nature'],
    },
    {
        _id: 's106',
        txt: "Nothing beats a good book and a cup of coffee on a lazy Sunday afternoon. Currently reading 'The Great Gatsby'. Fitzgerald's portrayal of the Jazz Age never gets old.",
        imgUrl: '../img/story/coffeebook.jpg',
        by: {
            _id: 'u106',
            fullname: 'David Lee',
            imgUrl: 'http://example.com/profile/david.jpg',
        },
        comments: [
            {
                id: 'c6001',
                by: {
                    _id: 'u114',
                    fullname: 'Emma',
                    imgUrl: 'http://example.com/profile/emma.jpg',
                },
                txt: 'Love that book! Enjoy your day!',
            },
        ],
        likedBy: [
            {
                _id: 'u114',
                fullname: 'Emma',
                imgUrl: 'http://example.com/profile/emma.jpg',
            },
        ],
        tags: ['relax', 'reading', 'coffee'],
    },
]

import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'

import { Modal } from './Modal'
import { StoryDetail } from '../pages/StoryDetail'
import { StoryHeader } from './StoryHeader'
import { StoryIcons } from './StoryIcons'

import { AddComment } from './AddComment'

import { getActionUpdateStory } from '../store/story.actions'
import { storyService } from '../services/story.service.local'
import { utilService } from '../services/util.service'
import ActionList from './ActionList'

const MAX_LENGTH = 43

export function StoryPreview({ story }) {
    const [isStoryDetailModalOpen, setIsStoryModalOpen] = useState(false)
    const [isShowMore, setIsShowMore] = useState(story.txt.length > MAX_LENGTH)
    const [username, setUsername] = useState('') // State for username

    const dispatch = useDispatch()
    const navigate = useNavigate()

    let lastSpaceIndex = story.txt.slice(0, MAX_LENGTH).lastIndexOf(' ')

    const snippet =
        story.txt.length > MAX_LENGTH
            ? story.txt.slice(0, lastSpaceIndex) + '... '
            : story.txt

    useEffect(() => {
        async function fetchStoryUsername() {
            try {
                const fetchedUsername = await userService.getUsernameById(
                    story.by._id
                )
                console.log(
                    'StoryDetail Cmp - Successfully fetched username: ',
                    fetchedUsername
                )
                setUsername(fetchedUsername) // Set the username in state
            } catch {
                console.error(
                    'StoryDetail Cmp - cannot fetch username of the story creator'
                )
            }
        }

        fetchStoryUsername()
    }, [story.by._id]) // Dependency array: useEffect will run when story.by._id changes

    useEffect(() => {
        console.log('Updated story comments:', story.comments.length)
    }, [story.comments.length])

    function handleViewComment() {
        setIsStoryModalOpen(true) // Open the modal
    }

    function handleCloseStoryDetailModal() {
        setIsStoryModalOpen(false) // Close the modal
    }

    const commentStr = story.comments.length > 1 ? 'comments' : 'comment'

    let likeStr = utilService.createLikeStr(story.likedBy.length)

    return (
        <article className="story-preview">
            <StoryHeader story={story} cmpName={'StoryPreview'} />
            <img
                className="story-img"
                src={story.imgUrl}
                alt="Image"
                title="Image"
            />
            <section className="story-interaction-container flex column">
                <StoryIcons story={story} />

                <div className="username-story-snippet flex align-center">
                    <span>
                        <span
                            className="username"
                            onClick={() => navigate(`/user/${username}`)}
                        >
                            {username}
                        </span>
                        {isShowMore && (
                            <span className="snippet">{snippet}</span>
                        )}
                        {isShowMore && (
                            <span
                                className="snippet-more"
                                onClick={() => setIsShowMore(!isShowMore)}
                            >
                                more
                            </span>
                        )}
                        {!isShowMore && (
                            <span className="snippet">{story.txt}</span>
                        )}
                    </span>
                </div>
                {story.comments.length > 0 && (
                    <span className="view-comment" onClick={handleViewComment}>
                        View {`${story.comments.length} ${commentStr}`}
                    </span>
                )}
                <AddComment story={story} />
            </section>
            {/* StoryDetail - Modal Component */}
            {isStoryDetailModalOpen && (
                <Modal
                    isOpen={isStoryDetailModalOpen}
                    onClose={handleCloseStoryDetailModal}
                >
                    {/* Modal content here */}
                    <StoryDetail story={story} />
                </Modal>
            )}
        </article>
    )
}

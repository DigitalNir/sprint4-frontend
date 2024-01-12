import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Avatar } from '@mui/material'

import { StoryHeader } from '../cmps/StoryHeader'
import { StoryIcons } from '../cmps/StoryIcons'
import { AddComment } from '../cmps/AddComment'

import { utilService } from '../services/util.service'
import { storyService } from '../services/story.service.local'

export function StoryDetail({ story }) {
    const [username, setUsername] = useState('') // State for story creator username
    const [commentUsernames, setCommentUsernames] = useState({}) // State for comment usernames

    useEffect(() => {
        async function fetchStoryUsername() {
            try {
                const fetchedUsername = await userService.getUsernameById(
                    story.by._id
                )
                console.log(
                    'StoryHeader Cmp - Successfully fetched username: ',
                    fetchedUsername
                )
                setUsername(fetchedUsername) // Set the username in state
            } catch {
                console.error(
                    'StoryHeader Cmp - cannot fetch username of the story creator'
                )
            }
        }

        async function fetchCommentUsernames() {
            const usernames = {}
            for (const comment of story.comments) {
                try {
                    const fetchedUsername = await userService.getUsernameById(
                        comment.by._id
                    )
                    usernames[comment.id] = fetchedUsername
                } catch {
                    console.error(
                        `Cannot fetch username for comment id: ${comment.id}`
                    )
                }
            }
            setCommentUsernames(usernames)
        }

        fetchStoryUsername()
        fetchCommentUsernames()
    }, [story.by._id, story.comments]) // Dependency array: useEffect will run when story.by._id or story.comments change

    return (
        story && (
            <>
                <img
                    className="story-img"
                    src={story.imgUrl}
                    alt="Image"
                    title="Image"
                />
                <section className="story-detail">
                    <StoryHeader story={story} />
                    <div className="story-text-comments">
                        <div className="story-avatar-user-text flex align-center">
                            <Avatar className="avatar">
                                {username.charAt(0)}
                            </Avatar>
                            <div className="story-user-text flex column">
                                <span
                                    className="story-username"
                                    style={{ whiteSpace: 'pre-wrap' }}
                                >
                                    {username + ` `}
                                    <span className="story-txt">
                                        {story.txt}
                                    </span>
                                </span>
                                <span
                                    className="story-time"
                                    style={{ whiteSpace: 'pre' }}
                                >
                                    15h {`  `}
                                </span>
                            </div>
                        </div>
                        <div className="story-comments flex column">
                            {story.comments.map((comment) => (
                                <div key={comment.id} className="comment flex">
                                    <Avatar className="avatar">
                                        {commentUsernames[comment.id]?.charAt(
                                            0
                                        )}
                                    </Avatar>
                                    <div className="comment-text-username flex column">
                                        <span
                                            className="comment-username"
                                            style={{ whiteSpace: 'pre-wrap' }}
                                        >
                                            {commentUsernames[comment.id] + ` `}{' '}
                                            <span className="comment-text">
                                                {comment.txt}
                                            </span>
                                        </span>
                                        <span
                                            className="comment-time"
                                            style={{ whiteSpace: 'pre' }}
                                        >
                                            <span>
                                                {utilService.formatTimestamp(
                                                    comment.createdAt
                                                )}
                                                {`  `}
                                            </span>
                                            <span className="comment-reply">
                                                Reply
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="story-addcomment">
                        <StoryIcons story={story} />
                        <AddComment story={story} />
                    </div>
                </section>
            </>
        )
    )
}

import React from 'react'
import { StoryHeader } from '../cmps/StoryHeader'
import { Avatar } from '@mui/material'
import { StoryIcons } from '../cmps/StoryIcons'
import { utilService } from '../services/util.service'
import { AddComment } from '../cmps/AddComment'

export function StoryDetail({ story }) {
    return (
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
                            {story?.by?.fullname.charAt(0)}
                        </Avatar>
                        <div className="story-user-text flex column">
                            <span
                                className="story-username"
                                style={{ whiteSpace: 'pre-wrap' }}
                            >
                                {story?.by?.fullname + ` `}
                                <span className="story-txt">{story.txt}</span>
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
                                    {comment?.by?.fullname.charAt(0)}
                                </Avatar>
                                <div className="comment-text-username flex column">
                                    <span
                                        className="comment-username"
                                        style={{ whiteSpace: 'pre-wrap' }}
                                    >
                                        {comment?.by?.fullname + ` `}{' '}
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
}

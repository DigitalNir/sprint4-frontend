import React from 'react'
import { StoryHeader } from '../cmps/StoryHeader'
import { Avatar } from '@mui/material'

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
                    <div className="story-user-text flex align-center">
                        <Avatar className="avatar">
                            {story.by.fullname.charAt(0)}
                        </Avatar>
                        <span style={{ whiteSpace: 'pre-wrap' }}>
                            {story.by.fullname + ` ` + story.txt}
                        </span>
                        {/* <p>{story.txt}</p> */}
                    </div>
                    <div className="story-comments flex column">
                        {story.comments.map((comment) => (
                            <div key={comment.id} className="comment flex">
                                <Avatar className="avatar">
                                    {comment.by.fullname.charAt(0)}
                                </Avatar>
                                <div className="comment-text flex column">
                                    <span style={{ whiteSpace: 'pre-wrap' }}>
                                        {comment.by.fullname +
                                            ` ` +
                                            comment.txt}
                                    </span>
                                    <span
                                        className="comment-time"
                                        style={{ whiteSpace: 'pre' }}
                                    >
                                        <span>10h {`  `}</span>
                                        <span className="comment-reply">
                                            Reply
                                        </span>
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

import React from 'react'
import { StoryHeader } from '../cmps/StoryHeader'

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

                <p>{story.txt}</p>
            </section>
        </>
    )
}

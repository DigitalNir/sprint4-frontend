import { useState } from 'react'
import { eventBus } from '../services/event-bus.service'
import { storyService } from '../services/story.service.local'
import { utilService } from '../services/util.service'
import { userService } from '../services/user.service'

export function StoryIcons({ story }) {
    const [isLiked, setIsLiked] = useState(
        story.likedBy.some((u) => u._id === userService.getLoggedinUser()._id)
    )

    async function handleLike() {
        try {
            const updatedStory = await storyService.toggleLike(story)
            setIsLiked(
                updatedStory.likedBy.some(
                    (u) => u._id === userService.getLoggedinUser()._id
                )
            )

            eventBus.emit('toggleLike', updatedStory)
        } catch (err) {
            console.error('Cannot toggle like', err)
        }
    }

    let likeStr = utilService.createLikeStr(story.likedBy.length)

    const iconLikeCls = `icon-img like ${isLiked ? 'liked' : ''}`
    const toggleLikeTitleCls = `${isLiked ? 'Unlike' : 'Like'}`
    // debugger
    return (
        <>
            <div className="story-icons flex align-center">
                <button
                    className={iconLikeCls}
                    title={toggleLikeTitleCls}
                    onClick={handleLike}
                ></button>

                <button className="icon-img comment" title="Comment"></button>
                <button className="icon-img share" title="Share"></button>
                <button className="icon-img save" title="Save"></button>
            </div>
            <span className="like-count">{likeStr}</span>
        </>
    )
}

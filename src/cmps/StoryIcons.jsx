import { eventBus } from '../services/event-bus.service'
import { storyService } from '../services/story.service.local'
import { utilService } from '../services/util.service'

export function StoryIcons({ story }) {
    async function handleLike() {
        try {
            await storyService.toggleLike(story)
            eventBus.emit('toggleLike', story)
        } catch (err) {
            console.error('Cannot toggle like', err)
        }
    }

    let likeStr = utilService.createLikeStr(story.likedBy.length)

    // debugger
    return (
        <>
            <div className="story-icons flex align-center">
                <button
                    className="icon-img like"
                    title="Like/Unlike"
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

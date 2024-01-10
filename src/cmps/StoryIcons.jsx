import { eventBus } from '../services/event-bus.service'
import { storyService } from '../services/story.service.local'

export function StoryIcons({ story }) {
    function handleLike() {
        storyService.toggleLike(story)
        eventBus.emit('toggleLike', story)
    }

    return (
        <div className="story-icons flex align-center">
            <button
                className="icon-img like"
                title="Like"
                onClick={handleLike}
            ></button>
            <button className="icon-img comment" title="Comment"></button>
            <button className="icon-img share" title="Share"></button>
            <button className="icon-img save" title="Save"></button>
        </div>
    )
}

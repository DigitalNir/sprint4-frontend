import { storyService } from '../services/story.service.local'

export function StoryIcons({ story }) {
    function handleLike() {
        storyService.addLike(story)
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

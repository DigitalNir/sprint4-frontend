export function StoryIcons({ story }) {
    return (
        <div className="story-icons flex align-center">
            <button className="icon-img like" title="Like"></button>
            <button className="icon-img comment" title="Comment"></button>
            <button className="icon-img share" title="Share"></button>
            <button className="icon-img save" title="Save"></button>
        </div>
    )
}

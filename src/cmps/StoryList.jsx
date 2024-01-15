import { StoryPreview } from './StoryPreview.jsx'
export function StoryList({ storyData }) {
    console.log('🚀 ~ StoryList ~ storyData:', storyData)

    return (
        <section className="story-list">
            {storyData.map((story) => (
                <StoryPreview story={story} key={story._id} />
            ))}
        </section>
    )
}

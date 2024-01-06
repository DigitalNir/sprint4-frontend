import { StoryList } from '../cmps/StoryList'
import { storyData } from '../services/story'
console.log(storyData)
export function StoryIndex() {
    return (
        <main className="story-index">
            <StoryList storyData={storyData} />
        </main>
    )
}

import { useDispatch, useSelector } from 'react-redux'
// import { storyData } from '../services/story'
import { useEffect } from 'react'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import {
    loadStories,
    removeStory,
    addStory,
    updateStory,
    setStoryFilter,
} from '../store/story.actions'

import { StoryList } from '../cmps/StoryList'
import { storyService } from '../services/story.service.local'
// import { storyData } from '../services/story'

export function StoryIndex() {
    const dispatch = useDispatch()
    const stories = useSelector((storeState) => storeState.storyModule.stories)
    const filterBy = useSelector(
        (storeState) => storeState.storyModule.filterBy
    )

    useEffect(() => {
        try {
            loadStories()
        } catch (err) {
            console.log('err:', err)
            showErrorMsg('Cannot load toys')
        }
    }, [filterBy])

    async function onAddStory() {
        const storyToAdd = storyService.getEmptyStory()
        storyToAdd.txt = prompt('Story txt?')
        try {
            const addedStory = await addStory(storyToAdd)
            showSuccessMsg(`Story added (id: ${addedStory._id})`)
        } catch (err) {
            showErrorMsg('Cannot add story', err)
        }
    }

    if (!stories) return 'Loading...'
    return (
        <main className="story-index">
            <StoryList storyData={stories} />
        </main>
    )
}

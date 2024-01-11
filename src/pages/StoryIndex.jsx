import { useDispatch, useSelector } from 'react-redux'
// import { storyData } from '../services/story'
import { useEffect } from 'react'

import {
    eventBus,
    showErrorMsg,
    showSuccessMsg,
} from '../services/event-bus.service'
import {
    loadStories,
    removeStory,
    addStory,
    updateStory,
    setStoryFilter,
    getActionUpdateStory,
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
            eventBus.on('toggleLike', (story) => {
                console.log('from event bus', story)
                dispatch(getActionUpdateStory(story))
            })
        } catch (err) {
            console.log('err:', err)
            showErrorMsg('Cannot load stories')
        }
    }, [filterBy])

    if (!stories) return 'Loading...'
    return (
        <section className="story-index">
            <StoryList storyData={stories} />
        </section>
    )
}

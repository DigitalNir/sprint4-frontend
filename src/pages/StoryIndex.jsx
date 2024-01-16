import { useDispatch, useSelector } from 'react-redux'
// import { storyData } from '../services/story'
import { useEffect } from 'react'
import Loader from './Loader'
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
    setActivePage,
} from '../store/story.actions'

import { StoryList } from '../cmps/StoryList'
import { storyService } from '../services/story.service.local'
import { LOADING_DONE, systemReducer } from '../store/system.reducer'
// import { storyData } from '../services/story'

export function StoryIndex() {
    const isLoading = useSelector(
        (storeState) => storeState.systemModule.isLoading
    )
    const loggedinUser = useSelector((storeState) => storeState.userModule.user)
    const dispatch = useDispatch()
    const stories = useSelector((storeState) => storeState.storyModule.stories)
    const filterBy = useSelector(
        (storeState) => storeState.storyModule.filterBy
    )

    useEffect(() => {
        setActivePage('home')
    }, [])

    useEffect(() => {
        try {
            // dispatch(systemReducer(false, { type: LOADING_START }))
            dispatch(loadStories())
            eventBus.on('toggleLike', (story) => {
                console.log('from event bus', story)
                dispatch(getActionUpdateStory(story))
            })
        } catch (err) {
            console.log('err:', err)
            showErrorMsg('Cannot load stories')
        }
        // finally {
        // dispatch(systemReducer(true, { type: LOADING_DONE }))
        // }
    }, [filterBy, loggedinUser])

    if (!stories) return 'Loading...'
    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <section className="story-index">
                    <StoryList storyData={stories} />
                </section>
            )}
        </>
    )
}

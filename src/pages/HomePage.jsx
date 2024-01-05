import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { CHANGE_COUNT } from '../store/user.reducer'
import { StoryIndex } from './StoryIndex'
import { NavBar } from '../cmps/NavBar'
import { Suggestion } from '../cmps/Suggestion.jsx'

export function HomePage() {
    // const dispatch = useDispatch()
    // const count = useSelector(storeState => storeState.userModule.count)

    // function changeCount(diff) {
    //     console.log('Changing count by:', diff);
    //     dispatch({ type: CHANGE_COUNT, diff })
    // }

    return (
        <section className="homepage flex">
            <NavBar />
            <section className="main-container flex">
                <StoryIndex />
                <Suggestion />
            </section>
        </section>
    )
}

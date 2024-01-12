import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { StoryIndex } from './StoryIndex'
import { NavBar } from '../cmps/NavBar'
import { Suggestion } from '../cmps/Suggestion.jsx'
// import { AppHeader } from '../cmps/AppHeader.jsx'
import { userService } from '../services/user.service.js'
import { LoginSignup } from '../cmps/LoginSignup.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/user.actions.js'

export function HomePage() {
    const user = useSelector((storeState) => storeState.userModule.user)

    async function onLogin(credentials) {
        try {
            const user = await login(credentials)
            showSuccessMsg(`Welcome: ${user.fullname || user.username}`)
        } catch (err) {
            showErrorMsg('Cannot login')
        }
    }
    async function onSignup(credentials) {
        try {
            const user = await signup(credentials)
            showSuccessMsg(
                `Welcome new user: ${user.fullname || user.username}`
            )
        } catch (err) {
            showErrorMsg('Cannot signup')
        }
    }
    async function onLogout() {
        try {
            await logout()
            showSuccessMsg(`Bye now`)
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    const loggedinUser = userService.getLoggedinUser()
    if (!loggedinUser)
        return <LoginSignup onLogin={onLogin} onSignup={onSignup} />
    else {
        return (
            <>
                <NavBar />
                <section className="homepage">
                    {/* <AppHeader /> */}
                    <section className="main-container flex">
                        <StoryIndex />
                        <Suggestion />
                    </section>
                </section>
            </>
        )
    }
}

import React from 'react'
import { Routes, Route } from 'react-router'

import routes from './routes'

import { UserDetails } from './pages/UserDetails'
import { AppHeader } from './cmps/AppHeader'

export function RootCmp() {
    return (
        <>
            <AppHeader />
            <main>
                <Routes>
                    {routes.map((route) => (
                        <Route
                            key={route.path}
                            exact={true}
                            element={route.component}
                            path={route.path}
                        />
                    ))}
                    <Route path="user/:id" element={<UserDetails />} />
                </Routes>
            </main>
            {/* <AppFooter /> */}
        </>
    )
}

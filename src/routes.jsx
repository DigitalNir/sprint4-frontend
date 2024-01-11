import { StoryCreate } from './cmps/StoryCreate.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { ProfilePage } from './pages/ProfilePage.jsx'
import { StoryDetail } from './pages/StoryDetail.jsx'
import { StoryIndex } from './pages/StoryIndex.jsx'

const routes = [
    {
        path: '*',
        component: <HomePage />,
        label: 'Home 🏠',
    },
    {
        path: '/',
        component: <HomePage />,
        label: 'Home 🏠',
    },
    {
        path: '/story',
        component: <StoryIndex />,
        label: 'Stories',
    },
    // {
    //     path: '/story/edit',
    //     component: <StoryCreate />,
    //     label: 'Create Story',
    // },
    {
        path: '/story/edit/:storyId',
        component: <StoryCreate />,
        label: 'Create Story',
    },
    {
        path: '/story/:storyId',
        component: <StoryDetail />,
        label: 'Story Detail',
    },
    {
        path: '/user/:fullname',
        component: <ProfilePage />,
        label: 'User Profile',
    },
]

export default routes

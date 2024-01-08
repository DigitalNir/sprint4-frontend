import { HomePage } from './pages/HomePage.jsx'
import { StoryIndex } from './pages/StoryIndex.jsx'

const routes = [
    {
        path: '/',
        component: <HomePage />,
        label: 'Home 🏠',
    },
    {
        path: 'story',
        component: <StoryIndex />,
        label: 'Stories',
    },
]

export default routes

import { Avatar } from '@mui/material'
import ThreeDots from '../img/svg/3dots.svg'

export function StoryHeader({ story, cmpName }) {
    console.log(
        '🚀 ~ file: StoryHeader.jsx:5 ~ StoryHeader ~ cmpName:',
        cmpName
    )

    const shouldRender = cmpName === 'StoryPreview' ? true : false

    return (
        <div className="story-header flex align-center">
            <Avatar className="avatar">{story.by.fullname.charAt(0)}</Avatar>
            <div className="username-time-location flex column">
                <div className="username-time flex align-center">
                    <span className="username">{story.by.fullname}</span>
                    {shouldRender && (
                        <>
                            <span className="dot"> • </span>
                            <span className="time">23d</span>
                        </>
                    )}
                </div>
                {shouldRender && (
                    <span className="location">
                        {story.loc
                            ? story.loc.name
                            : 'Somewhere over the rainbow'}
                    </span>
                )}
            </div>
            <img
                className="icon-img more"
                src={ThreeDots}
                alt="More options"
                title="More options"
            />
        </div>
    )
}

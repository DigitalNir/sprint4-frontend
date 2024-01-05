import { Avatar } from '@mui/material'
import ThreeDots from '../img/svg/3dots.svg'
import PlaceHolderImg from '../img/story/pexels-leeloo-thefirst-5386829.jpg'

export function StoryPreview() {
    return (
        <article className="story-preview">
            <div className="story-preview-header flex align-center">
                <Avatar className="avatar">R</Avatar>
                <div className="username-time-location flex column">
                    <div className="username-time flex align-center">
                        <span className="username">mentality_facts</span>
                        <span className="dot"> • </span>
                        <span className="time">23d</span>
                    </div>
                    <span className="location">Herzliya, Israel</span>
                </div>
                <img
                    className="icon-img"
                    src={ThreeDots}
                    alt="More options"
                    title="More options"
                />
            </div>
            <img
                className="story-img"
                src={PlaceHolderImg}
                alt="Image"
                title="Image"
            />
        </article>
    )
}

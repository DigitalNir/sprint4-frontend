import { Avatar } from '@mui/material'
import ThreeDots from '../img/svg/3dots.svg'
import PlaceHolderImg from '../img/story/pexels-leeloo-thefirst-5386829.jpg'
import Like from '../img/svg/notification.svg'
import Comment from '../img/svg/comment.svg'
import Save from '../img/svg/save.svg'
import Share from '../img/svg/message.svg'

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
            <section className="story-interaction-container flex column">
                <div className="story-icons flex align-center">
                    <img
                        className="icon-img"
                        src={Like}
                        alt="Like"
                        title="Like"
                    />
                    <img
                        className="icon-img"
                        src={Comment}
                        alt="Comment"
                        title="Comment"
                    />
                    <img
                        className="icon-img"
                        src={Share}
                        alt="Share"
                        title="Share"
                    />
                    <img
                        className="icon-img save"
                        src={Save}
                        alt="Save"
                        title="Save"
                    />
                </div>
                <span className="like-count">5 likes</span>
                <div className="username-story-snippet flex align-center">
                    <span className="username">Jennifer</span>
                    <span className="snippet">Sooo beautiful! 💕</span>
                </div>
                <span className="view-comment">View 1 comment</span>
                <input
                    className="add-comment"
                    type="text"
                    name="add-comment"
                    id="add-comment"
                    placeholder="Add a comment..."
                />
            </section>
        </article>
    )
}

import { Avatar } from '@mui/material'
import { useState } from 'react'

import ThreeDots from '../img/svg/3dots.svg'
import { TransitionsModal } from './StoryDetail'

const MAX_LENGTH = 43
// import PlaceHolderImg from '../img/story/pexels-leeloo-thefirst-5386829.jpg'
// import Like from '../img/svg/notification.svg'
// import Comment from '../img/svg/comment.svg'
// import Save from '../img/svg/save.svg'
// import Share from '../img/svg/message.svg'

export function StoryPreview({ story }) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    let lastSpaceIndex = story.txt.slice(0, MAX_LENGTH).lastIndexOf(' ')

    const snippet =
        story.txt.length > MAX_LENGTH
            ? story.txt.slice(0, lastSpaceIndex) + '... '
            : story.txt

    const isShowMore = story.txt.length > MAX_LENGTH

    const handleViewComment = () => {
        setIsModalOpen(true) // Open the modal
    }

    const handleCloseModal = () => {
        setIsModalOpen(false) // Close the modal
    }

    return (
        <article className="story-preview">
            <div className="story-preview-header flex align-center">
                <Avatar className="avatar">
                    {story.by.fullname.charAt(0)}
                </Avatar>
                <div className="username-time-location flex column">
                    <div className="username-time flex align-center">
                        <span className="username">{story.by.fullname}</span>
                        <span className="dot"> • </span>
                        <span className="time">23d</span>
                    </div>
                    <span className="location">
                        {story.loc
                            ? story.loc.name
                            : 'Somewhere over the rainbow'}
                    </span>
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
                src={story.imgUrl}
                alt="Image"
                title="Image"
            />
            <section className="story-interaction-container flex column">
                <div className="story-icons flex align-center">
                    <button className="icon-img like" title="Like"></button>
                    <button
                        className="icon-img comment"
                        title="Comment"
                    ></button>
                    <button className="icon-img share" title="Share"></button>
                    <button className="icon-img save" title="Save"></button>
                </div>
                <span className="like-count">{story.likedBy.length} likes</span>
                <div className="username-story-snippet flex align-center">
                    <span className="username">{story.by.fullname}</span>
                    <span className="snippet">{snippet}</span>
                    {isShowMore && <span className="snippet-more">more</span>}
                </div>
                <span className="view-comment" onClick={handleViewComment}>
                    View {story.comments.length} comments
                </span>
                <input
                    className="add-comment"
                    type="text"
                    name="add-comment"
                    id="add-comment"
                    placeholder="Add a comment..."
                />
            </section>
            {/* Modal Component */}
            {isModalOpen && (
                <TransitionsModal
                    open={isModalOpen}
                    handleClose={handleCloseModal}
                />
            )}
        </article>
    )
}

// export function StoryPreview({ story }) {
//     return (
//         <article className="story-preview">
//             <div className="story-preview-header flex align-center">
//                 <Avatar className="avatar">R</Avatar>
//                 <div className="username-time-location flex column">
//                     <div className="username-time flex align-center">
//                         <span className="username">mentality_facts</span>
//                         <span className="dot"> • </span>
//                         <span className="time">23d</span>
//                     </div>
//                     <span className="location">Herzliya, Israel</span>
//                 </div>
//                 <img
//                     className="icon-img"
//                     src={ThreeDots}
//                     alt="More options"
//                     title="More options"
//                 />
//             </div>
//             <img
//                 className="story-img"
//                 src={PlaceHolderImg}
//                 alt="Image"
//                 title="Image"
//             />
//             <section className="story-interaction-container flex column">
//                 <div className="story-icons flex align-center">
//                     {/* <img
//                         className="icon-img"
//                         src={Like}
//                         alt="Like"
//                         title="Like"
//                     />
//                     <img
//                         className="icon-img"
//                         src={Comment}
//                         alt="Comment"
//                         title="Comment"
//                     />
//                     <img
//                         className="icon-img"
//                         src={Share}
//                         alt="Share"
//                         title="Share"
//                     />
//                     <img
//                         className="icon-img save"
//                         src={Save}
//                         alt="Save"
//                         title="Save"
//                     /> */}
//                     <button className="icon-img like" title="Like"></button>
//                     <button
//                         className="icon-img comment"
//                         title="Comment"
//                     ></button>
//                     <button className="icon-img share" title="Share"></button>
//                     <button className="icon-img save" title="Save"></button>
//                 </div>
//                 <span className="like-count">5 likes</span>
//                 <div className="username-story-snippet flex align-center">
//                     <span className="username">Jennifer</span>
//                     <span className="snippet">Sooo beautiful! 💕</span>
//                 </div>
//                 <span className="view-comment">View 1 comment</span>
//                 <input
//                     className="add-comment"
//                     type="text"
//                     name="add-comment"
//                     id="add-comment"
//                     placeholder="Add a comment..."
//                 />
//             </section>
//         </article>
//     )
// }

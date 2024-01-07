import Backdrop from '@mui/material/Backdrop'
import Fade from '@mui/material/Fade'
import Modal from '@mui/material/Modal'
import { styled } from '@mui/system'
import React from 'react'

// Custom styled Backdrop
const MyBackdrop = styled(Backdrop)({
    // Add your custom styles for the backdrop here
    zIndex: 1, // Adjust the zIndex as needed
    color: '#fff', // Change the color as per your design
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust background color and opacity
    // Add more styles as required
})

// Custom styled Fade
const MyFade = styled(Fade)({
    // Add your custom styles for the fade transition here
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // Add more styles for the fade transition
})

export function TransitionsModal({ open, handleClose }) {
    console.log('hi from modal')
    return (
        <div>
            <button type="button" onClick={open}>
                Open Modal
            </button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ Backdrop: MyBackdrop }}
                slotProps={{ Backdrop: { timeout: 500 } }}
            >
                <MyFade in={open}>
                    <div
                        style={{
                            backgroundColor: 'white',
                            padding: '20px',
                            borderRadius: '4px',
                        }}
                    >
                        <h2 id="transition-modal-title">Modal Title</h2>
                        <p id="transition-modal-description">
                            Your content here
                        </p>
                    </div>
                </MyFade>
            </Modal>
        </div>
    )
}

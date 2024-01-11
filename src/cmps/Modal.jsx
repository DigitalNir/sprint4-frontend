import { useEffect } from 'react'
import ReactDOM from 'react-dom'

export function Modal({ isOpen, children, onClose }) {
    useEffect(() => {
        if (isOpen) {
            // Add the overflow hidden style to body when the modal is open
            document.body.style.overflow = 'hidden'
        }

        return () => {
            // Reset the overflow style on body when the modal is closed
            document.body.style.overflow = ''
        }
    }, [isOpen])

    if (!isOpen) return null

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    return ReactDOM.createPortal(
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <div className="modal-content">{children}</div>
            <button className="modal-close" onClick={onClose}>
                X
            </button>
        </div>,
        document.body
    )
}

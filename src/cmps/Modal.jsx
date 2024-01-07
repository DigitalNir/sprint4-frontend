import ReactDOM from 'react-dom'

export function Modal({ isOpen, children, onClose }) {
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

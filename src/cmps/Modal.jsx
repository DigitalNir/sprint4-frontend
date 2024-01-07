export function Modal({ isOpen, onClose, children }) {
    {
        if (!isOpen) return null

        return (
            <div className="modal-backdrop">
                <div className="modal-content">
                    <button className="modal-close" onClick={onClose}>
                        X
                    </button>
                    {children}
                </div>
            </div>
        )
    }
}

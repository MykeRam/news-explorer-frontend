import { useEffect } from 'react'
import '../ModalWithForm/ModalWithForm.css'
import './RegistrationSuccessModal.css'

function RegistrationSuccessModal({ isOpen, onClose, onSignInClick }) {
  useEffect(() => {
    if (!isOpen) return undefined

    const handleEscape = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleOverlayMouseDown = (event) => {
    if (event.target === event.currentTarget) onClose()
  }

  return (
    <div className="modal" onMouseDown={handleOverlayMouseDown}>
      <section
        className="modal__container registration-success"
        role="dialog"
        aria-modal="true"
        aria-labelledby="registration-success-title"
      >
        <button
          className="modal__close"
          type="button"
          aria-label="Close registration confirmation"
          onClick={onClose}
        />
        <h2
          className="modal__title registration-success__title"
          id="registration-success-title"
        >
          Registration successfully completed!
        </h2>
        <button
          className="modal__alternate-button registration-success__sign-in"
          type="button"
          onClick={onSignInClick}
        >
          Sign in
        </button>
      </section>
    </div>
  )
}

export default RegistrationSuccessModal

import { useRef } from 'react'
import useModal from '../../hooks/useModal.js'
import './ModalWithForm.css'

function ModalWithForm({
  isOpen,
  onClose,
  onSubmit,
  title,
  name,
  buttonText,
  alternateText,
  onAlternateClick,
  children,
  isSubmitDisabled = true,
}) {
  const containerRef = useRef(null)
  useModal(isOpen, onClose, containerRef)

  if (!isOpen) return null

  const handleOverlayMouseDown = (event) => {
    if (event.target === event.currentTarget) onClose()
  }

  return (
    <div className="modal" onMouseDown={handleOverlayMouseDown}>
      <div
        className="modal__container"
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${name}-modal-title`}
      >
        <button
          className="modal__close"
          type="button"
          aria-label={`Close ${title} dialog`}
          onClick={onClose}
        />
        <h2 className="modal__title" id={`${name}-modal-title`}>
          {title}
        </h2>
        <form className="modal__form" name={name} onSubmit={onSubmit} noValidate>
          {children}
          <button
            className="modal__submit"
            type="submit"
            disabled={isSubmitDisabled}
          >
            {buttonText}
          </button>
        </form>
        <p className="modal__alternate">
          or{' '}
          <button
            className="modal__alternate-button"
            type="button"
            onClick={onAlternateClick}
          >
            {alternateText}
          </button>
        </p>
      </div>
    </div>
  )
}

export default ModalWithForm

import { useEffect, useState } from 'react'
import './RegisterModal.css'
import ModalWithForm from '../ModalWithForm/ModalWithForm.jsx'

function RegisterModal({ isOpen, onClose, onLoginClick, onRegister }) {
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setSubmitError('')
      setIsSubmitting(false)
    }
  }, [isOpen])

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    setSubmitError('')
    setIsSubmitting(true)
    onRegister({
      email: formData.get('email'),
      password: formData.get('password'),
      name: formData.get('name'),
    })
      .then(onLoginClick)
      .catch((error) => setSubmitError(error.message))
      .finally(() => setIsSubmitting(false))
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Sign up"
      name="register"
      buttonText={isSubmitting ? 'Signing up...' : 'Sign up'}
      alternateText="Sign in"
      onAlternateClick={onLoginClick}
      isSubmitDisabled={isSubmitting}
    >
      <label className="modal__label" htmlFor="register-email">
        Email
        <input
          className="modal__input"
          id="register-email"
          name="email"
          type="email"
          placeholder="Enter email"
          autoComplete="email"
          autoFocus
          required
        />
      </label>
      <label className="modal__label" htmlFor="register-password">
        Password
        <input
          className="modal__input"
          id="register-password"
          name="password"
          type="password"
          placeholder="Enter password"
          autoComplete="new-password"
          required
        />
      </label>
      <label className="modal__label" htmlFor="register-name">
        Username
        <input
          className="modal__input"
          id="register-name"
          name="name"
          type="text"
          placeholder="Enter your username"
          autoComplete="name"
          required
        />
      </label>
      <span className="modal__server-error" role="alert">
        {submitError}
      </span>
    </ModalWithForm>
  )
}

export default RegisterModal

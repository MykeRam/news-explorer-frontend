import { useEffect, useRef, useState } from 'react'
import './LoginModal.css'
import ModalWithForm from '../ModalWithForm/ModalWithForm.jsx'

import { validateAuthField, PASSWORD_MIN_LENGTH } from '../../utils/authValidation.js'

function LoginModal({ isOpen, onClose, onRegisterClick, onLogin }) {
  const [values, setValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({ email: '', password: '' })
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const submitting = useRef(false)
  const requestGeneration = useRef(0)

  useEffect(() => {
    if (!isOpen) {
      requestGeneration.current += 1
      submitting.current = false
      setValues({ email: '', password: '' })
      setErrors({ email: '', password: '' })
      setSubmitError('')
      setIsSubmitting(false)
    }
    return () => { requestGeneration.current += 1 }
  }, [isOpen])

  const getInputError = ({ name, value, validity }) =>
    validateAuthField(name, value) ||
    (validity.typeMismatch ? 'Please enter a valid email address.' : '')

  const handleChange = (event) => {
    const { name, value } = event.target
    const error = getInputError(event.target)
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: error }))
    setSubmitError('')
  }

  const handleBlur = (event) => {
    const { name } = event.target
    const error = getInputError(event.target)
    setErrors((current) => ({ ...current, [name]: error }))
  }

  const isFormValid = Object.entries(values)
    .every(([name, value]) => !validateAuthField(name, value)) &&
    !Object.values(errors).some(Boolean)

  const handleClose = () => {
    requestGeneration.current += 1
    onClose()
  }
  const handleRegisterClick = () => {
    requestGeneration.current += 1
    onRegisterClick()
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!isFormValid || submitting.current || !event.currentTarget.checkValidity()) return
    const generation = ++requestGeneration.current
    submitting.current = true
    setSubmitError('')
    setIsSubmitting(true)
    onLogin({ ...values, email: values.email.trim() })
      .catch((error) => {
        if (generation === requestGeneration.current) {
          setSubmitError(error.status ? error.message : 'Unable to sign in. Check your connection and try again.')
        }
      })
      .finally(() => {
        if (generation === requestGeneration.current) {
          submitting.current = false
          setIsSubmitting(false)
        }
      })
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      title="Sign in"
      name="login"
      buttonText={isSubmitting ? 'Signing in...' : 'Sign in'}
      alternateText="Sign up"
      onAlternateClick={handleRegisterClick}
      isSubmitDisabled={!isFormValid || isSubmitting}
    >
      <label className="modal__label" htmlFor="login-email">
        Email
        <input
          className="modal__input"
          id="login-email"
          name="email"
          type="email"
          placeholder="Enter email"
          autoComplete="email"
          data-modal-autofocus
          value={values.email}
          aria-describedby="login-email-error"
          aria-invalid={Boolean(errors.email)}
          disabled={isSubmitting}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        <span className="modal__input-error" id="login-email-error" aria-live="polite">
          {errors.email}
        </span>
      </label>
      <label className="modal__label" htmlFor="login-password">
        Password
        <input
          className="modal__input"
          id="login-password"
          name="password"
          type="password"
          placeholder="Enter password"
          autoComplete="current-password"
          minLength={PASSWORD_MIN_LENGTH}
          value={values.password}
          aria-describedby="login-password-error"
          aria-invalid={Boolean(errors.password)}
          disabled={isSubmitting}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        <span className="modal__input-error" id="login-password-error" aria-live="polite">
          {errors.password}
        </span>
      </label>
      <span className="modal__server-error" role="alert">
        {submitError}
      </span>
    </ModalWithForm>
  )
}

export default LoginModal

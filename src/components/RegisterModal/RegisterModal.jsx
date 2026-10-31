import { useEffect, useRef, useState } from 'react'
import './RegisterModal.css'
import ModalWithForm from '../ModalWithForm/ModalWithForm.jsx'
import {
  validateAuthField,
  PASSWORD_MIN_LENGTH,
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
} from '../../utils/authValidation.js'

const getInputError = ({ name, value, validity }) =>
  validateAuthField(name, value) ||
  (validity.typeMismatch ? 'Please enter a valid email address.' : '')

function RegisterModal({ isOpen, onClose, onLoginClick, onRegister, onSuccess }) {
  const [values, setValues] = useState({ email: '', password: '', name: '' })
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const requestGeneration = useRef(0)
  const submitting = useRef(false)

  useEffect(() => {
    if (!isOpen) {
      requestGeneration.current += 1
      submitting.current = false
      setValues({ email: '', password: '', name: '' })
      setErrors({})
      setSubmitError('')
      setIsSubmitting(false)
    }
    return () => { requestGeneration.current += 1 }
  }, [isOpen])

  const isFormValid = Object.entries(values)
    .every(([name, value]) => !validateAuthField(name, value)) &&
    !Object.values(errors).some(Boolean)

  const handleChange = (event) => {
    const { name, value } = event.target
    const error = getInputError(event.target)
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({
      ...current,
      [name]: error,
    }))
    setSubmitError('')
  }

  const handleBlur = (event) => {
    const { name } = event.target
    const error = getInputError(event.target)
    setErrors((current) => ({ ...current, [name]: error }))
  }

  const handleClose = () => {
    requestGeneration.current += 1
    onClose()
  }
  const handleLoginClick = () => {
    requestGeneration.current += 1
    onLoginClick()
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!isFormValid || submitting.current || !event.currentTarget.checkValidity()) return
    const generation = ++requestGeneration.current
    submitting.current = true
    setSubmitError('')
    setIsSubmitting(true)
    onRegister({ ...values, email: values.email.trim(), name: values.name.trim() })
      .then(() => {
        if (generation === requestGeneration.current) onSuccess()
      })
      .catch((error) => {
        if (generation === requestGeneration.current) {
          setSubmitError(error.status ? error.message : 'Unable to sign up. Check your connection and try again.')
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
      title="Sign up"
      name="register"
      buttonText={isSubmitting ? 'Signing up...' : 'Sign up'}
      alternateText="Sign in"
      onAlternateClick={handleLoginClick}
      isSubmitDisabled={!isFormValid || isSubmitting}
    >
      <label className="modal__label" htmlFor="register-email">
        Email
        <input
          className="modal__input"
          id="register-email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={Boolean(errors.email)}
          aria-describedby="register-email-error"
          disabled={isSubmitting}
          type="email"
          placeholder="Enter email"
          autoComplete="email"
          data-modal-autofocus
          required
        />
        <span className="modal__input-error" id="register-email-error" aria-live="polite">
          {errors.email}
        </span>
      </label>
      <label className="modal__label" htmlFor="register-password">
        Password
        <input
          className="modal__input"
          id="register-password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={Boolean(errors.password)}
          aria-describedby="register-password-error"
          disabled={isSubmitting}
          type="password"
          placeholder="Enter password"
          autoComplete="new-password"
          minLength={PASSWORD_MIN_LENGTH}
          required
        />
        <span className="modal__input-error" id="register-password-error" aria-live="polite">
          {errors.password}
        </span>
      </label>
      <label className="modal__label" htmlFor="register-name">
        Username
        <input
          className="modal__input"
          id="register-name"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={Boolean(errors.name)}
          aria-describedby="register-name-error"
          disabled={isSubmitting}
          type="text"
          placeholder="Enter your username"
          autoComplete="name"
          minLength={USERNAME_MIN_LENGTH}
          maxLength={USERNAME_MAX_LENGTH}
          required
        />
        <span className="modal__input-error" id="register-name-error" aria-live="polite">
          {errors.name}
        </span>
      </label>
      <span className="modal__server-error" role="alert">
        {submitError}
      </span>
    </ModalWithForm>
  )
}

export default RegisterModal

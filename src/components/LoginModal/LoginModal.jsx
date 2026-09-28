import { useEffect, useState } from 'react'
import './LoginModal.css'
import ModalWithForm from '../ModalWithForm/ModalWithForm.jsx'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const validateEmail = (email) => {
  if (!email.trim()) {
    return 'Please enter your email.'
  }

  if (!EMAIL_PATTERN.test(email)) {
    return 'Please enter a valid email address.'
  }

  return ''
}

const validatePassword = (password) =>
  password.trim() ? '' : 'Please enter your password.'

function LoginModal({ isOpen, onClose, onRegisterClick }) {
  const [values, setValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({ email: '', password: '' })
  const [touched, setTouched] = useState({ email: false, password: false })

  useEffect(() => {
    if (!isOpen) {
      setValues({ email: '', password: '' })
      setErrors({ email: '', password: '' })
      setTouched({ email: false, password: false })
    }
  }, [isOpen])

  const validators = {
    email: validateEmail,
    password: validatePassword,
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setValues((currentValues) => ({ ...currentValues, [name]: value }))

    if (touched[name]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [name]: validators[name](value),
      }))
    }
  }

  const handleBlur = (event) => {
    const { name, value } = event.target

    setTouched((currentTouched) => ({ ...currentTouched, [name]: true }))
    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: validators[name](value),
    }))
  }

  const isFormValid =
    !validateEmail(values.email) && !validatePassword(values.password)

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!isFormValid) {
      setTouched({ email: true, password: true })
      setErrors({
        email: validateEmail(values.email),
        password: validatePassword(values.password),
      })
    }
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Sign in"
      name="login"
      buttonText="Sign in"
      alternateText="Sign up"
      onAlternateClick={onRegisterClick}
      isSubmitDisabled={!isFormValid}
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
          autoFocus
          value={values.email}
          aria-describedby="login-email-error"
          aria-invalid={Boolean(errors.email)}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        <span className="modal__input-error" id="login-email-error">
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
          value={values.password}
          aria-describedby="login-password-error"
          aria-invalid={Boolean(errors.password)}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        <span className="modal__input-error" id="login-password-error">
          {errors.password}
        </span>
      </label>
    </ModalWithForm>
  )
}

export default LoginModal

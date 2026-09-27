import './LoginModal.css'
import ModalWithForm from '../ModalWithForm/ModalWithForm.jsx'

function LoginModal({ isOpen, onClose, onRegisterClick }) {
  const handleSubmit = (event) => event.preventDefault()

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
        />
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
        />
      </label>
    </ModalWithForm>
  )
}

export default LoginModal

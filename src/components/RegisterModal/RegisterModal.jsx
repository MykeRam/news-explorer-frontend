import './RegisterModal.css'
import ModalWithForm from '../ModalWithForm/ModalWithForm.jsx'

function RegisterModal({ isOpen, onClose, onLoginClick }) {
  const handleSubmit = (event) => event.preventDefault()

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Sign up"
      name="register"
      buttonText="Sign up"
      alternateText="Sign in"
      onAlternateClick={onLoginClick}
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
    </ModalWithForm>
  )
}

export default RegisterModal

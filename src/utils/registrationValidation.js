export const REGISTRATION_PASSWORD_MIN_LENGTH = 8
export const REGISTRATION_NAME_MIN_LENGTH = 2
export const REGISTRATION_NAME_MAX_LENGTH = 30

export const validateRegistrationField = (name, value) => {
  if (!value.trim()) return `Please enter your ${name === 'name' ? 'username' : name}.`
  if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return 'Please enter a valid email address.'
  }
  if (name === 'password' && value.length < REGISTRATION_PASSWORD_MIN_LENGTH) {
    return `Password must contain at least ${REGISTRATION_PASSWORD_MIN_LENGTH} characters.`
  }
  if (name === 'name' && (value.trim().length < REGISTRATION_NAME_MIN_LENGTH ||
      value.trim().length > REGISTRATION_NAME_MAX_LENGTH)) {
    return `Username must contain ${REGISTRATION_NAME_MIN_LENGTH}–${REGISTRATION_NAME_MAX_LENGTH} characters.`
  }
  return ''
}

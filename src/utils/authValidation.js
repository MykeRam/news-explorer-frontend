import {
  PASSWORD_MIN_LENGTH, USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH,
  EMAIL_PATTERN, INVALID_EMAIL_MESSAGE,
} from './config.js'

export const validateAuthField = (name, value) => {
  if (!value.trim()) return `Please enter your ${name === 'name' ? 'username' : name}.`
  if (name === 'email' && !EMAIL_PATTERN.test(value)) {
    return INVALID_EMAIL_MESSAGE
  }
  if (name === 'password' && value.length < PASSWORD_MIN_LENGTH) {
    return `Password must contain at least ${PASSWORD_MIN_LENGTH} characters.`
  }
  if (name === 'name' && (value.trim().length < USERNAME_MIN_LENGTH ||
      value.trim().length > USERNAME_MAX_LENGTH)) {
    return `Username must contain ${USERNAME_MIN_LENGTH}–${USERNAME_MAX_LENGTH} characters.`
  }
  return ''
}

export const PASSWORD_MIN_LENGTH = 8
export const USERNAME_MIN_LENGTH = 2
export const USERNAME_MAX_LENGTH = 30

export const validateAuthField = (name, value) => {
  if (!value.trim()) return `Please enter your ${name === 'name' ? 'username' : name}.`
  if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return 'Please enter a valid email address.'
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

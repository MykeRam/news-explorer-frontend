import { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Preloader from '../Preloader/Preloader.jsx'

function ProtectedRoute({
  isLoggedIn,
  isAuthChecking,
  sessionError,
  onUnauthorized,
  children,
}) {
  useEffect(() => {
    if (!isAuthChecking && !sessionError && !isLoggedIn) {
      onUnauthorized()
    }
  }, [isAuthChecking, isLoggedIn, sessionError, onUnauthorized])

  if (isAuthChecking) {
    return <Preloader message="Checking your session..." />
  }

  if (sessionError) return null

  if (!isLoggedIn) {
    return <Redirect to="/" />
  }

  return children
}

export default ProtectedRoute

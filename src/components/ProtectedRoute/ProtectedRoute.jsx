import { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Preloader from '../Preloader/Preloader.jsx'

function ProtectedRoute({
  isLoggedIn,
  isAuthChecking,
  onUnauthorized,
  children,
}) {
  useEffect(() => {
    if (!isAuthChecking && !isLoggedIn) {
      onUnauthorized()
    }
  }, [isAuthChecking, isLoggedIn, onUnauthorized])

  if (isAuthChecking) {
    return <Preloader />
  }

  if (!isLoggedIn) {
    return <Redirect to="/" />
  }

  return children
}

export default ProtectedRoute

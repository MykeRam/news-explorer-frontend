import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
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
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute

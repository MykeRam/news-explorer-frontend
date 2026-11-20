import { useEffect, useRef } from 'react'

export default function useModal(isOpen, onClose, containerRef) {
  const onCloseRef = useRef(onClose)
  useEffect(() => { onCloseRef.current = onClose }, [onClose])

  useEffect(() => {
    if (!isOpen) return undefined
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    const container = containerRef.current
    document.body.style.overflow = 'hidden'
    const initialFocus = container.querySelector('[data-modal-autofocus]') ||
      container.querySelector('button')
    initialFocus?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onCloseRef.current()
      }
      if (event.key !== 'Tab') return
      const elements = [...container.querySelectorAll('button, input, [tabindex="0"]')]
        .filter((element) => !element.disabled && element.getClientRects().length > 0)
      const first = elements[0]
      const last = elements[elements.length - 1]
      if (!first) return
      if (event.shiftKey && (document.activeElement === first || !container.contains(document.activeElement))) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && (document.activeElement === last || !container.contains(document.activeElement))) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      const fallbackFocus = [...document.querySelectorAll('.navigation__sign-in, .header__menu-button')]
        .find((element) => element.getClientRects().length > 0)
      const returnFocus = previousFocus?.isConnected && previousFocus !== document.body &&
        previousFocus.getClientRects().length > 0 ? previousFocus : fallbackFocus
      returnFocus?.focus()
    }
  }, [isOpen, containerRef])
}

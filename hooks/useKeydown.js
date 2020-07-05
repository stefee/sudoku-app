import { useEffect } from 'react'

const useKeydown = (key, action) => {
  useEffect(() => {
    const onKeydown = event => {
      if (event.key === key) action()
    }

    window.addEventListener('keydown', onKeydown)

    return () => {
      window.removeEventListener('keydown', onKeydown)
    }
  }, [])
}

export default useKeydown

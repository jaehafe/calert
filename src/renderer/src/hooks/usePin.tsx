import { useState } from 'react'

export default function usePin() {
  const [isPinned, setIsPinned] = useState(false)

  const togglePin = () => {
    const newPinnedState = !isPinned
    setIsPinned(newPinnedState)
    window.electron.ipcRenderer.send('toggle-pin', newPinnedState)
  }

  return {
    togglePin,
    isPinned
  }
}

import dayjs from 'dayjs'
import { useCallback, useEffect, useRef, useState } from 'react'

export default function useCalendar() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentDate, setCurrentDate] = useState(dayjs())

  const daysInMonth = currentDate.daysInMonth()
  const firstDayOfMonth = currentDate.startOf('month').day()

  const prevMonth = useCallback(() => {
    setCurrentDate((prev) => prev.subtract(1, 'month'))
  }, [])

  const nextMonth = useCallback(() => {
    setCurrentDate((prev) => prev.add(1, 'month'))
  }, [])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        prevMonth()
      } else if (event.key === 'ArrowRight') {
        nextMonth()
      }
    },
    [prevMonth, nextMonth]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  const resizeWindow = useCallback(() => {
    if (containerRef.current) {
      const height = containerRef.current.clientHeight
      window.electron.ipcRenderer.send('resize-calendar', { width: 180, height })
    }
  }, [])

  useEffect(() => {
    resizeWindow()
  }, [resizeWindow])

  useEffect(() => {
    resizeWindow()
  }, [currentDate, resizeWindow])

  const moveToToday = () => {
    setCurrentDate(dayjs())
  }

  return {
    currentDate,
    setCurrentDate,
    daysInMonth,
    firstDayOfMonth,
    moveToToday,
    prevMonth,
    nextMonth,
    containerRef
  }
}

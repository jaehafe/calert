import { ReactNode, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'

export default function App() {
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

  const renderCalendar = () => {
    const days: ReactNode[] = []
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<Day key={`empty-${i}`} />)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        <Day key={i} isToday={i === dayjs().date() && currentDate.isSame(dayjs(), 'month')}>
          {i}
        </Day>
      )
    }
    return days
  }

  const moveToToday = () => {
    setCurrentDate(dayjs())
  }

  return (
    <CalendarContainer>
      <CalendarHeader>
        <MonthYear>{currentDate.format('MMM YYYY')}</MonthYear>
        <Button onClick={prevMonth}>&lt;</Button>
        <Button onClick={moveToToday}>*</Button>
        <Button onClick={nextMonth}>&gt;</Button>
      </CalendarHeader>
      <WeekDays>
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
          <WeekDay key={day}>{day}</WeekDay>
        ))}
      </WeekDays>
      <DaysGrid>{renderCalendar()}</DaysGrid>
    </CalendarContainer>
  )
}

const CalendarContainer = styled.div`
  width: 170px;
  height: 250px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  overflow: hidden;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  background-color: rgba(18, 18, 18, 0.95);
  color: rgba(255, 255, 255, 0.87);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  background-color: rgba(20, 30, 10, 0.95);
`

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  padding: 0 5px;
  color: rgba(255, 255, 255, 0.87);
  transition: color 0.3s ease;

  &:hover {
    color: rgba(255, 255, 255, 1);
  }
`

const MonthYear = styled.div`
  font-weight: bold;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.95);
`

const WeekDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background-color: rgba(40, 40, 40, 0.95);
`

const WeekDay = styled.div`
  text-align: center;
  padding: 2px 0;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.6);
`

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: 1fr;
  flex-grow: 1;
  background-color: rgba(25, 25, 25, 0.95);
`

const Day = styled.div<{ isToday?: boolean }>`
  margin: 2px;
  padding: 4px;

  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  color: ${({ isToday }) => (isToday ? 'white' : 'rgba(255, 255, 255, 0.87)')};
  border: 1px solid ${({ isToday }) => (isToday ? 'white' : 'none')};
  border-radius: 0.8rem;

  font-weight: ${({ isToday }) => (isToday ? 'bold' : 'normal')};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ isToday }) =>
      isToday ? 'rgba(0, 123, 255, 0.9)' : 'rgba(255, 255, 255, 0.1)'};
  }
`

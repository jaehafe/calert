import { ReactNode, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'
import { MotionDiv, whileHoverEffect } from './components/ui/MotionHtml'
import { Calendar, CalendarDays, ChevronLeft, ChevronRight, Cog, Pin, Plus } from 'lucide-react'
import theme from './styles/theme'

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
      {/* header */}
      <CalendarHeader>
        <MonthYear>{currentDate.format('MMM YYYY')}</MonthYear>
        <HeaderRight>
          <MotionDiv
            style={{ cursor: 'default' }}
            whileHover={whileHoverEffect}
            onClick={prevMonth}
          >
            <ChevronLeft width={16} height={16} />
          </MotionDiv>
          <MotionDiv
            style={{ cursor: 'default' }}
            whileHover={whileHoverEffect}
            onClick={moveToToday}
          >
            <Calendar width={13} height={13} />
          </MotionDiv>
          <MotionDiv
            style={{ cursor: 'default' }}
            whileHover={whileHoverEffect}
            onClick={nextMonth}
          >
            <ChevronRight width={16} height={16} />
          </MotionDiv>
        </HeaderRight>
      </CalendarHeader>

      {/* 요알 */}
      <WeekDays>
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
          <WeekDay key={day}>{day}</WeekDay>
        ))}
      </WeekDays>

      {/* 날짜 */}
      <DaysGrid>{renderCalendar()}</DaysGrid>

      <Footer>
        <MotionDiv>
          <Plus width={16} height={16} color={theme.colors.colorTextTertiary} />
        </MotionDiv>
        <FooterRight>
          <Pin width={16} height={16} color={theme.colors.colorTextTertiary} />
          <CalendarDays width={16} height={16} color={theme.colors.colorTextTertiary} />
          <Cog width={16} height={16} color={theme.colors.colorTextTertiary} />
        </FooterRight>
      </Footer>
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
  background-color: rgba(40, 40, 40, 0.95);
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

const HeaderRight = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
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
  background-color: rgba(40, 40, 40, 0.95);
`

const Day = styled.div<{ isToday?: boolean }>`
  /* margin: 2px;
  padding: 4px; */
  padding: 4px;

  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
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

const Footer = styled.div`
  padding: 0.4rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
`

const FooterRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`

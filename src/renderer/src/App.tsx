import { ReactNode } from 'react'
import styled from 'styled-components'
import theme from './styles/theme'

import dayjs from 'dayjs'

import useCalendar from './hooks/useCalendar'
import usePin from './hooks/usePin'

import { MotionDiv, whileHoverEffect } from './components/ui/MotionHtml'
import { Calendar, ChevronLeft, ChevronRight, Pin } from 'lucide-react'

export default function App() {
  const {
    containerRef,
    currentDate,
    daysInMonth,
    firstDayOfMonth,
    moveToToday,
    nextMonth,
    prevMonth
  } = useCalendar()
  const { isPinned, togglePin } = usePin()

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

  return (
    <CalendarContainer ref={containerRef}>
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

      <CalendarContentWrapper>
        <CalendarContent>
          {/* 요알 */}
          <WeekDays>
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
              <WeekDay key={day}>{day}</WeekDay>
            ))}
          </WeekDays>

          {/* 날짜 */}
          <DaysGrid>{renderCalendar()}</DaysGrid>
        </CalendarContent>
      </CalendarContentWrapper>

      <FooterWrapper>
        <Footer>
          {/* <MotionDiv>
            <Plus width={16} height={16} color={theme.colors.colorTextTertiary} />
          </MotionDiv> */}
          <FooterRight>
            <MotionDiv onClick={togglePin}>
              <Pin
                width={16}
                height={16}
                color={isPinned ? theme.colors.colorPrimary : theme.colors.colorTextTertiary}
              />
            </MotionDiv>
            {/* <CalendarDays width={16} height={16} color={theme.colors.colorTextTertiary} />
            <Cog width={16} height={16} color={theme.colors.colorTextTertiary} /> */}
          </FooterRight>
        </Footer>
      </FooterWrapper>
    </CalendarContainer>
  )
}

const BackgroundColor = '#1A1721'
const TextColor = `rgba(255, 255, 255, 0.87)`

const CalendarContainer = styled.div`
  max-width: 180px;
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  overflow: hidden;
  font-size: 12px;
  display: flex;
  flex-direction: column;

  background-color: ${BackgroundColor};
  color: ${TextColor};

  padding: 0.6rem;
`

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 5px;
  background-color: ${BackgroundColor};
`

const HeaderRight = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`

const CalendarContentWrapper = styled.div`
  height: 230px;
`
const CalendarContent = styled.div`
  width: 100%;

  overflow: hidden;
  border: 1px solid white;
  border-radius: 0.8rem;
`

const MonthYear = styled.div`
  font-weight: bold;
  font-size: 14px;
  color: ${TextColor};
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
  color: ${TextColor};
`

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: 1fr;
  background-color: rgba(40, 40, 40, 0.95);
`

const Day = styled.div<{ isToday?: boolean }>`
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

const FooterWrapper = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: end;
  padding: 0.4rem;
`
const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const FooterRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`

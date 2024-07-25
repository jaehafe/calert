import styled from 'styled-components'
import Button from './components/ui/Button'

export default function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <Container>
      <Button />
      <button onClick={ipcHandle}>
        <div className="span">ping</div>
      </button>
    </Container>
  )
}

const Container = styled.div`
  .span {
    color: ${({ theme }) => theme.colors.colorPrimary};
  }
`

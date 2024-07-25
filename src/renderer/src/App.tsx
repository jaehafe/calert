import Button from './components/ui/Button'

export default function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <div>
      <Button />
      <button onClick={ipcHandle}>ping</button>
    </div>
  )
}

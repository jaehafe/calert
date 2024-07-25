import { app, shell, BrowserWindow, ipcMain, Tray, Menu, nativeImage } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import TrayIcon from '../../resources/claude.png?asset'

let mainWindow: BrowserWindow | null = null
let tray: Tray | null = null
let calendarWindow: BrowserWindow | null = null

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

function showWindow() {
  if (mainWindow === null) {
    createWindow()
  }
  mainWindow?.show()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  const trayIconImage = nativeImage.createFromPath(TrayIcon)
  const resizedTrayIcon = trayIconImage.resize({ width: 16, height: 16 })
  tray = new Tray(resizedTrayIcon)

  // const contextMenu = Menu.buildFromTemplate([
  //   { label: '환경설정', click: () => showWindow() },
  //   { type: 'separator' },
  //   { label: 'Item1', type: 'radio' },
  //   { label: 'Item2', type: 'radio' },
  //   { label: 'Item3', type: 'radio', checked: true },
  //   { label: 'Item4', type: 'radio' },
  //   { type: 'separator' },
  //   { label: '종료', click: () => app.quit() }
  // ])
  // tray.setToolTip('This is my application.')
  // tray.setContextMenu(contextMenu)
  tray.on('click', (event, bounds) => {
    if (!calendarWindow) {
      createCalendarWindow()
    }
    const { x, y } = bounds
    const { height, width } = calendarWindow!.getBounds()
    calendarWindow!.setBounds({
      x: x - width / 2,
      y: y,
      height,
      width
    })
    calendarWindow!.show()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) showWindow()
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

function createCalendarWindow(): void {
  calendarWindow = new BrowserWindow({
    minWidth: 170,
    minHeight: 250,
    show: false,
    frame: false,
    resizable: false,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  if (process.env.NODE_ENV === 'development') {
    calendarWindow.loadURL('http://localhost:5173')
  } else {
    calendarWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  let isPinned = false

  calendarWindow.on('blur', () => {
    if (!isPinned) {
      calendarWindow?.hide()
    }
  })

  ipcMain.on('toggle-pin', (_, shouldPin) => {
    if (calendarWindow) {
      isPinned = shouldPin
      calendarWindow.setAlwaysOnTop(shouldPin)
    }
  })
}

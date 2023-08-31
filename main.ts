import { app, BrowserWindow, ipcMain, screen, ShareMenu, globalShortcut } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as fs from 'fs';
import * as log from 'electron-log';
import { convertFromMnemonic, sendConfig, buyConfig, swapConfig, ipfcHash } from './helpers';
let filePath = '';
if(process.platform === 'darwin') {
  filePath = path.join(app.getAppPath(),'power-build','power_darwin_amd64');
} else {
  filePath = path.join(app.getAppPath(),'power-build','power_linux_386');
}
let execFile = require('child_process').execFile;
console.log('filePath' + filePath);
const INTERVAL_PERIOD = 1; // 5
const SERVER_TIMEOUT = 5; // 30

const INTERVAL = 1000 * 60 * INTERVAL_PERIOD;
const MAX_INTERVAL = 1000 * 60 * SERVER_TIMEOUT;
const SAMPLE_COUNT = MAX_INTERVAL / INTERVAL;

let win: BrowserWindow = null;
const args = process.argv.slice(1),
  serve = args.some(val => val === '--serve');

function createWindow(): BrowserWindow {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: (serve) ? true : false,
      contextIsolation: false,
    },
  });

  if (serve) {
    win.webContents.openDevTools();
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');
  } else {
    //win.webContents.openDevTools();
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));    
  }


  var splash = new BrowserWindow({ 
    width: size.width,
    height: size.height,
    transparent: true, 
    frame: false, 
    alwaysOnTop: true 
  });
  
  splash.loadURL(url.format({
    pathname: path.join(__dirname, 'dist/splash/splash.html'),
    protocol: 'file:',
    slashes: true
  }));

  splash.center();
  
  win.webContents.on('did-finish-load', () => {
    let powerOutputs : Array<number> = [];
    setInterval(() => {
      execFile(filePath, function(err, data) {
        if(err){
           console.error('exec error', err);
           return;
        }    
        console.log('exec output:',data.toString());
        let outputValue = 0;         
        outputValue = data.toString();     
        if(outputValue){
          outputValue = parseInt(String(outputValue))
          powerOutputs.push(outputValue)  
        }        
        console.log('powerOutputs:',powerOutputs);
        if(powerOutputs.length >= SAMPLE_COUNT ){          
          const sum = powerOutputs.reduce((a, b) => a + b, 0);          
          const avg = (sum/SAMPLE_COUNT) || 0; // per 5 minute          
          const perMin = avg/INTERVAL_PERIOD;          
          const power = perMin*SERVER_TIMEOUT; // for 30 mins          
          win.webContents.send('power-calculation',power);
          powerOutputs = [];
        }
      });
    }, INTERVAL);// every 5 min
  })

  win.once('ready-to-show', () => {
    splash.destroy();
    win.show();
  });

  win.on('close', () => {
    if(win && !win.isDestroyed()) {
      win.webContents.send('logout-app');
    }    
  });

  win.on('closed', () => {
    win = null;
  });
  win.setMenu(null);
  return win;
}

try {

  // temp code here

  // <============ APP EVENT LISTENERS ============>
  const gotTheLock = app.requestSingleInstanceLock()
  if (!gotTheLock) {
    app.quit()
  } else {
    app.on('second-instance', (event, commandLine, workingDirectory) => {
      if (win) {
        if (win.isMinimized()) win.restore()
        win.focus()
      }
    });

    app.on('ready', () => setTimeout(createWindow, 400));
  }



  
  // app.whenReady()
  //   .then(() => {
  //     globalShortcut.register('Alt+CommandOrControl+A', () => {
  //       console.log('Alt+CommandOrControl+A Pressed!')
  //     })
  //   })
    

  app.on('before-quit', (event) => {
    event.preventDefault();    
    if (win && !win.isDestroyed()) {
      win.webContents.send('logout-app');
    }
    setTimeout(() => {
      app.exit();
    }, 3000);
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (win === null) {
      createWindow();
    }
  });

  ipcMain.handle('get-crypto-keys', async (event, code) => {
    return convertFromMnemonic(code);
  })

  ipcMain.handle('calculate-transaction-fee', async (event, request) => {
    return sendConfig(request);
  })

  ipcMain.handle('generate-card-encryption-key', async (event, request) => {
    return buyConfig(request);
  })

  ipcMain.handle('generate-ipfc-hash', async (event, request) => {
    return ipfcHash(request);
  })

  ipcMain.handle('generate-swap-hash-key', async (event, request) => {
    return swapConfig(request);
  })

  ipcMain.on('open-share-menu', (event, arrayBuffer) => {
    const filePath = path.join(app.getPath('downloads'), 'share.png');
    fs.appendFileSync(filePath, Buffer.from(arrayBuffer));
    const shareMenu = new ShareMenu({ filePaths: [filePath] })
    shareMenu.popup({ window: win });
  })
} catch (e) {
  console.log("Error: ",e);
}



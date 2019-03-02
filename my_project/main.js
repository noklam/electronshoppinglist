const electron = require('electron');
const url = require('url');
const path = require('path');

const { app, BrowserWindow, Menu } = electron;

let mainWindow;

// Listen for app to be ready
app.on('ready', function () {
    // CReate new window
    mainWindow = new BrowserWindow({});
    // Load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'main_window.html'), // Current Directory
        protocol: 'file:',
        slashes: true
    }
    ));    //passing this path to loadURL  file://dirname/mainWindow.html

    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert menu
    Menu.setApplicationMenu(mainMenu) // set menu from self-defined menuTemplate
});

// Create menu template
const mainMenuTemplate = [ // In Electron, menu is an array of object
    {
        label: 'File',
        submenu: [
            {
                label: 'Add Some Item'
            },
            {
                label: 'Clear Items'
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit(); // Shutdown the app
                }
            }

        ]
    }
];
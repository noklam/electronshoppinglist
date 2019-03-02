const electron = require('electron');
const url = require('url');
const path = require('path');

const { app, BrowserWindow, Menu } = electron;

let mainWindow;
let addWindow;
// Listen for app to be ready
app.on('ready', function () {
    // Create new window
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

// Handle create add window
function createAddWindow() {
    // Create new window
    addWindow = new BrowserWindow({
        width: 200,
        height: 300,
        title:'Add Shopping List Item for myself'
    });
    // Load html into window
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'add_window.html'), // Current Directory
        protocol: 'file:',
        slashes: true
    }
    ));    //passing this path to loadURL  file://dirname/mainWindow.html

}
// Create menu template
const mainMenuTemplate = [ // In Electron, menu is an array of object
    {
        label: 'File',
        submenu: [
            {
                label: 'Add Some Item',
                click(){
                    createAddWindow();
                }

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
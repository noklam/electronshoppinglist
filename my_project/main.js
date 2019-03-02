const electron = require('electron');
const url = require('url');
const path = require('path');

const { app, BrowserWindow, Menu, ipcMain } = electron;

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

    // Quit app when closed
    mainWindow.on('closed', function () {
        app.quit();
    })

    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert menu
    Menu.setApplicationMenu(mainMenu) // set menu from self-defined menuTemplate
});

// Handle create add window
function createAddWindow() {
    // Create new window
    addWindow = new BrowserWindow({
        width: 350,
        height: 250,
        title: 'Add Shopping List Item for myself'
    });
    // Load html into window
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'add_window.html'), // Current Directory
        protocol: 'file:',
        slashes: true
    }
    ));
    // Garbage Collection handle
    addWindow.on('close', function () {
        addWindow = null
    });
}

//  item:add
ipcMain.on('item:add', function(e, item){
    console.log(item); // debugging if item send from addWindow to Main
    mainWindow.webContents.send('item:add', item);
    addWindow.close();
}); // When this happen, we call a function


// Create menu template
const mainMenuTemplate = [ // In Electron, menu is an array of object
    {
        label: 'File',
        submenu: [
            {
                label: 'Add Some Item',
                click() {
                    createAddWindow();
                }

            },
            {
                label: 'Clear Items',
                click(){
                    mainWindow.webContents.send('item:clear');
                }
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

// If mac, add empty object to menu
if (process.platform == 'darwin') {
    mainMenuTemplate.unshift({}); // Push new item to beginning
}

// Add developer tools item if not in production
if (process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({ // Append items
        label: 'Developer Tools',
        submenu: [
            {
                label: 'Toggle Dev Tools',
                accelerator: process.platform == 'darwin' ? 'Command+T' : 'Ctrl+T',
                click(item, focusedWindow) { // Make sure the dev show up to the correct window (the focus one)
                    focusedWindow.toggleDevTools();
                }
            },
            { role: 'reload' }
        ]
    })

}
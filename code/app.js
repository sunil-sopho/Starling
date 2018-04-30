const path = require('path');
const {app,BrowserWindow} = require('electron');
const url = require('url');

// function for creating a window
function createWindow(){
	win = new BrowserWindow({width:800,height:624})

		win.loadURL(url.format({
			pathname: path.join(__dirname,'index.html'),
			protocol: 'file:',
			slashes: true
		}))
}

app.on('ready',createWindow)

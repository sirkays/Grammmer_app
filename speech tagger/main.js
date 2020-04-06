const electron = require('electron');
const url = require('url');
const path = require('path');
const {app, BrowserWindow, Menu, ipcMain} = electron;
let mainWindow;
let addWindow;

//listening for app to be ready
app.on('ready', function(){
mainWindow = new BrowserWindow({
    webPreferences: {
        nodeIntegration: true
    }
});





// In the main process.
//global.sharedObject = {
  //someProperty: 'default value'
//}

mainWindow.loadURL(url.format(
    {
        pathname: path.join(__dirname,'appWindow.html'),
        protocol: 'file:',
        slashes: true
    }
));

mainWindow.on('closed',function () {
    app.quit();
});
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
    
});


///adding item window
function createAddMenu(){
    //create new window
    addWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 300,
        height: 200,
        title: 'shopping list'
        
    });
    //load html into window
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname,'subWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
    addWindow.on('close',function(){
        addWindow=null;
    });
}
//catch the item add
ipcMain.on('item:add',function(e,item){
   
    let {PythonShell} = require('python-shell');
   

    //var value = document.getElementById('item').value ;
    //document.getElementById('item').value ='';
    
    var options = {
        args: [item]
    }

    PythonShell.run('my_script.py', options, function (err, results) {
  if (err) throw err;
  // results is an array consisting of messages collected during execution
  //console.log('results: %j', results);
 // document.getElementById('display').value =message;
     mainWindow.webContents.send('item:add',results);
});

   // addWindow.close();
});
////add menu items
const mainMenuTemplate= [
    {
        label: 'File',
        submenu: [{
            label: 'Add Item',click(){
                createAddMenu();
            }
        },
        {
            label: 'Clear Item',
            accelerator: process.platform =='darwin'? 'Command+C':'Ctrl+c',
            click(){
                mainWindow.webContents.send('item:clear');
            }
           
        },
        {
            label: 'Quit',
            accelerator: process.platform =='darwin'? 'Command+Q':'Ctrl+q',
            click(){
                app.quit();
            }
        }
        ]
    }
    
]


if(process.platform=='darwin'){
    mainMenuTemplate.unshift({});
}
if(process.env.NODE_ENV != 'production'){

    mainMenuTemplate.push({
        label: 'developer tools',
        submenu:[{
            label:'toggle dev',
            accelerator: process.platform =='darwin'? 'Command+I':'Ctrl+I',
            click(item,focusedWindow){
                focusedWindow.toggleDevTools();
            }
        },{
            role: 'reload'
        }]
    })
}
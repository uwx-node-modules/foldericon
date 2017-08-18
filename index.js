'use strict';

const fs = require('fs');
const path = require('path');
const attr = require('winattr');

const iconPaths = require('./iconDefs.json');

const args = process.argv[2];
console.log(args, process.argv);

const iconPath = path.resolve(iconPaths[process.argv[2]]);

const desktopIni = `[.ShellClassInfo]
IconResource=${iconPath},0
[ViewState]
Mode=
Vid=
FolderType=Generic
Logo=${iconPath}
`;

console.log(iconPath);
console.log(desktopIni);

fs.writeFileSync(process.env.TEMP + '/Desktop.ini', desktopIni.replace(/\n/g, '\r\n'));
attr.setSync(process.env.TEMP + '/Desktop.ini', {hidden:true, system:true});
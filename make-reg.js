const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

const iconPaths = require('./iconDefs.json');
const out = [];

out.push(`Windows Registry Editor Version 5.00
`);

out.push(String.raw`
[HKEY_LOCAL_MACHINE\SOFTWARE\Classes\Folder\shell\HFolderColor]
"MUIVerb"="Folder Color"
"SubCommands"="${Object.keys(iconPaths).map(e => 'fc' + e).join(';')}"
"Icon"="C:\\Windows\\System32\\imageres.dll,3"
`)

const dirNameEscaped = path.resolve(__dirname).replace(/\\/g, String.raw`\\`); // double the backslashes

Object.keys(iconPaths).forEach(k => {
  const v = iconPaths[k];
  const vEscaped = path.resolve(v).replace(/\\/g, String.raw`\\`); // double the backslashes

  out.push(String.raw`
[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\CommandStore\shell\fc${k}]
@="${k}"
"icon"="${vEscaped}"

[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\CommandStore\shell\fc${k}\command]
@="cmd /c \"${dirNameEscaped}\\colorit.bat\" ${k} %V"
`)
});

console.log(chalk.bgRed.white('we can make mistakes sometimes, make sure to check the .reg output before using it!!!'));

fs.writeFileSync('./FolderColor.reg', out.join(''));
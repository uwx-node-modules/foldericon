'use strict';

const fs = require('fs');
const path = require('path');
const attr = require('winattr');

const iconPaths = {
  "Pink": "icons_col/Win7GlassFolders-Pink.ico",
  "Purple": "icons_col/Win7GlassFolders-Purple.ico",
  "Red": "icons_col/Win7GlassFolders-Red.ico",
  "Special-BlackandWhite": "icons_col/Win7GlassFolders-Special-BlackandWhite.ico",
  "Special-DeepSea": "icons_col/Win7GlassFolders-Special-DeepSea.ico",
  "Special-Lime": "icons_col/Win7GlassFolders-Special-Lime.ico",
  "Special-OrangeJuice": "icons_col/Win7GlassFolders-Special-OrangeJuice.ico",
  "Special-WhiteandBlack": "icons_col/Win7GlassFolders-Special-WhiteandBlack.ico",
  "Turquoise": "icons_col/Win7GlassFolders-Turquoise.ico",
  "White": "icons_col/Win7GlassFolders-White.ico",
  "Yellow": "icons_col/Win7GlassFolders-Yellow.ico",
  "Black": "icons_col/Win7GlassFolders-Black.ico",
  "Blue": "icons_col/Win7GlassFolders-Blue.ico",
  "Emerald": "icons_col/Win7GlassFolders-Emerald.ico",
  "Green": "icons_col/Win7GlassFolders-Green.ico",
  "MossGreen": "icons_col/Win7GlassFolders-MossGreen.ico",
  "Orange": "icons_col/Win7GlassFolders-Orange.ico",
}

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
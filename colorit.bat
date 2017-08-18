@echo all args: %*
@echo arg2: %2
@node index %*

@echo off
echo setting attrib of "%temp%\desktop.ini"
attrib +h +s "%temp%\desktop.ini"

(
    echo set shell = CreateObject^("Shell.Application"^)
    echo set folder = shell.NameSpace^("%2"^)
    echo folder.MoveHere "%temp%\desktop.ini", 4+16+1024
)>"%temp%\updateIcon.vbs"
@echo on

@echo calling cscript
@cscript //nologo //b "%temp%\updateIcon.vbs"

@echo cleaning up
@del "%temp%\updateIcon.vbs"
@del "%temp%\desktop.ini"

@pause
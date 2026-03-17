@echo off
setlocal

set "EDGE_PATH=C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
set "TARGET_URL=file:///C:/Users/Microsoft/Desktop/CODEX/english-listening-trainer/index.html"

if not exist "%EDGE_PATH%" (
  echo Edge browser not found: "%EDGE_PATH%"
  pause
  exit /b 1
)

start "" "%EDGE_PATH%" --new-window "%TARGET_URL%"
exit /b 0

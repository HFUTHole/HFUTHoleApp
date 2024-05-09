@echo off
setlocal

:: Change to the specified directory
cd /D "%LOCALAPPDATA%/Android/Sdk"

:: Rename emulator to emulator_original
ren "emulator" "emulator_original"

:: Download the zip file and display a message
powershell -Command "& { $source = 'https://redirector.gvt1.com/edgedl/android/repository/emulator-windows_x64-11237101.zip'; $destination = 'emulator.zip'; Write-Host 'Downloading emulator update...'; Start-BitsTransfer -Source $source -Destination $destination; Write-Host 'Download complete.' }"

:: Extract the zip file
powershell -Command "Expand-Archive -Path 'emulator.zip' -DestinationPath '.'"

:: Delete the zip file
del "emulator.zip"

endlocal
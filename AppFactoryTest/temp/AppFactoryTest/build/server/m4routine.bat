@echo off
FOR %%i IN (%1/*.lua) DO (
m4.exe --undefine=len --undefine=format -D%3 %1/%%i >> %2/%%i
)

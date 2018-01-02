@@echo off
echo substitution processing %1
IF EXIST build-drive.txt (
echo deleting build-drive.txt
del "build-drive.txt")
IF "%1"=="substitute" (
FOR %%A IN (a b c d e f g h i j k l m n o p q r s t u v w x y z) DO (
IF NOT EXIST %%A:\ (
echo substituting %%A drive
SUBST %%A: %2
IF EXIST %%A:\ (
	echo drive substituted %%A
	echo|set /p="%%A">build-drive.txt;)
goto end
))) ELSE (
echo unsubstituting %2 drive
SUBST %2: /d
echo drive unsubstituted %2
)
:end

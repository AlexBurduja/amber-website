# urca.ps1 - face build-ul si urca pe ambermob.ro doar ce s-a schimbat
# Rulare (din Git Bash):
#   /c/Windows/System32/WindowsPowerShell/v1.0/powershell.exe -ExecutionPolicy Bypass -File ./urca.ps1
#
# Conectarea se face prin site-ul salvat in WinSCP cu numele "ambermob"
# (cont FTP deploy@ambermob.ro, care porneste direct in public_html).
# Se urca DOAR continutul folderului out\. Comenzile WinSCP sunt scrise intr-un
# fisier separat, ca ghilimelele sa nu mai poata fi stricate de PowerShell.

$ErrorActionPreference = "Stop"

$proiect    = "E:\dev\amber-website"
$winscp     = "C:\Program Files (x86)\WinSCP\WinSCP.com"
$siteSalvat = "ambermob"
$log        = Join-Path $env:TEMP "urcare-ambermob.log"
$scriptFtp  = Join-Path $env:TEMP "urcare-ambermob.txt"

if (-not (Test-Path $winscp)) { Write-Host "Nu gasesc WinSCP la: $winscp" -ForegroundColor Red; exit 1 }

Set-Location $proiect

Write-Host "1/2 Build..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) { Write-Host "Build-ul a esuat. Nu urc nimic." -ForegroundColor Red; exit 1 }

$sursa = Join-Path $proiect "out"
if (-not (Test-Path (Join-Path $sursa "index.html"))) { Write-Host "Lipseste out\index.html. Nu urc nimic." -ForegroundColor Red; exit 1 }
if (-not (Test-Path (Join-Path $sursa "_next"))) { Write-Host "Lipseste out\_next. Nu urc nimic." -ForegroundColor Red; exit 1 }

# Comenzile WinSCP, intr-un fisier. Daca orice comanda esueaza (inclusiv lcd), totul se opreste.
$comenzi = @"
option batch abort
option confirm off
open $siteSalvat
lcd "$sursa"
cd /
synchronize remote -criteria=size -filemask="| .well-known/; cgi-bin/" "$sursa" "/"
put -nopermissions -filemask="*.html; *.xml; *.txt; *.webmanifest; .htaccess" "$sursa\*" "/"
exit
"@
[System.IO.File]::WriteAllText($scriptFtp, $comenzi, (New-Object System.Text.UTF8Encoding($false)))

Write-Host "2/2 Urcare din $sursa (doar fisierele schimbate)..." -ForegroundColor Cyan
& $winscp /log="$log" /script="$scriptFtp"
$cod = $LASTEXITCODE
Remove-Item $scriptFtp -ErrorAction SilentlyContinue

if ($cod -ne 0) {
  Write-Host "Urcarea a esuat. Detalii in: $log" -ForegroundColor Red
  exit 1
}

Write-Host "Gata. Verifica https://ambermob.ro (eventual Ctrl+F5)." -ForegroundColor Green

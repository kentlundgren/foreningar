# =========================================================================
# SKRIPT FÖR ATT KOPIERA DATAFILER TILL /data/-MAPPEN
# =========================================================================
# Kör detta skript i PowerShell för att kopiera de stora datafilerna
# till den nya /data/-mappen med nya filnamn.
#
# Användning: Högerklicka på filen > "Kör med PowerShell"
# Eller: Öppna PowerShell och kör: .\kopiera_datafiler.ps1
# =========================================================================

# Sätt sökväg till denna mapp
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Kopierar datafiler till /data/-mappen" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Kontrollera att data-mappen finns
if (-not (Test-Path "data")) {
    Write-Host "Skapar data-mappen..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Path "data" | Out-Null
}

# Kopiera medlemsdata_komplett.md
Write-Host "1. Kopierar medlemsdata_komplett.md -> data/md_komplett_251226.md" -ForegroundColor Green
Copy-Item "medlemsdata_komplett.md" "data/md_komplett_251226.md" -Force

# Kopiera medlemsdata_rå.csv  
Write-Host "2. Kopierar medlemsdata_ra.csv -> data/md_raw_251226.csv" -ForegroundColor Green
# Notera: Filen heter "medlemsdata_rå.csv" med å
Copy-Item "medlemsdata_rå.csv" "data/md_raw_251226.csv" -Force

# Kopiera medlemsdata.json om den finns
if (Test-Path "medlemsdata.json") {
    Write-Host "3. Kopierar medlemsdata.json -> data/md_251226.json" -ForegroundColor Green
    Copy-Item "medlemsdata.json" "data/md_251226.json" -Force
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  KLART! Filer kopierade till /data/" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Nya filer:" -ForegroundColor White
Get-ChildItem "data" | ForEach-Object { Write-Host "  - data/$($_.Name)" -ForegroundColor Gray }
Write-Host ""
Write-Host "OBS: De gamla filerna finns kvar." -ForegroundColor Yellow
Write-Host "Du kan ta bort dem manuellt senare" -ForegroundColor Yellow
Write-Host "efter att du verifierat att allt fungerar." -ForegroundColor Yellow
Write-Host ""

# Vänta på att användaren trycker Enter
Read-Host "Tryck Enter för att stänga"


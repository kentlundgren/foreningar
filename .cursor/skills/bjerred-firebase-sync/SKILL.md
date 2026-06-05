---
name: bjerred-firebase-sync
description: Check and synchronize BASE_DATA in Bjerreds Saltsjobad inpasseringar files against Firebase Realtime Database. Use when Kent asks to check if BASE_DATA is in sync with Firebase, when new monthly data needs to be added, or as a monthly maintenance task for the Bjerreds project.
---

# Bjerreds Saltsjobad – BASE_DATA/Firebase Sync Check

Monthly procedure: compare BASE_DATA in local HTML files against live Firebase data and identify any gaps.

## Firebase REST endpoint

```
GET https://skylt-e0c45-default-rtdb.europe-west1.firebasedatabase.app/bjerred-inpasseringar/data.json
```

No authentication required (read = true in Firebase rules).

## Files that contain BASE_DATA (must always be identical)

- `BjerredsSaltsjobad/inpasseringar/data.html`
- `BjerredsSaltsjobad/inpasseringar/index.html`

**IMPORTANT**: Always update both files when changing BASE_DATA.

## Step-by-step sync check

### Step 1 – Fetch Firebase data

```powershell
$url = "https://skylt-e0c45-default-rtdb.europe-west1.firebasedatabase.app/bjerred-inpasseringar/data.json"
$fb = Invoke-RestMethod -Uri $url -TimeoutSec 20
```

### Step 2 – Run comparison script

Use the full comparison script below. It handles:
- En-dash (U+2013) in category keys (e.g. "Medlemmar - armband")
- Nested Firebase paths from slash-separated category names (e.g. "Restaurangen/badbiljetter")
- "null" strings in Firebase treated as null
- Reports which cells differ and what the values are

```powershell
$url  = "https://skylt-e0c45-default-rtdb.europe-west1.firebasedatabase.app/bjerred-inpasseringar/data.json"
$fb   = Invoke-RestMethod -Uri $url -TimeoutSec 20
$dash = [char]0x2013
$a    = [char]0x00E5   # a with ring above

# BASE_DATA – keep in sync with data.html and index.html
$base = @{
  "2024" = @{
    "Restaurangen"                     = @(754,696,772,656,841,654,696,678,725,607,795,620)
    "SMS-biljetter"                    = @(557,458,484,331,265,184,143,197,240,484,593,827)
    "Medlemmar ${dash} armband"        = @(2949,2788,3096,2251,3388,3130,3581,3362,4210,3146,3299,3255)
  }
  "2025" = @{
    "Restaurangen/badbiljetter"        = @(737,764,0,0,0,0,344,891,991,667,794,621)
    "SMS/Swish-biljett"                = @(801,619,0,0,0,0,4,140,285,726,1052,1373)
    "Medlemmar ${dash} armband"        = @(3231,2555,0,0,0,0,1524,2134,2339,1552,1400,1000)
    "Medlemmar ${dash} Wonder"         = @(0,0,0,0,0,0,120,1359,1729,1993,2443,2513)
  }
  "2026" = @{
    "Restaurangen/badbiljetter"        = @(643,665,600,359,417,$null,$null,$null,$null,$null,$null,$null)
    "SMS/Swish-biljetter"              = @(1114,751,1006,913,777,$null,$null,$null,$null,$null,$null,$null)
    "Eng${a}ngsbadare ${dash} Wondr"   = @(17,13,38,31,173,$null,$null,$null,$null,$null,$null,$null)
    "Medlemmar ${dash} armband"        = @(492,119,95,90,55,$null,$null,$null,$null,$null,$null,$null)
    "Medlemmar ${dash} Wonder"         = @(2627,2445,3663,3293,3417,$null,$null,$null,$null,$null,$null,$null)
  }
}

$mon = @("Jan","Feb","Mar","Apr","Maj","Jun","Jul","Aug","Sep","Okt","Nov","Dec")
$diff = 0

function Get-FbNode($node, $key) {
  $parts = $key -split "/"
  foreach ($p in $parts) {
    if ($node -is [pscustomobject] -and $node.PSObject.Properties[$p]) {
      $node = $node.PSObject.Properties[$p].Value
    } else { return $null }
  }
  return $node
}

foreach ($yr in @("2024","2025","2026")) {
  $fbYr = $fb.PSObject.Properties[$yr].Value
  foreach ($key in $base[$yr].Keys) {
    $bArr = $base[$yr][$key]
    $fArr = @(Get-FbNode $fbYr $key)
    for ($m = 0; $m -lt 12; $m++) {
      $bv = $bArr[$m]; $fv = $fArr[$m]
      if ($fv -eq "null") { $fv = $null }
      if ("$bv" -ne "$fv") {
        Write-Host "DIFF $yr / $key / $($mon[$m]): BASE=$bv  FB=$fv" -ForegroundColor Yellow
        $diff++
      }
    }
  }
}
if ($diff -eq 0) { Write-Host "All in sync!" -ForegroundColor Green }
else             { Write-Host "$diff difference(s) found" -ForegroundColor Red }
```

### Step 3 – Update BASE_DATA if Firebase has newer values

For each DIFF line where Firebase has a value and BASE_DATA has null:
1. Update both `data.html` and `index.html` – the BASE_DATA arrays at month index 0=Jan … 11=Dec
2. Update the BASE_DATA in this skill file (the $base hashtable above)
3. Reload the page to verify the green "Live from Firebase" indicator still shows

### Step 4 – Update CLAUDE.md

Add a changelog entry: `| YYYY-MM-DD | BASE_DATA synkad med Firebase – maj-data tillagd |`

## Monthly reminder

Ask Kent at the start of each new month: "Vill du att jag kontrollerar om BASE_DATA är i synk med Firebase?"

## Notes

- Firebase key "Medlemmar - Wonder" uses en-dash (U+2013), displayed as "Wondr" via VISNINGSNAMN map in data.html
- Firebase stores slash categories as nested nodes: "Restaurangen/badbiljetter" -> Restaurangen > badbiljetter
- "Engangsbadare - Wondr" in Firebase only has values for months with data (no trailing "null" entries)
- Changing a Firebase key name requires migrating the data in Firebase Console – do not rename keys in BASE_DATA alone
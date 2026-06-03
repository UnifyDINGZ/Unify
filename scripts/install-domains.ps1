$currentPrincipal = New-Object Security.Principal.WindowsPrincipal([Security.Principal.WindowsIdentity]::GetCurrent())
if (-not $currentPrincipal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Write-Host "Running as administrator..." -ForegroundColor Yellow
    # Relaunch the script with elevated privileges
    Start-Process powershell.exe -ArgumentList "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs
    Exit
}

# 2. Define the hosts file path and the entries to add
$hostsPath = "$env:windir\System32\drivers\etc\hosts"
$hostsEntries = @"
127.0.0.1 storage.unify.com
127.0.0.1 s3-console.unify.com
127.0.0.1 api.unify.com
127.0.0.1 unify.com
"@

# 3. Append the entries to the hosts file
Add-Content -Path $hostsPath -Value $hostsEntries

Write-Host "Installed domains successfully" -ForegroundColor Green

function New-Credential {
    # Generate 16 random bytes and convert to a clean hex string (similar to sha1sum output)
    $bytes = New-Object Byte[] 16
    (New-Object System.Security.Cryptography.RNGCryptoServiceProvider).GetBytes($bytes)
    return [System.BitConverter]::ToString($bytes).Replace("-", "").ToLower()
}

$Here = Split-Path -Parent $MyInvocation.MyCommand.Path
# If running as an unsaved script snippet, fallback to current directory
if (-not $Here) { $Here = Get-Location } 

$Root = (Get-Item (Join-Path $Here "..")).FullName
$Secrets = Join-Path $Root "secrets"

$PgUserFile = Join-Path $Secrets "postgres-user"
$PgPassFile = Join-Path $Secrets "postgres-pass"
$MinioFile  = Join-Path $Secrets "minio.env"

# Ensure secrets directory exists
if (-not (Test-Path -Path $Secrets -PathType Container)) {
    New-Item -ItemType Directory -Path $Secrets | Out-Null
}

# Generate Postgres password if missing
if (-not (Test-Path -Path $PgPassFile -PathType Leaf)) {
    Write-Host "Generating Postgres password..."
    New-Credential | Out-File -FilePath $PgPassFile -NoNewline -Encoding utf8
}

# Generate Postgres user if missing
if (-not (Test-Path -Path $PgUserFile -PathType Leaf)) {
    Write-Host "Generating Postgres user..."
    New-Credential | Out-File -FilePath $PgUserFile -NoNewline -Encoding utf8
}

# Generate MinIO credentials if missing
if (-not (Test-Path -Path $MinioFile -PathType Leaf)) {
    Write-Host "Generating MinIO credentials..."
    $MinioUser = New-Credential
    $MinioPass = New-Credential
    
    $MinioContent = @"
MINIO_ROOT_USER=$MinioUser
MINIO_ROOT_PASSWORD=$MinioPass
"@
    $MinioContent | Out-File -FilePath $MinioFile -Encoding utf8
}

Write-Host "Credentials have been generated successfully"
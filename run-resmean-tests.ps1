param (
	[Parameter(Mandatory=$true)]
	[string]$dbDumpDirectory,

	[Parameter(Mandatory=$true)]
	[string]$dbUser
)

# https://stackoverflow.com/a/59492488/3936440
$loadDbDumpScriptParameters = @{
	"server" = "localhost"
	"database" = "ojs_testing"
	"user" = $dbUser
	"dropExistingDatabase" = $true
}

& "$PSScriptRoot\$dbDumpDirectory\load.ps1" @loadDbDumpScriptParameters

$npxPath = [System.IO.Path]::GetDirectoryName((Get-Command npx.cmd).Path)
if (!($npxPath)) {
  Write-Host "npx not found" -ForegroundColor Red
  Exit 1
}

Push-Location
try {
	Write-Host "Running tests ..." -ForegroundColor White
	Set-Location $npxPath

	.\npx cypress run --project $PSScriptRoot --headed --config integrationFolder=cypress/tests/resmean
}
finally {
  Pop-Location
}

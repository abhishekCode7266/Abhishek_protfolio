<#
.SYNOPSIS
    Abhishek Singh Yadav Portfolio — One-Click Deploy Script
.DESCRIPTION
    Runs validation, TypeScript linting, production build, commits changes,
    and pushes to GitHub main to trigger GitHub Actions automatic Pages deployment.
#>

param(
    [Parameter(Position=0, Mandatory=$false)]
    [string]$Message = "",
    [Parameter(Mandatory=$false)]
    [switch]$Force = $false
)

$ErrorActionPreference = "Stop"

Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host "   Abhishek Singh Yadav | Portfolio Deploy System    " -ForegroundColor Cyan
Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host ""

# 1. Validate Content and Assets
Write-Host "[1/4] Validating Portfolio Content and Assets..." -ForegroundColor Yellow
node scripts/validate-content.mjs
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Validation failed! Aborting deploy." -ForegroundColor Red
    exit 1
}
Write-Host "SUCCESS: Content validation passed!" -ForegroundColor Green

# 2. TypeScript Lint & Typecheck
Write-Host ""
Write-Host "[2/4] Running TypeScript Lint & Typecheck..." -ForegroundColor Yellow
npm run lint
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: TypeScript lint failed! Aborting deploy." -ForegroundColor Red
    exit 1
}
Write-Host "SUCCESS: TypeScript checks passed cleanly!" -ForegroundColor Green

# 3. Production Build
Write-Host ""
Write-Host "[3/4] Building Production Distribution..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Build failed! Aborting deploy." -ForegroundColor Red
    exit 1
}
Write-Host "SUCCESS: Build succeeded!" -ForegroundColor Green

# 4. Commit and Push
Write-Host ""
Write-Host "[4/4] Checking Git Status and Pushing to GitHub..." -ForegroundColor Yellow

$status = git status --porcelain
if ($status) {
    if (-not $Message) {
        $timestamp = (Get-Date).ToString("yyyy-MM-dd HH:mm")
        $Message = "feat: update portfolio configuration and dependencies ($timestamp)"
    }
    git add -A
    git commit -m "$Message"
    Write-Host "SUCCESS: Committed changes: '$Message'" -ForegroundColor Green
} else {
    Write-Host "INFO: No uncommitted local changes found." -ForegroundColor Gray
}

# Read GitHub token from Windows Credential Manager
$code = @'
using System;
using System.Runtime.InteropServices;
using System.Text;

public class WinCredReader {
    [DllImport("Advapi32.dll", SetLastError = true, CharSet = CharSet.Unicode)]
    public static extern bool CredRead(string target, int type, int reservedFlag, out IntPtr credentialPtr);
    [DllImport("Advapi32.dll", SetLastError = true)]
    public static extern void CredFree(IntPtr credentialPtr);

    [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Unicode)]
    public struct CREDENTIAL {
        public int Flags;
        public int Type;
        public string TargetName;
        public string Comment;
        public long LastWritten;
        public int CredentialBlobSize;
        public IntPtr CredentialBlob;
        public int Persist;
        public int AttributeCount;
        public IntPtr Attributes;
        public string TargetAlias;
        public string UserName;
    }

    public static string Read(string target) {
        IntPtr ptr;
        if (CredRead(target, 1, 0, out ptr)) {
            CREDENTIAL cred = (CREDENTIAL)Marshal.PtrToStructure(ptr, typeof(CREDENTIAL));
            byte[] blob = new byte[cred.CredentialBlobSize];
            Marshal.Copy(cred.CredentialBlob, blob, 0, cred.CredentialBlobSize);
            CredFree(ptr);
            return Encoding.UTF8.GetString(blob);
        }
        return null;
    }
}
'@

Add-Type -TypeDefinition $code -ErrorAction SilentlyContinue

$token = [WinCredReader]::Read("LegacyGeneric:target=GitHub - https://api.github.com/abhishekCode7266")
if (-not $token) {
    $token = [WinCredReader]::Read("git:https://github.com")
}

$env:GIT_TERMINAL_PROMPT = "0"
$env:GCM_INTERACTIVE = "never"

$repoUrl = "https://github.com/abhishekCode7266/Abhishek_protfolio.git"
if ($token) {
    $pushUrl = "https://$($token)@github.com/abhishekCode7266/Abhishek_protfolio.git"
    if ($Force) {
        git -c credential.helper= push $pushUrl main --force
    } else {
        git -c credential.helper= push $pushUrl main
    }
} else {
    if ($Force) {
        git push origin main --force
    } else {
        git push origin main
    }
}

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "=====================================================" -ForegroundColor Green
    Write-Host "SUCCESS: Push complete! GitHub Pages deploy triggered!" -ForegroundColor Green
    Write-Host "=====================================================" -ForegroundColor Green
    Write-Host "Repository:     https://github.com/abhishekCode7266/Abhishek_protfolio" -ForegroundColor Cyan
    Write-Host "GitHub Actions: https://github.com/abhishekCode7266/Abhishek_protfolio/actions" -ForegroundColor Cyan
    Write-Host "Live Website:   https://abhishekcode7266.github.io/Abhishek_protfolio/" -ForegroundColor Cyan
} else {
    Write-Host "ERROR: Push failed. Please check network connection and credentials." -ForegroundColor Red
    exit 1
}

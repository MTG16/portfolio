Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "🚀 Starting Portfolio Server with Nodemailer" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📧 Email: mughilthirukkumar16@gmail.com" -ForegroundColor Yellow
Write-Host "🌐 Server: http://localhost:3000" -ForegroundColor Yellow
Write-Host "🧪 Test Page: http://localhost:3000/test" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Red
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

try {
    node server.js
}
catch {
    Write-Host "❌ Error starting server: $_" -ForegroundColor Red
}
finally {
    Write-Host ""
    Write-Host "Server stopped." -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
}
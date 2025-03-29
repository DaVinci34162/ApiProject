## Workaround Submission
Due to Docker/WSL configuration issues on my HP machine, I'm submitting the locally tested version. The app:
- Uses OpenWeatherMap API
- Runs on Node.js v18
- Implements error handling

## How to Run
1. `npm install`
2. `node server.js`
3. Access `http://localhost:5000/weather?city=London`

## Docker Issues Encountered
- HP BIOS virtualization locked
- WSL2 installation failed (HCS_E_HYPERV_NOT_INSTALLED)
https://drive.google.com/file/d/1flOMwvxxTqWu2ALKnCgD0ar_jZugrh3y/view?usp=drive_link

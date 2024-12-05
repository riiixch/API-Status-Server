# Server Monitor API

This project provides an API that monitors the system's resource usage, including CPU, RAM, Disk, and Network stats. It serves as a tool to track and gather information about server performance through various metrics.

## Features

- **CPU Usage**: Fetches CPU model, number of cores, and current CPU usage percentage.
- **RAM Usage**: Shows total, used, and available RAM with usage percentage.
- **Disk Usage**: Monitors disk space with total, used, and available space in human-readable format.
- **Network Usage**: Tracks upload and download speeds in real-time.
- **System Uptime**: Displays how long the system has been running since the last boot.
- **Node.js Version**: Provides the installed Node.js version.

## Setup

### Prerequisites

- Node.js (v12.0 or higher recommended)

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/your-repository/server-monitor-api.git
   ```

2. Navigate to the project directory:
   ```bash
   cd server-monitor-api
   ```

3. Install the required dependencies:
   ```bash
   npm install
   ```

4. Create a `config.js` file in the root directory, and set your desired port:
   ```js
   module.exports = {
     port: 3000
   };
   ```

### Running the API

1. Start the server:
   ```bash
   node app.js
   ```

2. The API will be available at `http://localhost:<port>` (default port is 3000).

## Endpoints

### `/status`

- **Method**: `GET`
- **Description**: Returns the current system status, including CPU, RAM, Disk, Network, and system uptime.
- **Response**:
   ```json
   {
     "os": "Windows_NT 10.0.19041",
     "cpu_model": "Intel(R) Core(TM) i7-9700K CPU @ 3.60GHz",
     "cpu_cores": 8,
     "cpu_used": "23.67",
     "ram_total": "16.00 GB",
     "ram_use": "8.00 GB",
     "ram_used": "50.00",
     "disk_total": "1024.00 GB",
     "disk_use": "500.00 GB",
     "disk_used": "50.00",
     "upload": "10.00 Mbps",
     "download": "50.00 Mbps",
     "uptime": "00:23:15",
     "nodejs": "v14.17.0"
   }
   ```

### `/`

- **Method**: `GET`
- **Description**: A basic root endpoint to verify that the API is running.
- **Response**:
   ```text
   Server Monitor API By. RIIIXCH
   ```

### Error Handling

- **404 Not Found**: Returned if an invalid route is accessed.

## Notes

- This API is intended to be used for monitoring system resource usage in real-time.
- The data is refreshed every minute to provide up-to-date information.

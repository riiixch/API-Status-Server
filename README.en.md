# API Status Server

This project is an API Status Server that provides system metrics including CPU, RAM, disk, network, and uptime statistics. The API is built using Node.js and Express, and it fetches system information using various Node.js libraries such as `os-utils` and `systeminformation`.

## Features
- Retrieve system status information including:
  - OS version
  - CPU usage and details
  - RAM usage and details
  - Disk usage and details
  - Network upload and download speeds
  - Uptime
  - Node.js version
- The data is updated every 60 seconds and can be accessed via the `/status` API endpoint.

## Requirements
- Node.js (version 12 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/riiixch/API-Status-Server.git
    ```

2. Navigate to the project directory:
    ```bash
    cd API-Status-Server
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Start the server:
    ```bash
    npm start
    ```

The server will run on `http://localhost:3000` by default.

## API Endpoints

- **GET `/`**  
  Returns a simple message confirming the server is running:
  ```
  API Status Server By. RIIIXCH
  ```

- **GET `/status`**  
  Returns system metrics including:
  - OS version
  - CPU model and usage
  - RAM usage and total
  - Disk usage (total, used, and percentage)
  - Network upload and download speeds (in Mbps/Gbps)
  - System uptime
  - Node.js version
  
  Example response:
  ```json
  {
    "os": "Linux",
    "cpu_model": "Intel(R) Core(TM) i7-8550U CPU @ 1.80GHz",
    "cpu_cores": 8,
    "cpu_used": "45.60",
    "ram_total": "16.00 GB",
    "ram_use": "8.00 GB",
    "ram_used": "50.00",
    "disk_total": "500.00 GB",
    "disk_use": "250.00 GB",
    "disk_used": "50.00",
    "upload": "100.00 Mbps",
    "download": "150.00 Mbps",
    "uptime": "1d:03:14:20",
    "nodejs": "14.15.0"
  }
  ```

## Contributing

If you'd like to contribute to this project, feel free to fork the repository and submit a pull request with improvements, bug fixes, or new features.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Created with ❤️ by **RIIIXCH**
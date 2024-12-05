const os = require('os');
const express = require('express');
const osUtils = require('os-utils');
const si = require('systeminformation');
const { versions } = require('process');

const { log } = require('console');

const app = express();
const PORT = 3000;

let disks = [];
let networks = [];

function convertTime(duration) {
    let seconds = parseInt((duration / 1000) % 60);
    let minutes = parseInt((duration / (1000 * 60)) % 60);
    let hours = parseInt((duration / (1000 * 60 * 60)) % 24);
    let days = parseInt(duration / (1000 * 60 * 60 * 24));

    const day = days < 10 ? "0" + days : days;
    const hour = hours < 10 ? "0" + hours : hours;
    const minute = minutes < 10 ? "0" + minutes : minutes;
    const second = seconds < 10 ? "0" + seconds : seconds;

    if (days >= 1) {
        return `${day}:${hour}:${minute}:${second}`;
    } else
    if (hours >= 1) {
        return `${hour}:${minute}:${second}`;
    } else {
        return `${minute}:${second}`;
    }
}

function convertByte(byte) {
    const MB = (byte / (1024 ** 2));
    const GB = (byte / (1024 ** 3));

    if (GB >= 1) {
        return `${GB.toFixed(2)} GB`;
    } else {
        return `${MB.toFixed(2)} MB`;
    }
}

function convertbyte(byte) {
    const Kb = (byte / (1024 ** 1));
    const Mb= (byte / (1024 ** 2));
    const Gb = (byte / (1024 ** 3));

    if (Gb >= 1) {
        return `${Gb.toFixed(2)} Gbps`;
    } else
    if (Mb >= 1) {
        return `${Mb.toFixed(2)} Mbps`;
    } else {
        return `${Kb.toFixed(2)} Kbps`;
    }
}

function persenUsedCal(total, use) {
    const used = (use / (total / 100)).toFixed(2);

    return used;
}

async function UpdateDiskAndNetwork() {
    let upd_disks = [];
    let upd_networks = [];

    const [diskData, netData] = await Promise.all([
        si.fsSize(),
        si.networkStats()
    ]);

    diskData.forEach(async (disk) => {
        let data = {
            drive: disk.fs,
            type: disk.type,
            size: Number(disk.size),
            use: Number(disk.used),
            used: Number(disk.use),
        }

        upd_disks.push(data);
    });

    netData.forEach(async (net) => {
        let data = {
            name: net.iface,
            send: Number(net.tx_bytes),
            receive: Number(net.rx_bytes),
            send_sec: Number(net.tx_sec) * 10,
            receive_sec: Number(net.rx_sec) * 10,
        }

        upd_networks.push(data);
    });

    disks = upd_disks;
    networks = upd_networks;
}

UpdateDiskAndNetwork();

setInterval(() => {
    UpdateDiskAndNetwork();
}, 60 * 1000);

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API Status Server By. RIIIXCH');
});

app.get('/status', (req, res) => {
    let disk_used = 0;
    let disk_total = 0;
    let disk_use = 0;

    disks.forEach(disk => {
        disk_total += (disk.size);
        disk_use += (disk.use);
    });

    disk_used = persenUsedCal(disk_total, disk_use);
    disk_total = convertByte(disk_total);
    disk_use = convertByte(disk_use);

    let upload = 0;
    let download = 0;

    networks.forEach(net => {
        upload += (net.send_sec);
        download += (net.receive_sec);
    });

    upload = convertbyte(upload);
    download = convertbyte(download);

    osUtils.cpuUsage((v) => {
        const OS = os.version();

        const cpu_model = os.cpus()[0].model;
        const cpu_cores = osUtils.cpuCount();
        const cpu_used = (v * 100).toFixed(2);

        const ramTotalCal = osUtils.totalmem() * 1024 ** 2;
        const ramFreeCal = osUtils.freemem() * 1024 ** 2;
        const ramUseCal = ramTotalCal - ramFreeCal;

        const ram_total = convertByte(ramTotalCal);
        const ram_use = convertByte(ramUseCal);
        const ram_used = persenUsedCal(ramTotalCal, ramUseCal);

        const uptime = convertTime(os.uptime() * 1000);

        const nodejs = versions.node;

        let data = {
            os: OS,
            cpu_model: cpu_model,
            cpu_cores: cpu_cores,
            cpu_used: cpu_used,
            ram_total: ram_total,
            ram_use: ram_use,
            ram_used: ram_used,
            disk_total: disk_total,
            disk_use: disk_use,
            disk_used: disk_used,
            upload: upload,
            download: download,
            uptime: uptime,
            nodejs: nodejs,
        };

        res.send(data);
    });
});

app.all('*', (req, res) => {
    res.send('API Status Server By. RIIIXCH');
});

app.listen(PORT, () => {
    log(`[Status Server] API is running on http://localhost:${PORT}`);
    log(`[Status Server] Fetch API : http://localhost:${PORT}/status`);
});

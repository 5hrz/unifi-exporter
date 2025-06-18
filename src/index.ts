import fastify from "fastify";
import * as dotenv from "dotenv";
import { CronJob } from 'cron';
import { GetISPMetrics, ListDevices, ListHosts, ListSites } from "./api/UniFi";
import { register, Gauge } from "prom-client";

dotenv.config();

const hostsBuf: Host[] = [];

const averageLatencyGauge = new Gauge({
    name: "unifi_avg_latency",
    help: "UniFi average latency",
    labelNames: ["hostId", "name"],
});
const maxLatencyGauge = new Gauge({
    name: "unifi_max_latency",
    help: "UniFi maximum latency",
    labelNames: ["hostId", "name"],
});
const packetLossGauge = new Gauge({
    name: "unifi_packet_loss",
    help: "UniFi packet loss",
    labelNames: ["hostId", "name"],
});

const totalClientGauge = new Gauge({
    name: "unifi_total_client",
    help: "UniFi total client",
    labelNames: ["hostId", "name"],
});
const wifiClientGauge = new Gauge({
    name: "unifi_wifi_client",
    help: "UniFi WiFi client",
    labelNames: ["hostId", "name"],
});
const wiredClientGauge = new Gauge({
    name: "unifi_wired_client",
    help: "UniFi wired client",
    labelNames: ["hostId", "name"],
});
const offlineDeviceGauge = new Gauge({
    name: "unifi_offline_device",
    help: "UniFi offiline device",
    labelNames: ["hostId", "name"],
});
const totalDeviceGauge = new Gauge({
    name: "unifi_total_device",
    help: "UniFi total device",
    labelNames: ["hostId", "name"],
});
const wifiDeviceGauge = new Gauge({
    name: "unifi_wifi_device",
    help: "UniFi WiFi device",
    labelNames: ["hostId", "name"],
});
const wiredDeviceGauge = new Gauge({
    name: "unifi_wired_device",
    help: "UniFi wired device",
    labelNames: ["hostId", "name"],
});
const guestClientGauge = new Gauge({
    name: "unifi_guest_client",
    help: "UniFi guest device",
    labelNames: ["hostId", "name"],
});

const unifiStatusGauge = new Gauge({
    name: "unifi_status",
    help: "UniFi status(-999 : offline, 0 : any offline device, 100 : online)",
    labelNames: ["hostId", "name"],
});

const initUniFiCollector = () => {
    new CronJob(
        '0 0 0,4,8,12,16,20 * * *',
        initHosts,
        null,
        true,
        'Asia/Tokyo'
    );

    initHosts();

    new CronJob(
        '*/2 * * * * *',
        collectData,
        null,
        true,
        'Asia/Tokyo'
    );
}

interface Host {
    name: string,
    hostId: string,
    hardwareId: string,
    address: string[]
}

const initHosts = async () => {
    const hosts = await ListHosts();
    if (hosts.httpStatusCode == 200 && hosts.data) {
        if (Array.isArray(hosts.data)) {
            hosts.data.forEach((host) => {
                if (!hostsBuf.find((v) => v.hostId == host.id)) {
                    hostsBuf.push({
                        hostId: host.id,
                        name: host.reportedState?.name ?? host.reportedState?.hostname ?? "",
                        hardwareId: host.hardwareId,
                        address: host.reportedState?.ipAddrs ?? []
                    });
                } else {
                    hostsBuf.map((v) => {
                        if (v.hostId == host.id) {
                            return {
                                hostId: host.id,
                                name: host.reportedState?.name ?? host.reportedState?.hostname ?? "",
                                hardwareId: host.hardwareId,
                                address: host.reportedState?.ipAddrs ?? []
                            };
                        } else {
                            return v;
                        }
                    })
                }
            })
        }
    }
};

const collectData = async () => {
    try {
        const ispData = await GetISPMetrics("5m", toRFC3339(new Date(Date.now() - 1000 * 60 * 60)), toRFC3339(new Date()));
        if (ispData.data) {
            ispData.data.forEach((data) => {
                const hostname = hostsBuf.find((v) => v.hostId == data.hostId)?.name ?? data.siteId;
                averageLatencyGauge.labels(data.hostId, hostname).set(data.periods.slice(-1)[0].data.wan.avgLatency)
                maxLatencyGauge.labels(data.hostId, hostname).set(data.periods.slice(-1)[0].data.wan.maxLatency)
                packetLossGauge.labels(data.hostId, hostname).set(data.periods.slice(-1)[0].data.wan.packetLoss)
            });
        }
    } catch (e: unknown) {
        console.error(e);
    }

    try {
        const statData = await ListSites(5000);
        if (statData.data) {
            statData.data.forEach((data) => {
                const hostname = hostsBuf.find((v) => v.hostId == data.hostId)?.name ?? data.siteId;
                totalClientGauge.labels(data.hostId, hostname).set(data.statistics.counts.wifiClient + data.statistics.counts.wiredClient);
                wifiClientGauge.labels(data.hostId, hostname).set(data.statistics.counts.wifiClient);
                wiredClientGauge.labels(data.hostId, hostname).set(data.statistics.counts.wiredClient);
                offlineDeviceGauge.labels(data.hostId, hostname).set(data.statistics.counts.offlineDevice);
                totalDeviceGauge.labels(data.hostId, hostname).set(data.statistics.counts.totalDevice);
                wifiDeviceGauge.labels(data.hostId, hostname).set(data.statistics.counts.wifiDevice);
                wiredDeviceGauge.labels(data.hostId, hostname).set(data.statistics.counts.wiredDevice);
                guestClientGauge.labels(data.hostId, hostname).set(data.statistics.counts.guestClient);
                unifiStatusGauge.labels(data.hostId, hostname).set(data.statistics.counts.totalDevice == data.statistics.counts.offlineDevice ? -999 : data.statistics.counts.totalDevice - data.statistics.counts.offlineDevice >= 1 ? 0 : 100)
            });
        }
    } catch (e: unknown) {
        console.error(e);
    }

    try {
        const deviceData = await ListDevices(undefined, undefined, 10000);
        if (deviceData.data) {
            deviceData.data.forEach((deviceGroup) => {
                let status = 100;
                deviceGroup.devices.forEach((device) => {
                    if (device.isConsole && device.status === "offline") {
                        status = -999;
                    } else if (device.status == "offline" && status != -999) {
                        status = 0;
                    }
                })
                unifiStatusGauge.labels(deviceGroup.hostId, deviceGroup.hostName).set(status);
            });
        }
    } catch (e: unknown) {
        console.error(e);
    }
};

const toRFC3339 = (date: Date) => `${date.getUTCFullYear()}-${(`0${(date.getUTCMonth() + 1)}`).slice(-2)}-${(`0${date.getUTCDate()}`).slice(-2)}T${(`0${date.getUTCHours()}`).slice(-2)}:${(`0${date.getUTCMinutes()}`).slice(-2)}:${(`0${date.getUTCSeconds()}`).slice(-2)}Z`;

const server = fastify();
initUniFiCollector();

server.get("/metrics", async () => {
    return register.metrics();
});

server.listen({ port: parseInt(process.env.PORT ?? "8080"), host: "0.0.0.0" }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
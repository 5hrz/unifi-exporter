export interface UniFiResponse<T extends (UniFiResponseData | undefined)> {
    httpStatusCode: number,
    traceId: string,
    data?: T,
    code?: string,
    message?: string,
    nextToken?: string,
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UniFiResponseData {
}

export interface HostData extends UniFiResponseData {
    id: string,
    hardwareId: string,
    type: "console" | "network-server" | "ucore",
    ipAddress: string,
    owner: boolean,
    isBlocked: boolean,
    registrationTime: string,
    lastConnectionStateCahnge: string,
    lastestBackupTime: string,
    userData: UniFiUserData,
    reportedState: UniFiReportedState | null,
};

export interface UniFiUserData {
    apps: string[],
    consoleGroupMembers: UniFiConsoleGroupMembers[],
    controllers: string[],
    email: string,
    features: UniFiFeatures,
    fullName: string,
    localId: string,
    permissions: UniFIPermissions,
    role: string,
    roleId: string,
    status: string,
}

export interface UniFiConsoleGroupMembers {
    mac: string,
    role: string,
    roleAttributes: UniFiRoleAttributes,
    sysId: number,
}

export interface UniFiRoleAttributes {
    applications: UniFiApplications,
    candidateRoles: string[],
    connectedState: string,
    connectedStateLastChanged: string,
}

export interface UniFiApplications {
    access: UniFiApplication,
    connect: UniFiApplication,
    innerspace: UniFiApplication,
    network: UniFiApplication,
    protect: UniFiApplication,
    talk: UniFiApplication
}

export interface UniFiApplication {
    owned: boolean,
    required: boolean,
    supported: boolean
}

export interface UniFiFeatures {
    deviceGroups: boolean,
    floorplan: UniFiFloorPlan,
    manageApplications: boolean,
    notifications: boolean,
    pion: boolean,
    webrtc: UniFiWebRTC,
}

export interface UniFiFloorPlan {
    canEdit: boolean,
    canView: boolean,
}

export interface UniFiWebRTC {
    iceRestart: boolean,
    mediaStreams: boolean,
    twoWayAudio: boolean,
}

export interface UniFIPermissions {
    "access.management": string[],
    "connect.management": string[],
    "innerspace.management": string[],
    "network.management": string[],
    "protect.management": string[],
    "system.management.location": string[],
    "system.management.user": string[],
    "talk.management": string[],
}

export interface UniFiReportedState {
    anonid: string,
    apps: UniFiApps,
    availableChannels: string[],
    consolesOnSameLocalNetwork: string[],
    controller_uuid: string,
    controllers: UniFiController[],
    country: number,
    deviceErrorCode?: unknown,
    deciceState: string,
    deviceStateLastChanged: number,
    directConnectDomain: string,
    features: UniFiReportedStateFeatures,
    firmwareUpdate: UniFiFirmwareUpdate,
    hardware: UniFiHardware,
    host_type: number,
    hostname: string,
    internetIssues5min: UniFiInternetIssues5min,
    ip: string,
    ipAddrs: string[],
    isStacked: boolean,
    location: UniFiLocation,
    mac: string,
    mgmt_port: number,
    name: string,
    releaseChannel: string,
    state: string,
    timezone: string,
    uidb: UniFiUIDB,
    unadoptedUnifiOSDevices: unknown[],
    version: string,
}

export interface UniFiApps {
    controllerStatus: string,
    features?: UniFiAppsFeatures,
    identityFeatures?: UniFiIndentityFeatures,
    name: string,
    port: number,
    swaiVersion: number,
    type: string,
    uiVersion: string,
    version: string,
    statusMessage?: string,
    status?: string,
    state?: string,
    isRunning?: boolean,
    installState?: string,
    isConfigured?: boolean,
}

export interface UniFiAppsFeatures {
    apiIntegration: boolean,
    assignmentFlags: boolean,
    driveUIComponentForUserConsolidation: boolean,
    fetchServiceStatusFromAccess: boolean,
    identityCertificateDistribution: boolean,
    supportAPIKeysMigration: boolean,
    supportFeatures: boolean,
    upgradeUcs: boolean,
    userConsolidation: boolean,
    userConsolidationViaGlobalFunc: boolean
}

export interface UniFiIndentityFeatures {
    ucs: boolean,
    ucsAgent: boolean,
}

export interface UniFiController {
    abridged: boolean,
    controllerStatus: string,
    initialDeviceListSynced: boolean,
    installState: string,
    isConfigured: boolean,
    isInstalled: boolean,
    isRunning: boolean,
    name: string,
    port: number,
    releaseChannel: string,
    required: boolean,
    state: string,
    status: string,
    statusMessage: string,
    swaiVersion: number,
    type: string,
    uiVersion: string,
    unadoptedDevices: unknown[],
    updatable: boolean,
    version: string,
}

export interface UniFiReportedStateFeatures {
    cloud: UniFiCloud,
    cloudBackup: boolean,
    deviceList: UniFiDeviceList,
    directRemoteConnection: boolean,
    hasGateway: boolean,
    hasLCM: boolean,
    hasLED: boolean,
    infoApis: UniFiInfoApis,
    isAutomaticFailoverAvailable: boolean,
    mfa: boolean,
    notifications: boolean,
    sharedTokens: boolean,
    supportForm: boolean,
    teleport: boolean,
    teleportState: string | "UNSUPPORTED",
    uidService: boolean,
}

export interface UniFiCloud {
    applicationEvents: boolean,
    applicationEventsHttp: boolean,
}

export interface UniFiDeviceList {
    autolinkDevices: boolean,
    partialUpdates: boolean,
    ucp4Events: boolean,
}

export interface UniFiInfoApis {
    firmwareUpdate: boolean
}

export interface UniFiFirmwareUpdate {
    latestAvailableVersion?: string,
}

export interface UniFiHardware {
    bom: string,
    "cpu.id": string,
    debianCodename: string,
    firmwareVersion: string,
    hwrev: number,
    mac: string,
    name: string,
    qrid: string,
    reboot: string | `${number}`,
    serialno: string,
    shortname: string,
    subtype: string,
    sysid: number,
    upgrade: string | `${number}`,
    uuid: string,
}

export interface UniFiInternetIssues5min {
    periods: UniFiPeriods[]
}

export interface UniFiPeriods {
    high_latency?: boolean,
    index: number,
    latency_avg_ms?: number,
    latency_max_ms?: number,
}

export interface UniFiLocation {
    lat: number,
    long: number,
    radius: number,
    text: string
}

export interface UniFiUIDB {
    guid: string,
    id: string,
    images: UniFiImages
}

export interface UniFiImages {
    default: string,
    "mobile-connection": string,
    "mobile-internet-connected": string,
    "mobile-no-internet": string,
    noppading: string,
    topology: string
}

export interface UniFiSiteData extends UniFiResponseData {
    siteId: string,
    hostId: string,
    meta: UniFiSiteMeta,
    statistics: UniFiSiteStat,
    permission: string,
    isOwner: boolean
}

export interface UniFiSiteMeta {
    desc: string,
    gatewayMac: string,
    name: string,
    timezone: string,
}

export interface UniFiSiteStat {
    counts: UniFiSiteStatCount,
    gateway: UniFiSiteStatGateway,
    internetIssues: UniFiSiteInternetIssue[],
    ispInfo: UniFiISPInfo,
    percentages: UniFiSitePercentages,
    wans: {
        [key in string]: UniFiSiteWAN
    }
}

export interface UniFiSiteStatCount {
    criticalNotification: number,
    gatewayDevice: number,
    guestClient: number,
    lanConfiguration: number,
    offlineDevice: number,
    offlineGatewayDevice: number,
    offlineWifiDevice: number,
    offlineWiredDevice: number,
    pendingUpdateDevice: number,
    totalDevice: number,
    wanConfiguration: number,
    wifiClient: number,
    wifiConfiguration: number,
    wifiDevice: number,
    wiredClient: number,
    wiredDevice: number
}

export interface UniFiSiteStatGateway {
    hardwareId: string,
    inspectionState: string,
    ipsMode: string,
    ipsSignature: UniFiSiteStatGatewayIPSSignature,
    shortname: string
}

export interface UniFiSiteStatGatewayIPSSignature {
    rulesCount: string,
    type: string | "ET",
}

export interface UniFiSiteInternetIssue {
    count: number,
    index: number,
    notReported?: boolean,
    wan2FailoverActive?: boolean,
    wanDowntime?: boolean
}

export interface UniFiISPInfo {
    name: string,
    organization: string,
}

export interface UniFiSitePercentages {
    wanUptime: number
}

export interface UniFiSiteWAN {
    wanIssues: UniFiSiteIssue[],
    wanUptime: number,
    ispInfo?: UniFiISPInfo,
}

export interface UniFiSiteIssue {
    count: number,
    index: number,
    notReported?: boolean,
    failover_wan_active: boolean,
}

export interface UniFiDeviceData extends UniFiResponseData {
    hostId: string,
    hostName: string,
    devices: UniFiDevice[],
    updatedAt: string,
}

export interface UniFiDevice {
    id: string,
    mac: string,
    name: string,
    model: string,
    shortname: string,
    ip: string,
    productLine: string, // "network" | "protect"
    status: string,
    version: string,
    firmwareStatus: string,
    updateAvailable?: string,
    isConsole: boolean,
    isManaged: boolean,
    startupTime: string,
    adoptionTime: string,
    note?: string,
    uidb: UniFiUIDB
}

export interface UniFiISPMetricsData extends UniFiResponseData {
    metricType: "5m" | "1h",
    periods: UniFiISPMetricsPeriod[],
    hostId: string,
    siteId: string,
}

export interface UniFiISPMetricsPeriod {
    data: UniFiISPMetricsPeriodData,
    metricTime: string,
    version: string,
}

export interface UniFiISPMetricsPeriodData {
    wan: UniFiISPMetricsPeriodWanData
}

export interface UniFiISPMetricsPeriodWanData {
    avgLatency: number,
    download_kbps: number,
    downtime: number,
    ispAsn: string,
    ispName: string,
    maxLatency: number,
    packetLoss: number,
    upload_kbps: number,
    uptime: number,
}

export interface UniFiISPMetricsDataList extends UniFiResponseData {
    metrics: UniFiISPMetricsData[],
}

export interface UniFiSDWANConfigs extends UniFiResponseData {
    id: string,
    name: string,
    type: "sdwan-hbsp"
}

export interface UniFiSDWANConfig extends UniFiResponseData {
    id: string,
    name: string,
    type: "sdwan-hbsp",
    variant: "distributed" | "failover" | "single",
    settings: UniFiSDWANSettings,
    hubs: UniFiSDWANHub[],
    spokes: UniFiSDWANSpoke[]
}

export interface UniFiSDWANSettings {
    hubsInterconnect: boolean,
    spokeToHubTunnelsMode: "maxResiliency" | "redundant" | "scalable",
    spokesAutoScaleAndNatEnabled: boolean,
    spokesAutoScaleAndNatRange: string,
    spokesIsolate: boolean,
    spokeStandardSettingsEnabled: boolean,
    spokeStandardSettingsValues: UniFiSDWANSpokeSettings,
    spokeToHubRouting: "custom" | "geo",
}

export interface UniFiSDWANSpokeSettings {
    primaryWan: string,
    wanFailover: boolean
}

export interface UniFiSDWANHub {
    id: string,
    hostId: string,
    siteId: string,
    networkIds: string[],
    routes: string[],
    primaryWan: string,
    wanFailover: string,
}

export interface UniFiSDWANSpoke {
    id: string,
    hostId: string,
    siteId: string,
    networkIds: string[],
    routes: string[],
    primaryWan: string,
    wanFailover: boolean,
    hubsPriority: string[]
}

export interface UniFiSDWANConfigStatus {
    id: string,
    fingerprint: string,
    updatedAt: number,
    hubs: UniFiSDWANHubStatus[],
    spokes: UniFiSDWANSpokeStatus[],    
    lastGeneratedAt: number,
    generateStatus: "OK" | "GENERATING" | "GENERATE_FAILED",
    errors: unknown[],
    warnings: unknown[],
}

export interface UniFiSDWANHubStatus {
    id: string,
    hostId: string,
    siteId: string,
    name: string,
    primaryWanStatus: UniFiWANStatus,
    secondaryWanStatus: UniFiWANStatus,
    errors: unknown[],
    warnings: unknown[],
    numberOfTunnelsUsedByOtherFeatures: number,
    networks: UniFiSDWANNetwork[],
    routes: UniFiSDWANRoute[],
    applyStatus: "ok" | "creating" | "updating" | "removing" | "createFailed" | "updateFailed" | "removeFailed",
}

export interface UniFiSDWANNetwork {
    networkId: string,
    name: string,
    errors: unknown[],
    warnings: unknown[],
}

export interface UniFiSDWANRoute {
    routeValue: string,
    errors: unknown[],
    warnings: unknown[],
}

export interface UniFiSDWANSpokeStatus extends UniFiSDWANHubStatus {
    connections: UniFiSDWANConnection[]
}

export interface UniFiSDWANConnection {
    hubId: string,
    tunnels: UniFiSDWANTunnel[],
}

export interface UniFiSDWANTunnel {
    spokeWanId: string,
    hubWanId: string,
    status: "connected" | "disconnected" | "pending"
}

export interface UniFiWANStatus {
    ip: string,
    latency: number,
    internetIssues: unknown[],
    wanId: string
}

const UNIFI_ENDPOINT = `https://api.ui.com/${process.env.UNIFI_API_VERSION ?? "ea"}/`;

export const get = async <T extends (UniFiResponseData | UniFiResponseData[])>(path: string, params?: { [key in string]: string | string[] | undefined}, headers?: { [key in string]: string}) => {
    const url = new URL(`${UNIFI_ENDPOINT}${path}`);
    if (params) {
        for (const [key, value] of Object.entries(params)) {
            if (typeof value == "string") {
                url.searchParams.set(key, value);
            } else if (value) {
                url.searchParams.set(key, JSON.stringify(value));
            }
        }
    }
    const retrievedData = await fetch(url.toString(), {
        headers: {
            ...headers,
            "X-API-Key": process.env.UNIFI_API_KEY ?? "",
            "Accept": "application/json"
        },
        method: "GET",
        cache: "no-cache"
    });
    if (retrievedData.status == 200) {
        return await retrievedData.json() as UniFiResponse<T>;
    } else {
        throw new Error((await retrievedData.json()).message);
    }
};

export const post = async <T extends (UniFiResponseData | UniFiResponseData[])>(path: string, params?: { [key in string]: string | string[] | undefined}, body?: { [key in string]: unknown}, headers?: { [key in string]: string}) => {
    const url = new URL(`${UNIFI_ENDPOINT}${path}`);
    if (params) {
        for (const [key, value] of Object.entries(params)) {
            if (typeof value == "string") {
                url.searchParams.set(key, value);
            } else if (value) {
                url.searchParams.set(key, JSON.stringify(value));
            }
        }
    }
    const retrievedData = await fetch(url.toString(), {
        headers: {
            ...headers,
            "X-API-Key": process.env.UNIFI_API_KEY ?? "",
            "Accept": "application/json"
        },
        body: body ? JSON.stringify(body) : undefined,
        method: "POST",
        cache: "no-cache"
    });
    if (retrievedData.status == 200) {
        return await retrievedData.json() as UniFiResponse<T>;
    } else {
        throw new Error((await retrievedData.json()).message);
    }
};

export const ListHosts = async (pageSize?: number, nextToken?: string) => {
    return get<HostData[]>("hosts", { pageSize: pageSize?.toString(), nextToken: nextToken});
};

export const GetHostByID = async (id: string) => {
    return get<HostData>(`hosts/${id}`);
};

export const ListSites = async (pageSize?: number, nextToken?: string) => {
    return get<UniFiSiteData[]>("sites", {pageSize: pageSize?.toString(), nextToken: nextToken});
};

export const ListDevices = async (hostIds?: string[], time?: string, pageSize?: number, nextToken?: string) => {
    return get<UniFiDeviceData[]>("devices", {hostIds: hostIds, time: time, pageSize: pageSize?.toString(), nextToken: nextToken})
};

export const GetISPMetrics = async (type: "5m" | "1h", beginTimestamp?: string, endTimestamp?: string, duration?: string) => {
    return get<UniFiISPMetricsData[]>(`isp-metrics/${type}`, { beginTimestamp: beginTimestamp, endTimestamp: endTimestamp, duration: duration});
};

export interface UniFiSitesRequest {
    beginTimestamp: string,
    hostId: string,
    endTimestamp: string,
    siteId: string,
}

export const QueryISPMetrics = async (type: "5m" | "1h", sites: UniFiSitesRequest[]) => {
    return post<UniFiISPMetricsDataList>(`isp-metrics/${type}/query`, {}, { sites: sites })
};

export const ListSDWANConfigs = async () => {
    return get<UniFiSDWANConfigs[]>("sd-wan-configs");
};

export const GetSDWANConfigByID = async (id: string) => {
    return get<UniFiSDWANConfig>(`sd-wan-configs/${id}`);
};

export const GetSDWANConfigStatus = async (id: string) => {
    return get<UniFiSDWANConfigStatus>(`sd-wan-configs/${id}/status`);
}
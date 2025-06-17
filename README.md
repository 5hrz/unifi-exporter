# UniFi Exporter

UniFi Site Manager APIを用いてprometheus用のデータを収集し、metricsを出力します。

## Installation

環境変数
```
UNIFI_API_KEY=<unifi.ui.comで作成したAPI KEY>
UNIFI_API_VERSION=<ea もしくは v1(v1だと一部機能が使用できません)>
PORT=<アプリケーションを起動するポート>
```

デフォルトではポート8080でアプリケーションが提供されます。
metricsは`/metrics`から取得が可能です。

## Exported Metrics

| Name                 | Type  | Description          | Labels          |
| -------------------- | ----- | -------------------- | --------------- |
| unifi_avg_latency    | Guage | 平均応答速度(ms)       | `hostId` `name` |
| unifi_max_latency    | Guage | 最大応答速度(ms)       | `hostId` `name` |
| unifi_packet_loss    | Guage | パケットロス           | `hostId` `name` |
| unifi_total_client   | Guage | クライアント数         | `hostId` `name` |
| unifi_wifi_client    | Guage | Wi-Fiクライアント数    | `hostId` `name` |
| unifi_wired_client   | Guage | 有線クライアント数      | `hostId` `name` |
| unifi_offline_device | Guage | オフラインクライアント数 | `hostId` `name` |
| unifi_total_device   | Guage | UniFiデバイス総数      | `hostId` `name` |
| unifi_wifi_device    | Guage | UniFi WiFiデバイス総数 | `hostId` `name` |
| unifi_wired_device   | Guage | UniFi 有線デバイス総数  | `hostId` `name` |
| unifi_guest_client   | Guage | UniFiゲスト数         | `hostId` `name` |
| unifi_status         | Guage | 起動状況<br>-999 : オフライン<br>0 : オフラインデバイスが存在<br>100 : オンライン         | `hostId` `name` |
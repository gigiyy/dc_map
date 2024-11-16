import { Alert } from '../models/Alert';
import { DataCenter } from '../models/DataCenter';

export class DummyDataService {
    private dataCenters: DataCenter[];
    private alerts: Alert[];

    constructor() {
        this.initializeDataCenters();
        this.initializeAlerts();
    }

    private initializeDataCenters(): void {
        this.dataCenters = [
            new DataCenter(
                "DC-London",
                { latitude: 51.5074, longitude: -0.1278 },
                "Primary data center in London"
            ),
            new DataCenter(
                "DC-Paris",
                { latitude: 48.8566, longitude: 2.3522 },
                "Main European data center"
            ),
            new DataCenter(
                "DC-Frankfurt",
                { latitude: 50.1109, longitude: 8.6821 },
                "Secondary European data center"
            ),
            new DataCenter(
                "DC-Amsterdam",
                { latitude: 52.3676, longitude: 4.9041 },
                "Backup data center"
            )
        ];
    }

    private initializeAlerts(): void {
        this.alerts = [
            new Alert(
                "ALT001",
                "Network Outage",
                12345,
                "DC-London",
                [12345, 12346],
                ["DC-London", "DC-Paris"],
                "Major network connectivity issues detected"
            ),
            new Alert(
                "ALT002",
                "Storage Failure",
                12346,
                "DC-Paris",
                [12346],
                ["DC-Paris"],
                "Storage system degradation detected"
            ),
            new Alert(
                "ALT003",
                "High CPU Usage",
                12347,
                "DC-Frankfurt",
                [12347, 12348, 12349],
                ["DC-Frankfurt", "DC-Amsterdam"],
                "Unusual CPU spike detected across multiple systems"
            )
        ];
    }

    getDataCenters(): DataCenter[] {
        return this.dataCenters;
    }

    getAlerts(): Alert[] {
        return this.alerts;
    }

    getDataCenterByName(name: string): DataCenter | undefined {
        return this.dataCenters.find(dc => dc.name === name);
    }

    getAlertsByDataCenter(dcName: string): Alert[] {
        return this.alerts.filter(alert => 
            alert.dc === dcName || alert.affected_dcs.includes(dcName)
        );
    }

    getBounds(): { north: number; south: number; east: number; west: number } {
        const lats = this.dataCenters.map(dc => dc.position.latitude);
        const lngs = this.dataCenters.map(dc => dc.position.longitude);
        
        return {
            north: Math.max(...lats),
            south: Math.min(...lats),
            east: Math.max(...lngs),
            west: Math.min(...lngs)
        };
    }
} 
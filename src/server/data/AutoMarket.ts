import fs from "fs";
import path from "path";

export class AutoMarket {

    protected parkingSpots: ParkingSpotMap;
    protected vehicles: VehiclePreviewMap;
    protected markers: MarkerMap;

    private readonly parkingSpotsPath: string;
    private readonly vehiclesPath: string;
    private readonly markersPath: string;

    constructor() {
        // dist/packages/core -> src/server/data
        this.parkingSpotsPath = path.join(__dirname, "../../../src/server/data", "auto_market_spots.json");
        this.vehiclesPath = path.join(__dirname, "../../../src/server/data", "auto_market_vehicles.json");
        this.markersPath = path.join(__dirname, "../../../src/server/data", "auto_market_markers.json");

        this.parkingSpots = this.getParkingSpots();
        this.vehicles = this.getVehicles();
        this.markers = this.getMarkers();
    }

    addVehicleForSale(parkingSpotId: number, vehiclePreview: VehiclePreview): void {
        const parkingSpot: ParkingSpot = this.getParkingSpot(parkingSpotId)!;
        const marker: Marker = this.markers.get(parkingSpot.centerMarkerId!)!;
        const vehiclePreviewId: number = this.vehicles.size;

        vehiclePreview.id = vehiclePreviewId;
        vehiclePreview.parkingSpotId = parkingSpot.id;
        parkingSpot.vehiclePreviewId = vehiclePreviewId;
        parkingSpot.occupied = true;
        marker.visible = false;

        this.vehicles.set(vehiclePreviewId, vehiclePreview);
        this.updateData();
    }

    removeVehicleFromSale(parkingSpotId: number): void {
        const parkingSpot: ParkingSpot = this.getParkingSpot(parkingSpotId)!;
        const vehicle: VehiclePreview = this.getVehicle(parkingSpot.vehiclePreviewId!)!;
        const marker: Marker = this.getMarker(parkingSpot.centerMarkerId!)!;

        parkingSpot.occupied = false;
        parkingSpot.vehiclePreviewId = null;
        marker.visible = true;

        this.vehicles.delete(vehicle.id);
        this.updateData();
    }

    getParkingSpots(): Map<number, ParkingSpot> {
        return this.getData<ParkingSpot>(this.parkingSpotsPath);
    }

    getParkingSpot(id: number): ParkingSpot | null {
        return this.getParkingSpots().get(id) || null;
    }

    getVehicles(): Map<number, VehiclePreview> {
        return this.getData<VehiclePreview>(this.vehiclesPath);
    }

    getVehicle(id: number): VehiclePreview | null {
        return this.getVehicles().get(id) || null;
    }

    getMarkers(): Map<number, Marker> {
        return this.getData<Marker>(this.markersPath);
    }

    getMarker(id: number): Marker | null {
        return this.getMarkers().get(id) || null;
    }

    updateMarkers(markers: MarkerExecute[]): void {
        markers.forEach((me: MarkerExecute): void => {
            this.markers.set(me.marker.id, me.marker);
            this.parkingSpots.get(me.parkingSpotId!)!.centerMarkerId = me.marker.id;
        });

        this.updateData(["ParkingSpot", "Marker"]);
    }

    removeMarkers(markers: number[]): void {
        markers.forEach((markerId: number): void => {
            this.parkingSpots.forEach((ps: ParkingSpot): void => {
                if (ps.centerMarkerId === markerId) ps.centerMarkerId = null;
            });

            this.markers.delete(markerId);
            this.updateData(["ParkingSpot", "Marker"]);
        });
    }

    private getData<DataType extends { id: number }>(filePath: string): Map<number, DataType> {
        const parsedData: DataType[] = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        return new Map(parsedData.map(obj => [obj.id, obj]));
    }

    private writeData<DataType>(filePath: string, data: Map<number, DataType>): void {
        fs.writeFileSync(filePath, JSON.stringify([...data.values()], null, 2), "utf-8");
    }

    private updateData(types?: string[]): void {
        const allowedTypes: string[] = [
            "ParkingSpot",
            "VehiclePreview",
            "Marker"
        ];

        type TypesMap = {
            path: string;
            data: Map<number, ParkingSpot | VehiclePreview | Marker>
        };

        const typesMap: Record<string, TypesMap> = {
            "ParkingSpot": {
                path: this.parkingSpotsPath,
                data: this.parkingSpots
            },
            "VehiclePreview": {
                path: this.vehiclesPath,
                data: this.vehicles,
            },
            "Marker": {
                path: this.markersPath,
                data: this.markers
            }
        };

        (types ?? allowedTypes).forEach((type: string): void => {
            const entry: TypesMap = typesMap[type];
            if (entry) this.writeData(entry.path, entry.data);
        });
    }
}
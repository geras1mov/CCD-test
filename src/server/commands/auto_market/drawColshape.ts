import {Core as DatabaseCore} from "@/data/Core";
import {getVehicleFrontPosition} from "@/utils/getVehicleFrontPosition";

export function drawColshape(command: string, parkingSpotId: number): void {
    const allowedCommands: string[] = ["buy", "sell"];
    if (!allowedCommands.includes(command)) return;

    const parkingSpot: ParkingSpot = DatabaseCore.AutoMarket.getParkingSpot(parkingSpotId)!;
    if (!parkingSpot) return;

    mp.colshapes.forEach((colshape: ColshapeMp): void => {
        if (colshape.parkingSpotId === parkingSpotId) {
            colshape.destroy();
        }
    });

    if (command === allowedCommands[0]) {
        if (!parkingSpot.occupied && !parkingSpot.vehiclePreviewId) return;

        const vehiclePreview: VehiclePreview = (DatabaseCore.AutoMarket.getVehicles()).get(parkingSpot.vehiclePreviewId!)!;
        if (!vehiclePreview) return;

        const vehicleFrontPosition: Vector3 = getVehicleFrontPosition(vehiclePreview);
        const vehicleFrontPositionArr: number[] = Object.values(vehicleFrontPosition);
        const colshape: ColshapeMp = mp.colshapes.newSphere(...vehicleFrontPositionArr as [number, number, number], 3);
        colshape.command = "buy";
        colshape.parkingSpotId = parkingSpot.id;

        // mp.markers.new(1, vehicleFrontPosition, 2);
        mp.labels.new(`$ ${vehiclePreview.forSale.price} | Seller: ${vehiclePreview.forSale.owner}`, vehicleFrontPosition);
    } else {
        if (parkingSpot.occupied) return;

        const colshape: ColshapeMp = mp.colshapes.newSphere(...Object.values(parkingSpot.position) as [number, number, number], 2);
        colshape.command = "sell";
        colshape.parkingSpotId = parkingSpot.id;
    }
}
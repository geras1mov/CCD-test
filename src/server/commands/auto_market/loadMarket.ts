import {Core as DatabaseCore} from "@/data/Core";
import {AutoMarket as VehicleAutoMarket} from "@/helpers/vehicleVariables";
import {AutoMarket as MessageAutoMarket} from "@/helpers/messages";
import {updateMarkers} from "@/commands/auto_market/updateMarkers";
import {generateColshapes} from "@/commands/auto_market/generateColshapes";

export function loadMarket(): void {
    updateMarkers();
    generateColshapes();

    const parkingSpots: ParkingSpotMap = DatabaseCore.AutoMarket.getParkingSpots();
    const spawnedVehicles: number[] = [];

    parkingSpots.forEach((parkingSpot: ParkingSpot): void => {
        if (parkingSpot.occupied && parkingSpot.vehiclePreviewId !== null) {
            const vehiclePreview: VehiclePreview = DatabaseCore.AutoMarket.getVehicle(parkingSpot.vehiclePreviewId!)!;
            if (!vehiclePreview) return;

            const vehicle: VehicleMp = mp.vehicles.new(vehiclePreview.model, vehiclePreview.position, {
                heading: parkingSpot.heading,
                locked: true,
                engine: false
            });

            vehicle.setVariable(VehicleAutoMarket.ForSale, vehiclePreview.forSale);
            spawnedVehicles.push(vehiclePreview.id);
        }
    });

    if (spawnedVehicles.length > 0) {
        mp.players.broadcast(MessageAutoMarket.INFO.GENERATED_VEHICLES.replace("%", spawnedVehicles.join(" ")));
    }
}
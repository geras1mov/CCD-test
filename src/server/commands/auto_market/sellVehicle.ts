import {Core as DatabaseCore} from "@/data/Core";
import {AutoMarket as MessageAutoMarket} from "@/helpers/messages";
import {AutoMarket as PlayerAutoMarket} from "@/helpers/playerVariables";
import {AutoMarket as VehicleAutoMarket} from "@/helpers/vehicleVariables";
import {getDriverExitPosition} from "@/utils/getDriverExitPosition";
import {drawColshape} from "./drawColshape";

export function sellVehicle(player: PlayerMp, fullText: string): void {
    const parkingSpotId: number | null = player.getVariable(PlayerAutoMarket.ParkingSpotId);
    if (!parkingSpotId) return;

    const vehiclePrice: number = +fullText?.split(/\s+/)[0];
    if (!vehiclePrice || isNaN(vehiclePrice) || vehiclePrice <= 0) {
        return player.outputChatBox(MessageAutoMarket.INVALID_COST);
    }

    const playerVehicle: VehicleMp = player.vehicle;
    if (!playerVehicle) {
        return player.outputChatBox(MessageAutoMarket.VEHICLE_REQUIRED);
    }

    if (player.vehicle.getVariable("owner") !== player.id) {
        return player.outputChatBox(MessageAutoMarket.NOT_OWNER);
    }

    const parkingSpot: ParkingSpot | null = DatabaseCore.AutoMarket.getParkingSpot(parkingSpotId);
    if (!parkingSpot) {
        return player.outputChatBox(MessageAutoMarket.ERRORS.INVALID_SPOT);
    }

    const vehicleForSale: VehicleMp = mp.vehicles.new(playerVehicle.model, parkingSpot.position, {
        heading: parkingSpot.heading,
        locked: true,
        engine: false
    });

    player.vehicle.destroy();

    const vehiclePreview: VehiclePreview = {
        id: vehicleForSale.id,
        model: vehicleForSale.model,
        position: vehicleForSale.position,
        heading: vehicleForSale.heading,
        forSale: {
            price: vehiclePrice,
            owner: player.id
        },
    };

    player.position = getDriverExitPosition(vehiclePreview);

    vehicleForSale.setVariable(VehicleAutoMarket.ForSale, vehiclePreview.forSale);
    DatabaseCore.AutoMarket.addVehicleForSale(parkingSpotId, vehiclePreview);

    mp.markers.at((DatabaseCore.AutoMarket.getMarker(parkingSpot.centerMarkerId!))!.id).visible = false;
    mp.colshapes.at(player.getVariable(PlayerAutoMarket.ColshapeId)!).destroy();
    drawColshape("buy", parkingSpotId);

    player.outputChatBox(MessageAutoMarket.SALE_SET.replace("%", String(vehiclePrice)));
}
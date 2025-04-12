import {getDriverExitPosition} from "@/utils/getDriverExitPosition";

export function createVehicle(player: PlayerMp, fulltext: string): void {
    const vehicleNumber: number = mp.joaat(fulltext?.split(/\s+/)[0] || "sultan");
    const vehicle: VehicleMp = mp.vehicles.new(vehicleNumber, player.position);

    player.position = getDriverExitPosition(vehicle);
    vehicle.setVariable("owner", player.id);

    player.outputChatBox(`[VEH] Model: ${vehicle.model} | Owner: ${vehicle.getVariable("owner")}`);
}
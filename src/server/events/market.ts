import { Core } from "@/data/Core";
import { AutoMarket as PlayerAutoMarket } from "@/helpers/playerVariables";

mp.events.add("playerEnterColshape", (player: PlayerMp, colshape: ColshapeMp): void => {

	const parkingSpot: ParkingSpot = (Core.AutoMarket.getParkingSpots()).get(colshape.parkingSpotId)!;
	if (!parkingSpot) return;

	if (colshape.command === "sell") {
		const playerVehicle: VehicleMp = player.vehicle;

		if (!playerVehicle) {
			return player.outputChatBox(`[SERVER] You are not in the car`);
		}

		if (playerVehicle.getVariable("owner") !== player.id) {
			return player.outputChatBox(`[SERVER] You are not owner of this car`);
		}

		if (parkingSpot.occupied) {
			return player.outputChatBox(`[SERVER] The parking spot occupied`);
		}

		player.setVariable(PlayerAutoMarket.ParkingSpotId, parkingSpot.id);
		player.setVariable(PlayerAutoMarket.ColshapeId, colshape.id);
		player.outputChatBox("[TIPS] Type command for sell your vehicle: /sell [price]");
	} else if (colshape.command === "buy") {
		if (!parkingSpot.occupied || !parkingSpot.vehiclePreviewId) return;
		player.setVariable(PlayerAutoMarket.ParkingSpotId, parkingSpot.id);
		player.setVariable(PlayerAutoMarket.ColshapeId, colshape.id);
		player.outputChatBox("[TIPS] Type command for buy the vehicle: /buy");
	}
});

mp.events.add("playerExitColshape", (player: PlayerMp, colshape: ColshapeMp): void => {
	if (["buy", "sell"].includes(colshape.command)) {
		player.setVariable(PlayerAutoMarket.ParkingSpotId, null);
		player.setVariable(PlayerAutoMarket.ColshapeId, null);
	}
});
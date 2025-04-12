import {Core as DatabaseCore} from "@/data/Core";
import {AutoMarket as MessageAutoMarket, Balance as MessageBalance} from "@/helpers/messages";
import {AutoMarket as PlayerAutoMarket, Default as PlayerDefault} from "@/helpers/playerVariables";
import {AutoMarket as VehicleAutoMarket, Default as VehicleDefault} from "@/helpers/vehicleVariables";
import {drawColshape} from "./drawColshape";
import {updateMarkers} from "@/commands/auto_market/updateMarkers";

export function buyVehicle(player: PlayerMp): void {
    const colshapeId: number | null = player.getVariable(PlayerAutoMarket.ColshapeId)!;
    const parkingSpotId: number | null = player.getVariable(PlayerAutoMarket.ParkingSpotId)!;
    if (parkingSpotId === null || colshapeId === null) return;

    const parkingSpot: ParkingSpot = DatabaseCore.AutoMarket.getParkingSpot(parkingSpotId)!;
    if (!parkingSpot.occupied || !parkingSpot.vehiclePreviewId) return;

    const vehiclePreview: VehiclePreview = DatabaseCore.AutoMarket.getVehicle(parkingSpot.vehiclePreviewId)!;
    const vehiclePrice: number = vehiclePreview.forSale.price;
    const vehicleSeller: PlayerMp = mp.players.at(vehiclePreview.forSale.owner)!;
    const playerBalance: number = player.getVariable(PlayerDefault.Balance)!;
    const playerBalanceAfter: number = playerBalance - vehiclePrice;

    if (vehiclePrice > playerBalance)
        return player.outputChatBox(MessageBalance.MORE_MONEY);

    player.setVariable(PlayerDefault.Balance, playerBalanceAfter);
    vehicleSeller.setVariable(PlayerDefault.Balance, vehicleSeller.getVariable(PlayerDefault.Balance) + vehiclePrice);

    mp.vehicles.forEach((v: VehicleMp) => {
        if (v.position.subtract(vehiclePreview.position).length() <= 2) {
            v.setVariable(VehicleDefault.Owner, player.id);
            v.setVariable(VehicleAutoMarket.ForSale, null);
            v.engine = true;

            console.log("v:", v);

            player.putIntoVehicle(v, 0);
        }
    });

    DatabaseCore.AutoMarket.removeVehicleFromSale(parkingSpotId);
    setTimeout(() => {
        drawColshape("sell", parkingSpotId);
        updateMarkers();
    }, 5000);

    player.outputChatBox(MessageAutoMarket.SALE_BOUGHT.replace("%", String(vehiclePreview.id)));
    player.outputChatBox(MessageBalance.WALLET.replace("%", String(playerBalanceAfter)));
}
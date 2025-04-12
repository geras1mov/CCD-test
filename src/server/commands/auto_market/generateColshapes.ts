import {Core as DatabaseCore} from "@/data/Core";
import {AutoMarket as MessageAutoMarket} from "@/helpers/messages";
import {drawColshape} from "./drawColshape";

export function generateColshapes(): void {
    const parkingSpots: ParkingSpotMap = DatabaseCore.AutoMarket.getParkingSpots();
    const generatedColshapes: number[] = [];

    parkingSpots.forEach((parkingSpot: ParkingSpot, index: number): void => {
        drawColshape(parkingSpot.occupied ? "buy" : "sell", parkingSpot.id);
        generatedColshapes.push(index);
    });

    mp.players.broadcast(MessageAutoMarket.INFO.GENERATED_COLSHAPES.replace("%", generatedColshapes.join(" ")));
}
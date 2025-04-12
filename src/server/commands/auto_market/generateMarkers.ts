import {Core as DatabaseCore} from "@/data/Core";
import {AutoMarket as MessageAutoMarket} from "@/helpers/messages";

export function generateMarkers(): void {
    // Получение информации о парковочных местах на рынке
    const parkingSpots: ParkingSpotMap = DatabaseCore.AutoMarket.getParkingSpots();
    const generatedMarkers: MarkerExecute[] = []; // Сюда собирается информация о сгенерированных маркерах

    parkingSpots.forEach((parkingSpot: ParkingSpot): void => {
        const marker: MarkerMp = mp.markers.new(1, parkingSpot.position, 2);

        generatedMarkers.push({
            parkingSpotId: parkingSpot.id,
            marker: {
                id: marker.id,
                position: marker.position,
                visible: marker.visible,
                scale: marker.scale
            }
        });
    });

    if (generatedMarkers.length !== 0) {
        DatabaseCore.AutoMarket.updateMarkers(generatedMarkers); // Обновление данных о маркерах в контексте и JSON-файле
        mp.players.broadcast(
            MessageAutoMarket.INFO.GENERATED_MARKERS
                .replace("%", generatedMarkers.map(me => me.marker.id).join(" "))
        );
    }
}
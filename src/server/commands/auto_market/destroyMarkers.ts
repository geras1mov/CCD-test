import {AutoMarket as MessageAutoMarket} from "@/helpers/messages";
import {Core as DatabaseCore} from "@/data/Core";

export function destroyMarkers(_player: PlayerMp, fulltext: string): void {
    const destroyedMarkers: number[] = []; // Массив с ID уничтоженных маркеров
    let message: string;

    if (fulltext) {
        const markerId: number = +fulltext.split(/\s+/)[0];
        const marker: MarkerMp = mp.markers.at(markerId);
        const isMarkerExists: boolean = marker && mp.markers.exists(marker);

        if (isMarkerExists) {
            destroyedMarkers.push(marker.id);
            marker.destroy();
        }

        message = (isMarkerExists
            ? MessageAutoMarket.INFO.DESTROYED_MARKER
            : MessageAutoMarket.INFO.NO_EXISTS_MARKER)
            .replace("%", String(markerId));
    } else {
        const markers: MarkerMap = DatabaseCore.AutoMarket.getMarkers();

        markers.forEach((m: Marker): void => {
            const marker: MarkerMp = mp.markers.at(m.id);

            if (mp.markers.exists(marker)) {
                destroyedMarkers.push(marker.id);
                marker.destroy();
            }
        });

        message = destroyedMarkers.length !== 0
            ? MessageAutoMarket.INFO.DESTROYED_MARKERS.replace("%", destroyedMarkers.join(" "))
            : MessageAutoMarket.INFO.NO_MARKERS;
    }

    DatabaseCore.AutoMarket.removeMarkers(destroyedMarkers); // Удаление данных о маркерах из контекста и изменение в JSON-файле
    mp.players.broadcast(message);
}
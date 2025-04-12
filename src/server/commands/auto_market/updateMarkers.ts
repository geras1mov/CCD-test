import {Core as DatabaseCore} from "@/data/Core";
import {AutoMarket as MessageAutoMarket} from "@/helpers/messages";

export function updateMarkers(): void {
    const markers: MarkerMap = DatabaseCore.AutoMarket.getMarkers();
    const updatedMarkers: number[] = [];
    const generatedMarkers: number[] = [];

    markers.forEach((m: Marker): void => {
        let marker: MarkerMp = mp.markers.at(m.id);

        if (marker && mp.markers.exists(marker)) {
            marker.position = m.position;
            marker.visible = m.visible;
            marker.scale = m.scale;
            updatedMarkers.push(m.id);
        } else {
            marker = mp.markers.new(0, m.position, m.scale, {
                visible: m.visible
            });
            generatedMarkers.push(marker.id);
        }
    });

    if (updatedMarkers.length !== 0)
        mp.players.broadcast(MessageAutoMarket.INFO.UPDATED_MARKERS.replace("%", updatedMarkers.join(" ")));

    if (generatedMarkers.length !== 0)
        mp.players.broadcast(MessageAutoMarket.INFO.GENERATED_MARKERS.replace("%", generatedMarkers.join(" ")));
}
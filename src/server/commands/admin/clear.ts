export function clear(): void {
    const destroyedMarkers: number[] = [];
    const destroyedColshapes: number[] = [];
    const destroyedVehicles: number[] = [];

    mp.markers.forEach((marker: MarkerMp): void => {
        destroyedMarkers.push(marker.id);
        marker.destroy();
    });

    mp.colshapes.forEach((colshape: ColshapeMp): void => {
        destroyedColshapes.push(colshape.id);
        colshape.destroy();
    });

    mp.vehicles.forEach((vehicle: VehicleMp): void => {
        destroyedVehicles.push(vehicle.id);
        vehicle.destroy();
    });

    mp.players.broadcast(`Destroyed markers #: ${destroyedMarkers.join(", ")}`);
    mp.players.broadcast(`Destroyed colshapes #: ${destroyedColshapes.join(", ")}`);
    mp.players.broadcast(`Destroyed vehicles #: ${destroyedVehicles.join(", ")}`);
}
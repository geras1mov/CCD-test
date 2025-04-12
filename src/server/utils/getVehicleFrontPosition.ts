export function getVehicleFrontPosition(vehiclePreview: VehiclePreview, distance: number = 3): Vector3 {
    const radians: number = vehiclePreview.heading * (Math.PI / 180);
    const offsetX: number = distance * Math.sin(radians) * -1;
    const offsetY: number = distance * Math.cos(radians);

    return new mp.Vector3(
        vehiclePreview.position.x + offsetX,
        vehiclePreview.position.y + offsetY,
        vehiclePreview.position.z
    );
}
export function getDriverExitPosition(vehicle: VehicleMp | VehiclePreview): Vector3 {
	const radians: number = (vehicle.heading + 90) * (Math.PI / 180);
	const offsetX: number = 1.2 * Math.cos(radians) * -1;
	const offsetY: number = 1.2 * Math.sin(radians);

	return new mp.Vector3(
		vehicle.position.x + offsetX,
		vehicle.position.y + offsetY,
		vehicle.position.z + 1
	);
}

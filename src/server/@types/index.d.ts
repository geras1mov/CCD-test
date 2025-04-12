declare global {
	interface ColshapeMp {
		command: ColshapeCommand;
		parkingSpotId: number;
	}

	type ParkingSpotMap = Map<number, ParkingSpot>;
	type VehiclePreviewMap = Map<number, VehiclePreview>;
	type MarkerMap = Map<number, Marker>;

	type ParkingSpot = {
		id: number;
		position: Vector3;
		heading: number;
		occupied: boolean;
		centerMarkerId?: number | null;
		frontMarkerId?: number | null;
		vehiclePreviewId?: number | null;
	};

	type VehiclePreview = {
		id: number;
		model: number;
		position: Vector3;
		heading: number;
		forSale: {
			price: number;
			owner: number;
		},
		parkingSpotId?: number | null;
	};

	type Marker = {
		id: number;
		position: Vector3;
		visible: boolean;
		scale: number;
	};

	type MarkerExecute = {
		parkingSpotId?: number;
		marker: Marker;
	};

	type ColshapeCommand = "sell" | "buy";
}

export {};

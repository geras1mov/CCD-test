import "./market";
import { SHARED_CONSTANTS } from '@shared/constants';

mp.events.add('playerJoin', (player) => {
	player.spawn(new mp.Vector3(SHARED_CONSTANTS.playerSpawnPoint));
});

mp.events.add('playerReady', (player) => {
	console.log(`${player.name} is ready!`);
});

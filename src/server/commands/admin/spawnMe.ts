import {SHARED_CONSTANTS} from "@shared/constants";

export function spawnMe(player: PlayerMp): void {
    player.spawn(new mp.Vector3(SHARED_CONSTANTS.playerSpawnPoint));
}
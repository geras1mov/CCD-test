export function getPlayerPosition(player: PlayerMp): void {
    const message: string = `Position of ${player.name} is ${player.position}`;
    player.outputChatBox(message);
    console.log(message)
}
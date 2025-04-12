export function setArmour(player: PlayerMp, fullText: string): void {
    const armour: number = parseInt(fullText?.split(/\s+/)[0]) || 100;
    player.armour = armour;
    player.outputChatBox(`[AP] ${player.name}: ${armour}`);
}
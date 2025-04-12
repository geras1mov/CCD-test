export function setHealth(player: PlayerMp, fullText: string): void {
    const hp: number = parseInt(fullText?.split(/\s+/)[0]) || 100;
    player.health = hp;
    player.outputChatBox(`[HP] ${player.name}: ${hp}`);
}
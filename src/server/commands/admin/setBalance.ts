import {Default as PlayerDefault} from "@/helpers/playerVariables";

export function setBalance(player: PlayerMp, fulltext: string): void {
    const balance: number = parseInt(fulltext?.split(/\s+/)[0]) || 100;
    player.setVariable(PlayerDefault.Balance, balance);
    player.outputChatBox(`[SERVER] Your balance: ${balance}`);
}
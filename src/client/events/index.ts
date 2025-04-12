mp.events.add('playerReady', () => {
	mp.console.logInfo(`${mp.players.local.name} is ready!`);
});

mp.events.add("playerChat", (text: string) => {
	mp.gui.chat.push(text);
});

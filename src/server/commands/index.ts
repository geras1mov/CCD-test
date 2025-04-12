import * as Admin from "./admin";
import * as AutoMarket from "./auto_market";

// admin commands
mp.events.addCommand("armour", Admin.setArmour);
mp.events.addCommand("hp", Admin.setHealth);
mp.events.addCommand("position", Admin.getPlayerPosition);
mp.events.addCommand("veh", Admin.createVehicle);
mp.events.addCommand("spawn", Admin.spawnMe);
mp.events.addCommand("clear", Admin.clear);
mp.events.addCommand("set-balance", Admin.setBalance);

// auto market commands
mp.events.addCommand("m-gen", AutoMarket.generateMarkers);
mp.events.addCommand("m-des", AutoMarket.destroyMarkers);
mp.events.addCommand("m-upd", AutoMarket.updateMarkers);
mp.events.addCommand("m", AutoMarket.loadMarket);
mp.events.addCommand("sell", AutoMarket.sellVehicle);
mp.events.addCommand("buy", AutoMarket.buyVehicle);

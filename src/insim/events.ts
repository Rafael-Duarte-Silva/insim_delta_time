import { inSim } from "insim";
import { PacketType } from "node-insim/packets";
import {
    onCheckpoint,
    onLapFinish,
    onPlayerJoin,
    onPlayerLeave,
    onPlayerPit,
    onRaceStart,
    onVersion,
} from "../handlers";

export function events() {
    inSim.on(PacketType.ISP_VER, onVersion);
    inSim.on(PacketType.ISP_NPL, onPlayerJoin);
    inSim.on(PacketType.ISP_PLL, onPlayerLeave);
    inSim.on(PacketType.ISP_PLP, onPlayerPit);
    inSim.on(PacketType.ISP_RST, onRaceStart);
    inSim.on(PacketType.ISP_LAP, onLapFinish);
    inSim.on(PacketType.ISP_UCO, onCheckpoint);
}

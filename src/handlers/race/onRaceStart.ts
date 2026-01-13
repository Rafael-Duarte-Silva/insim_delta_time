import { inSim } from "insim";
import { InSimPacketInstance, PacketType } from "node-insim/packets";

export function onRaceStart(packet: InSimPacketInstance<PacketType.ISP_RST>) {
    inSim.sendLocalMessage(`${packet.NumNodes}, ${packet.Track}`);
}

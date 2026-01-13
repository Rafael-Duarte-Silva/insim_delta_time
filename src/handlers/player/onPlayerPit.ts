import { playerService } from "modules/player/player.service";
import { InSimPacketInstance, PacketType } from "node-insim/packets";

export function onPlayerPit(packet: InSimPacketInstance<PacketType.ISP_PLP>) {
    playerService.reset(packet.PLID);
}

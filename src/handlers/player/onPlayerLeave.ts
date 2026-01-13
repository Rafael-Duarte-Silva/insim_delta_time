import { playerService } from "modules/player/player.service";
import { InSimPacketInstance, PacketType } from "node-insim/packets";

export function onPlayerLeave(packet: InSimPacketInstance<PacketType.ISP_PLL>) {
    playerService.delete(packet.PLID);
}

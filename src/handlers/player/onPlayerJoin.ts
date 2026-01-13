import { playerService } from "modules/player/player.service";
import { InSimPacketInstance, PacketType } from "node-insim/packets";

export function onPlayerJoin(packet: InSimPacketInstance<PacketType.ISP_NPL>) {
    if (playerService.get(packet.PLID)) return;

    playerService.create(packet);
}

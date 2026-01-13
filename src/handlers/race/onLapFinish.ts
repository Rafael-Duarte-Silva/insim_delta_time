import { playerService } from "modules/player/player.service";
import { InSimPacketInstance, PacketType } from "node-insim/packets";

export function onLapFinish(packet: InSimPacketInstance<PacketType.ISP_LAP>) {
    playerService.updateLap(packet);
}

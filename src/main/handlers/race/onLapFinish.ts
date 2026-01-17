import { InSimPacketInstance, PacketType } from "node-insim/packets";
import { playerService } from "../../modules/player/player.service";

export function onLapFinish(packet: InSimPacketInstance<PacketType.ISP_LAP>): void {
  playerService.updateLap(packet);
}

import { InSimPacketInstance, PacketType } from "node-insim/packets";
import { playerService } from "../../modules/player/player.service";

export function onPlayerJoin(packet: InSimPacketInstance<PacketType.ISP_NPL>): void {
  playerService.create(packet);
}

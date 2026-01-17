import { InSimPacketInstance, PacketType } from "node-insim/packets";
import { playerService } from "../../modules/player/player.service";

export function onPlayerLeave(packet: InSimPacketInstance<PacketType.ISP_PLL>): void {
  playerService.delete(packet.PLID);
}

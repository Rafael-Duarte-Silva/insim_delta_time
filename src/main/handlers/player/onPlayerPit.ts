import { InSimPacketInstance, PacketType } from "node-insim/packets";
import { playerService } from "../../modules/player/player.service";

export function onPlayerPit(packet: InSimPacketInstance<PacketType.ISP_PLP>): void {
  playerService.reset(packet.PLID);
}

import { InSimPacketInstance, PacketType } from "node-insim/packets";
import { inSim } from "../../insim";
import { playerService } from "../../modules/player/player.service";

export function onRaceStart(packet: InSimPacketInstance<PacketType.ISP_RST>): void {
  inSim.sendLocalMessage(`${packet.NumNodes}, ${packet.Track}`);

  playerService.resetAll();
}

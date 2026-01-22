import { InSimPacketInstance, PacketType } from "node-insim/packets";
import { inSim } from "../../insim";
import { playerService } from "../../modules/player/player.service";
import { raceService } from "../../modules/race/race.service";

export function onRaceStart(packet: InSimPacketInstance<PacketType.ISP_RST>): void {
  inSim.sendLocalMessage(`${packet.Track}`);

  playerService.resetAll();
  raceService.generateLyt(packet.Track);
}

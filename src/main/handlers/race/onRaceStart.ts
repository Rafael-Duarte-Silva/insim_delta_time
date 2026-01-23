import { InSimPacketInstance, PacketType } from "node-insim/packets";
import { inSim } from "../../insim";
import { raceService } from "../../modules/race/race.service";

export function onRaceStart(packet: InSimPacketInstance<PacketType.ISP_RST>): void {
  inSim.sendLocalMessage(`${packet.Track}`);

  raceService.start(packet.Track);
}

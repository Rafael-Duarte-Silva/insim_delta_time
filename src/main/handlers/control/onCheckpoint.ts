import { InSimPacketInstance, PacketType, UCOAction } from "node-insim/packets";
import { playerService } from "../../modules/player/player.service";

export function onCheckpoint(packet: InSimPacketInstance<PacketType.ISP_UCO>): void {
  switch (packet.Info.Index) {
    case 252:
      if (packet.UCOAction === UCOAction.UCO_CP_FWD) {
        playerService.updateTime(packet);
        return;
      }
      break;
  }
}

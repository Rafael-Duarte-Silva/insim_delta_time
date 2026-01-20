import { InSimPacketInstance, PacketType } from "node-insim/packets";
import { connectionService } from "../../modules/connection/connection.service";

export function onNewConnection(packet: InSimPacketInstance<PacketType.ISP_NCN>): void {
  connectionService.create(packet);
}

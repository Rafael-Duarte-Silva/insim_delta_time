import { InSimPacketInstance, PacketType } from "node-insim/packets";

export function onVersion(packet: InSimPacketInstance<PacketType.ISP_VER>): void {
  console.log(`Connected to LFS ${packet.Product} ${packet.Version}`);
}

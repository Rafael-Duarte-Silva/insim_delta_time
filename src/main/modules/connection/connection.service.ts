import { InSimPacketInstance, PacketType } from "node-insim/packets";
import { Connection } from "./connection.entity";

const connectionList: Map<number, Connection> = new Map();

class ConnectionService {
  public create(packet: InSimPacketInstance<PacketType.ISP_NCN>): void {
    const connection = new Connection(packet.UCID);
    connectionList.set(packet.UCID, connection);
  }

  public get(PLID: number): Connection | undefined {
    return connectionList.get(PLID);
  }

  public delete(PLID: number): void {
    connectionList.delete(PLID);
  }
}

export const connectionService = new ConnectionService();

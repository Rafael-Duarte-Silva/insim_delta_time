import { InSimPacketInstance, PacketType } from "node-insim/packets";
import { Connection } from "./connection.entity";

const connectionList: Map<number, Connection> = new Map();

class ConnectionService {
  public create(packet: InSimPacketInstance<PacketType.ISP_NCN>): void {
    const connection = new Connection(packet.UCID);
    connectionList.set(packet.UCID, connection);
  }

  public get(UCID: number): Connection | undefined {
    return connectionList.get(UCID);
  }

  public delete(UCID: number): void {
    connectionList.delete(UCID);
  }

  public resetAll(): void {
    connectionList.forEach((connection) => {
      connection.reset();
    });
  }
}

export const connectionService = new ConnectionService();

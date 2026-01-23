import { InSimPacketInstance, PacketType } from "node-insim/packets";
import { Player } from "./player.entity";
import { mainWindow } from "../..";
import { connectionService } from "../connection/connection.service";

const playerList: Map<number, Player> = new Map();

class PlayerService {
  public create(packet: InSimPacketInstance<PacketType.ISP_NPL>): void {
    const connection = connectionService.get(packet.UCID);
    if (connection === undefined) return;

    connection.handleReset(packet.CName);

    if (this.get(packet.PLID)) return;

    const IA_TYPE = 2;
    const player = new Player(packet.PLID, packet.PType === IA_TYPE, connection, packet.CName);
    playerList.set(packet.PLID, player);
  }

  public get(PLID: number): Player | undefined {
    return playerList.get(PLID);
  }

  public delete(PLID: number): void {
    playerList.delete(PLID);
  }

  private hash(a: number, b: number): string {
    return `${a}${b}`;
  }

  public updateTime(packet: InSimPacketInstance<PacketType.ISP_UCO>): void {
    const player = this.get(packet.PLID);
    if (player === undefined || player.lapsDone < 1) return;

    const key = this.hash(packet.Info.X, packet.Info.Y);
    const checkpointTime = packet.Time - 3000 - player.startLapTime;
    const bestLapCheckPointTime = player.connection.bestLapCheckpoints.get(key) || 0;
    const deltaTime = checkpointTime - bestLapCheckPointTime;

    player.currentLapCheckpoints.set(key, checkpointTime);

    if (player.connection.UCID !== 0) return;
    mainWindow.webContents.send("delta_time", deltaTime);
  }

  public updateLap(packet: InSimPacketInstance<PacketType.ISP_LAP>): void {
    const player = this.get(packet.PLID);
    if (player === undefined) return;

    player.lapsDone = packet.LapsDone;
    player.startLapTime = packet.ETime;
    player.currentLapTime = packet.LTime;

    if (
      player.connection.bestLapTime > 0 &&
      player.currentLapTime > player.connection.bestLapTime
    ) {
      return;
    }

    player.connection.bestLapTime = player.currentLapTime;
    player.connection.bestLapCheckpoints = new Map(player.currentLapCheckpoints);
  }
}

export const playerService = new PlayerService();

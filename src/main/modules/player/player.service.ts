import { InSimPacketInstance, PacketType } from "node-insim/packets";
import { Player } from "./player.entity";
import { mainWindow } from "../..";

const playerList: Map<number, Player> = new Map();

class PlayerService {
  public create(packet: InSimPacketInstance<PacketType.ISP_NPL>): void {
    const IA_TYPE = 2;
    const player = new Player(packet.UCID, packet.PLID, packet.PType === IA_TYPE);
    playerList.set(packet.PLID, player);

    //this.drawDeltaButton(player, "^80");
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
    const bestLapCheckPointTime = player.bestLapCheckpoints.get(key) || 0;
    const deltaTime = checkpointTime - bestLapCheckPointTime;

    player.currentLapCheckpoints.set(key, checkpointTime);
    mainWindow.webContents.send("delta_time", deltaTime);
  }

  public updateLap(packet: InSimPacketInstance<PacketType.ISP_LAP>): void {
    const player = this.get(packet.PLID);
    if (player === undefined) return;

    player.lapsDone = packet.LapsDone;
    player.startLapTime = packet.ETime;
    player.currentLapTime = packet.LTime;

    if (player.bestLapTime > 0 && player.currentLapTime > player.bestLapTime) {
      return;
    }

    player.bestLapTime = player.currentLapTime;
    player.bestLapCheckpoints = new Map(player.currentLapCheckpoints);
  }

  public reset(PLID: number): void {
    const player = this.get(PLID);
    if (player === undefined) return;

    player.lapsDone = 0;
    player.startLapTime = 0;
    player.currentLapTime = 0;
    player.currentLapCheckpoints = new Map();
  }
}

export const playerService = new PlayerService();

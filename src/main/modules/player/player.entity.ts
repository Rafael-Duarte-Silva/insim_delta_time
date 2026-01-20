import { Connection } from "../connection/connection.entity";

export class Player {
  public readonly PLID: number;
  public isIA: boolean;
  public connection: Connection;

  public startLapTime = 0;
  public lapsDone = 0;
  public currentLapCheckpoints: Map<string, number> = new Map();
  public currentLapTime = 0;

  constructor(PLID: number, isIA: boolean, connection: Connection) {
    this.PLID = PLID;
    this.isIA = isIA;
    this.connection = connection;
  }

  public reset(): void {
    this.lapsDone = 0;
    this.startLapTime = 0;
    this.currentLapTime = 0;
    this.currentLapCheckpoints = new Map();
  }
}

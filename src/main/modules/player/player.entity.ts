import { Connection } from "../connection/connection.entity";

export class Player {
  public readonly PLID: number;
  public isIA: boolean;
  public connection: Connection;

  public startLapTime = 0;
  public lapsDone = 0;
  public currentLapCheckpoints: Map<string, number> = new Map();
  public currentLapTime = 0;

  constructor(PLID: number, isIA: boolean, connection: Connection, carName: string) {
    this.PLID = PLID;
    this.isIA = isIA;
    this.connection = connection;
    this.connection.carName = carName;
  }
}

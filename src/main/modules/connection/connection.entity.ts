export class Connection {
  public readonly UCID: number;

  public bestLapCheckpoints: Map<string, number> = new Map();
  public bestLapTime = 0;

  constructor(UCID: number) {
    this.UCID = UCID;
  }
}

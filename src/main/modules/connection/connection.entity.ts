export class Connection {
  public readonly UCID: number;

  public carName: string = "";
  public bestLapCheckpoints: Map<string, number> = new Map();
  public bestLapTime = 0;

  constructor(UCID: number) {
    this.UCID = UCID;
  }

  public handleReset(carName: string): void {
    if (carName === this.carName) return;

    this.reset();
  }

  public reset(): void {
    this.bestLapCheckpoints = new Map();
    this.bestLapTime = 0;
  }
}

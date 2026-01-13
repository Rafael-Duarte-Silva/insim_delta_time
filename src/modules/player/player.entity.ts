export class Player {
    public readonly UCID: number;
    public readonly PLID: number;
    public isAI: boolean;

    public readonly totalNodes = 180;
    public startLapTime = 0;
    public lapsDone = 0;
    public bestLapCheckpoints: Map<string, number> = new Map();
    public bestLapTime = 0;
    public currentLapCheckpoints: Map<string, number> = new Map();
    public currentLapTime = 0;

    constructor(UCID: number, PLID: number, isAI: boolean) {
        this.UCID = UCID;
        this.PLID = PLID;
        this.isAI = isAI;
    }
}

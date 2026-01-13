import {
    ButtonStyle,
    ButtonTextColour,
    InSimPacketInstance,
    IS_BTN,
    PacketType,
} from "node-insim/packets";
import { Player } from "./player.entity";
import { inSim } from "insim";
import { Buttons } from "modules/button/button.constants";

const playerList: Map<number, Player> = new Map();

class PlayerService {
    public create(packet: InSimPacketInstance<PacketType.ISP_NPL>) {
        const IA_TYPE = 2;
        const player = new Player(
            packet.UCID,
            packet.PLID,
            packet.PType === IA_TYPE,
        );
        playerList.set(packet.PLID, player);

        this.drawDeltaButton(player, "^80");
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
        const deltaTime = (checkpointTime - bestLapCheckPointTime) / 1000;

        player.currentLapCheckpoints.set(key, checkpointTime);
        this.drawDeltaButton(
            player,
            `${deltaTime < 0 ? "^8" : "^1+"}${deltaTime.toFixed(2)}`,
        );
    }

    public updateLap(packet: InSimPacketInstance<PacketType.ISP_LAP>) {
        const player = this.get(packet.PLID);
        if (player === undefined) return;

        player.lapsDone = packet.LapsDone;
        player.startLapTime = packet.ETime;
        player.currentLapTime = packet.LTime;

        if (
            player.bestLapTime > 0 &&
            player.currentLapTime > player.bestLapTime
        ) {
            return;
        }

        player.bestLapTime = player.currentLapTime;
        player.bestLapCheckpoints = new Map(player.currentLapCheckpoints);
    }

    public reset(PLID: number) {
        const player = this.get(PLID);
        if (player === undefined) return;

        player.lapsDone = 0;
        player.startLapTime = 0;
        player.currentLapTime = 0;
        player.currentLapCheckpoints = new Map();
    }

    public drawDeltaButton(player: Player, Text: string) {
        inSim.send(
            new IS_BTN({
                ReqI: 1,
                UCID: player.UCID,
                ClickID: Buttons.DELTA_TIME,
                BStyle: ButtonStyle.ISB_DARK | ButtonTextColour.OK,
                L: 92,
                T: 30,
                W: 16,
                H: 10,
                Text: Text,
            }),
        );
    }
}

export const playerService = new PlayerService();

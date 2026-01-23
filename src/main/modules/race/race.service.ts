import { convertPTHtoLYT } from "pth_to_lyt";
import { config } from "../..";
import { Race } from "./race.entity";
import { connectionService } from "../connection/connection.service";

const race: Race = new Race();

class RaceService {
  public start(trackPrefix: string): void {
    if (this.isSameTrack(trackPrefix)) return;

    race.trackName = trackPrefix;
    connectionService.resetAll();
    this.generateLyt(trackPrefix);
  }

  private isSameTrack(trackPrefix: string): boolean {
    if (trackPrefix !== race.trackName) return false;
    return true;
  }

  private generateLyt(trackPrefix: string): void {
    if (trackPrefix.endsWith("X")) return;

    convertPTHtoLYT(config.pthPath, config.lytPath, trackPrefix, config.lytName);
  }
}

export const raceService = new RaceService();

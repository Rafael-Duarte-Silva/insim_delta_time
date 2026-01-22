import { convertPTHtoLYT } from "pth_to_lyt";
import { config } from "../..";

class RaceService {
  public generateLyt(trackPrefix: string): void {
    if (trackPrefix.endsWith("X")) return;

    convertPTHtoLYT(config.pthPath, config.lytPath, trackPrefix, config.lytName);
  }
}

export const raceService = new RaceService();

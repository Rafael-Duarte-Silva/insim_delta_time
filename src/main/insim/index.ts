import { InSim } from "node-insim";
import { IS_ISI_ReqI, IS_TINY, TinyType } from "node-insim/packets";
import { ADMIN, HOST, PORT } from "./config";
import { events } from "./events";

export const inSim = new InSim();

export function connectInsim(): void {
  inSim.connect({
    IName: "Insim deltaTime",
    Host: HOST,
    Port: PORT,
    Admin: ADMIN,
    ReqI: IS_ISI_ReqI.SEND_VERSION,
    Interval: 100
  });

  inSim.on("connect", () => {
    console.log("Connected");

    //Request that all players be able to use delta time after already being in a race.
    inSim.send(new IS_TINY({ ReqI: 1, SubT: TinyType.TINY_NCN }));
    inSim.send(new IS_TINY({ ReqI: 1, SubT: TinyType.TINY_NPL }));
  });

  inSim.on("disconnect", () => {
    console.log("Disconnected");
  });

  process.on("uncaughtException", (error) => {
    console.log(error);
  });

  events();
}

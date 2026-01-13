import { InSim } from "node-insim";
import { IS_ISI_ReqI } from "node-insim/packets";
import { ADMIN, HOST, PORT } from "./config";
import { events } from "./events";

export const inSim = new InSim();

export function connectInsim() {
    inSim.connect({
        IName: "Insim deltaTime",
        Host: HOST,
        Port: PORT,
        Admin: ADMIN,
        ReqI: IS_ISI_ReqI.SEND_VERSION,
        Interval: 100,
    });

    inSim.on("connect", () => {
        console.log("Connected");
    });

    inSim.on("disconnect", () => {
        console.log("Disconnected");
    });

    process.on("uncaughtException", (error) => {
        console.log(error);
    });

    events();
}

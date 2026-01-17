import { ElectronAPI } from "@electron-toolkit/preload";

declare global {
  interface Window {
    electron: ElectronAPI;
    api: { onDeltaTime: (cb: (data: number) => void) => () => void };
  }
}

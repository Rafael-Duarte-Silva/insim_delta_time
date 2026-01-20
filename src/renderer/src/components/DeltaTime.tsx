import { clamp, normalize } from "../../../shared/utils/math";
import { ProgressBar } from "./ProgressBar";
import { useEffect, useState } from "react";

export const DeltaTime = (): React.JSX.Element => {
  const [deltaTime, setDeltaTime] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = window.api.onDeltaTime((data) => {
      setDeltaTime(data / 1000);
    });

    return unsubscribe;
  }, []);

  const deltaTimeScala = clamp(Math.abs(deltaTime), 0, 2);
  const deltaTimeNormalize = normalize(deltaTimeScala, 0, 2);

  return (
    <div className="absolute top-40">
      <div className="flex flex-row bg-[#0000004b] rounded-md overflow-hidden">
        <ProgressBar normalize={deltaTime < 0 ? deltaTimeNormalize : 0} />
        <ProgressBar normalize={deltaTime > 0 ? deltaTimeNormalize : 0} right />
      </div>

      <p
        className={`${deltaTime < 0 ? "text-green-500" : "text-red-500"} text-center text-3xl font-bold`}
      >
        {`${deltaTime < 0 ? "" : "+"}${deltaTime.toFixed(2)}`}
      </p>
    </div>
  );
};

type ProgressBarPros = {
  normalize: number;
  right?: boolean;
};

export const ProgressBar = ({ normalize, right = false }: ProgressBarPros): React.JSX.Element => {
  return (
    <div className="w-50 h-8 relative">
      <div
        className={`h-full absolute ${right ? "left-0 bg-red-500" : "right-0 bg-green-500"} top-0`}
        style={{ width: `${normalize * 100}%` }}
      ></div>
    </div>
  );
};

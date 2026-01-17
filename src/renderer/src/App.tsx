import { useEffect, useState } from "react";

function App(): React.JSX.Element {
  const [deltaTime, setDeltaTime] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = window.api.onDeltaTime((data) => {
      setDeltaTime(data);
    });

    return unsubscribe;
  }, []);

  return <div>{deltaTime.toFixed(2)}</div>;
}

export default App;

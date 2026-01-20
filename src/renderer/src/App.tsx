import "./App.css";
import { DeltaTime } from "./components/DeltaTime";

function App(): React.JSX.Element {
  return (
    <div className=" w-screen h-screen relative flex justify-center">
      <DeltaTime />
    </div>
  );
}

export default App;

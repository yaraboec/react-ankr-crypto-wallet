import Card from "components/card/card";
import Converter from "components/converter/converter";
import Balances from "components/balances/balances";
import { useAppSelector } from "hooks/state";

import "./App.scss";

function App() {
  const balances = useAppSelector((state) => state.balances.balances);

  return (
    <div className="App">
      <Card header="Tokens Converter">
        <Converter />
      </Card>
      <Card header="Balances" hidden={!balances.length}>
        <Balances />
      </Card>
    </div>
  );
}

export default App;

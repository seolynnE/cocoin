import { HashRouter as MyRouter, Routes, Route } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";
import Chart from "./routes/Chart";
import Price from "./routes/Price";
import Header from "./routes/Header";

function Router() {
  return (
    <MyRouter>
      <Header />
      <Routes>
        <Route path="/cocoin" element={<Coins />} />
        <Route path="/cocoin/:coinId/*" element={<Coin />}>
          <Route path="chart" element={<Chart />} />
          <Route path="price" element={<Price />} />
        </Route>
      </Routes>
    </MyRouter>
  );
}

export default Router;

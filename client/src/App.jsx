import { Route, Routes } from "react-router-dom";
import MainPage from "./Components/MainPage/MainPage";
import VolumeAnalysis from "./Routes/VolumeAnalysis";
import PriceTrends from "./Routes/PriceTrends";
import Comparisons from "./Routes/Comparisons";
import Insights from "./Routes/Insights";
import Settings from "./Components/MainPage/Settings";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/volume-analysis" element={<VolumeAnalysis />} />
        <Route path="/price-trends" element={<PriceTrends />} />
        <Route path="/comparisons" element={<Comparisons />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
}

export default App;

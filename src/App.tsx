import "./App.css";
import UserTable from "./pages/TablePage";
import MetaPageInfo from "./queries/temp";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<UserTable />} />
      <Route path="/facebook" element={<MetaPageInfo />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;

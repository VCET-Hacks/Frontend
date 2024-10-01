import "./App.css";
import UserForm from "./components/others/UserForm";
import ChartDashboard from "./pages/ChartDashboard";
import FBDashboard from "./pages/facebookProfile";
import HomePage from "./pages/HomePage";
import UserTable from "./pages/tablePage";
import MetaPageInfo from "./queries/temp";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user-table" element={<UserTable />} />
        <Route path="/user-form" element={<UserForm />} />
        <Route path="/user-chart-dashboard" element={<ChartDashboard />} />

        <Route path="/facebook-dashboard/:id" element={<FBDashboard />} />
        <Route path="/facebook" element={<MetaPageInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

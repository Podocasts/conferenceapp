import Dashboard from "./dashboard";
import { Route, Routes } from "react-router-dom";
import WrapApp from "./WrapApp";
import Billing from "./billing";

const Router = () => {
  return (
    <Routes>
      <Route index path="/" element={<WrapApp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/billing" element={<Billing />} />
    </Routes>
  );
};

export default Router;

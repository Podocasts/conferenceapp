import { Route, Routes } from "react-router-dom";
import WrapApp from "./WrapApp";
import DashboardContainer from "./Dashboard";
import BillingContainer from "./Billing";
import ScheduleContainer from "./Schedule";

const Router = () => {
  return (
    <Routes>
      <Route index path="/" element={<WrapApp />} />
      <Route path="/dashboard" element={<DashboardContainer />} />
      <Route path="/billing" element={<BillingContainer />} />
      <Route path="/schedule" element={<ScheduleContainer />} />
    </Routes>
  );
};

export default Router;

import { Route, Switch } from "react-router-dom";
import Sidebar from "./components/common/Sidebar";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import PatientsPage from "./pages/PatientsPage";
import RecordsPage from "./pages/RecordsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";

function App() {
    return (
       <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
            <Sidebar />
            <div className="flex-1">
            <Switch>
                <Route path='/' element={<HomePage />} />
                <Route path='/records' element={<RecordsPage />} />
                <Route path='/patients' element={<PatientsPage />} />
                <Route path='/dashboard' element={<DashboardPage />} />
                <Route path='/analytics' element={<AnalyticsPage />} />
                <Route path='/settings' element={<SettingsPage />} />
            </Switch>
        </div>
        </div>
    );
}

export default App;

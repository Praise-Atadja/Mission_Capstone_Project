
import { Link } from "react-router-dom";

const QuickLinks = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Link to="/ecg-records" className="bg-gray-800 p-6 rounded-lg flex flex-col items-center">
                <img src="/images/ecg-icon.png" alt="ECG Records" className="mb-4 w-16 h-16" />
                <h2 className="text-xl font-semibold">ECG Records</h2>
            </Link>

            <Link to="/patient-records" className="bg-gray-800 p-6 rounded-lg flex flex-col items-center">
                <img src="/images/patient-icon.png" alt="Patient Records" className="mb-4 w-16 h-16" />
                <h2 className="text-xl font-semibold">Patient Records</h2>
            </Link>

            <Link to="/referrals" className="bg-gray-800 p-6 rounded-lg flex flex-col items-center">
                <img src="/images/referral-icon.png" alt="Referrals" className="mb-4 w-16 h-16" />
                <h2 className="text-xl font-semibold">Referrals</h2>
            </Link>

            <Link to="/health-centers" className="bg-gray-800 p-6 rounded-lg flex flex-col items-center">
                <img src="/images/health-center-icon.png" alt="Health Centers" className="mb-4 w-16 h-16" />
                <h2 className="text-xl font-semibold">Health Centers</h2>
            </Link>
        </div>
    );
};

export default QuickLinks;

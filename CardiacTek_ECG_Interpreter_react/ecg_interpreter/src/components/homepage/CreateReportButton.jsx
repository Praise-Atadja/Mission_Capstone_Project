
import { Link } from "react-router-dom";

const CreateReportButton = () => {
    return (
        <footer className="mt-auto">
            <Link to="/create-new-report" className="bg-purple-600 p-4 rounded-lg text-center text-lg font-semibold text-white">
                CREATE NEW REPORT
            </Link>
        </footer>
    );
};

export default CreateReportButton;

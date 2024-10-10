import WelcomeMessage from "../components/homepage/WelcomeMessage"; // Ensure this path is correct
import SearchBar from "../components/homepage/SearchBar"; // Ensure this path is correct
import QuickLinks from "../components/homepage/QuickLinks"; // Ensure this path is correct
import RecentReports from "../components/homepage/RecentReports"; // Ensure this path is correct
import CreateReportButton from "../components/homepage/CreateReportButton"; // Ensure this path is correct

const HomePage = () => {
    return (
        <div className="flex flex-col h-screen p-6 bg-gray-900 text-gray-100">
            <WelcomeMessage />
            <SearchBar />
            <QuickLinks />
            <RecentReports />
            <CreateReportButton />
        </div>
    );
};

export default HomePage;


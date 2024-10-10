import { HeartPulse, FileMedical, UserPlus, Activity } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import EcgTrendsChart from "../components/dashboard/EcgTrendsChart";
import PatientDistributionChart from "../components/dashboard/PatientDistributionChart";
import DiagnosisAccuracyChart from "../components/dashboard/DiagnosisAccuracyChart";

const OverviewPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='ECG Dashboard Overview' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Total ECG Reports' icon={FileMedical} value='1,245' color='#6366F1' />
					<StatCard name='New Patients' icon={UserPlus} value='320' color='#8B5CF6' />
					<StatCard name='Diagnoses Made' icon={HeartPulse} value='567' color='#EC4899' />
					<StatCard name='Prediction Accuracy' icon={Activity} value='95%' color='#10B981' />
				</motion.div>

				{/* CHARTS */}
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					<EcgTrendsChart />
					<PatientDistributionChart />
					<DiagnosisAccuracyChart />
				</div>
			</main>
		</div>
	);
};

export default OverviewPage;

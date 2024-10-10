import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import PatientsTable from "../components/patients/PatientsTable";
import PatientsRiskChart from "../components/patients/PatientsRiskChart";
import PatientsECGHeatmap from "../components/patients/PatientsECGHeatmap";
import PatientsDemographicsChart from "../components/patients/PatientsDemographicsChart";

const PatientStats = {
	totalPatients: 152845,
	newPatientsToday: 243,
	oldPatients: 98520,
	increaseRate: "2.4%",
};

const PatientsPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Patients' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard
						name='Total Patients'
						icon={UsersIcon}
						value={PatientStats.totalUsers.toLocaleString()}
						color='#6366F1'
					/>
					<StatCard name='New Patients Today' icon={UserPlus} value={PatientStats.newPatientsToday} color='#10B981' />
					<StatCard
						name='Old Patients'
						icon={UserCheck}
						value={PatientStats.oldPatients.toLocaleString()}
						color='#F59E0B'
					/>
					<StatCard name='Increase Rate' icon={UserX} value={PatientStats.churnRate} color='#EF4444' />
				</motion.div>

				<PatientsTable />

				{/* USER CHARTS */}
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8'>
					<PatientsRiskChart />
					<PatientsECGHeatmap />
					<PatientsDemographicsChart />
				</div>
			</main>
		</div>
	);
};
export default PatientsPage;

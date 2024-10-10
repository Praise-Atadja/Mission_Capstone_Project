import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const diagnosisData = [
	{ name: "Jul", diagnosis: 4200 },
	{ name: "Aug", diagnosis: 3800 },
	{ name: "Sep", diagnosis: 5100 },
	{ name: "Oct", diagnosis: 4600 },
	{ name: "Nov", diagnosis: 5400 },
	{ name: "Dec", diagnosis: 7200 },
	{ name: "Jan", diagnosis: 6100 },
	{ name: "Feb", diagnosis: 5900 },
	{ name: "Mar", diagnosis: 6800 },
	{ name: "Apr", diagnosis: 6300 },
	{ name: "May", diagnosis: 7100 },
	{ name: "Jun", diagnosis: 7500 },
];

const diagnosisAccuracyChart = () => {
	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<h2 className='text-lg font-medium mb-4 text-gray-100'>Diagnosis Accuracy</h2>

			<div className='h-80'>
				<ResponsiveContainer width={"100%"} height={"100%"}>
					<LineChart data={diagnosisData}>
						<CartesianGrid strokeDasharray='3 3' stroke='#4B5563' />
						<XAxis dataKey={"name"} stroke='#9ca3af' />
						<YAxis stroke='#9ca3af' />
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Line
							type='monotone'
							dataKey='diagnosis'
							stroke='#6366F1'
							strokeWidth={3}
							dot={{ fill: "#6366F1", strokeWidth: 2, r: 6 }}
							activeDot={{ r: 8, strokeWidth: 2 }}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};
export default diagnosisAccuracyChart;


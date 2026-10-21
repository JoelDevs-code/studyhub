import {
 LineChart, Line, XAxis, YAxis,
 CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
const data = [
 { month: "Dec - Mar", first_semester: 100, second_semester: 280, third_semester: 750 },
 { month: "May - Aug", first_semester: 300, second_semester: 100, third_semester: 250 },
 { month: "Oct - Nov", first_semester: 900, second_semester: 920, third_semester: 850 },
];

// import studyHubData from "../data/studyHubData.json";

function SalesChart() {
  // const lineData = studyHubData.dashboard.academicProgressOverview;
 return (
 <ResponsiveContainer width="100%" height={250}>
  {/* Using Charts in React Projects — Course Material Page 3 */}
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" className="text-xs" /><YAxis /><Tooltip />
      <Line type="monotone" dataKey="first_semester" stroke="#2563eb" strokeWidth={2}/>
      <Line type="bump" dataKey="second_semester" stroke="#080" strokeWidth={2}/>
      <Line type="bump" dataKey="third_semester" stroke="orangered" strokeWidth={2}/>
    </LineChart>
 </ResponsiveContainer>
 );
}


export default SalesChart;
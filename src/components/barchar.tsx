import {BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell} from "recharts";
// import "../dist/style.css"; 
import "../App.css"
// const data = [
//   { product: "1st Semester", sales: 978, color: "#93c5fd" },
//   { product: "2nd Semester", sales: 640, color: "blue" },
//   { product: "3rd Semester", sales: 370, color: "#1e3a8a" }
// ];

import studyHubData from "../data/studyHubData.json";

function ProductChart() {
  const barData = studyHubData.dashboard.coursesCompleted.data;
  
 return (
  <ResponsiveContainer width="100%" height={250}>
    <BarChart data={barData}>
      <XAxis dataKey="semester"/>
      <YAxis />
      <Tooltip />
      <Bar dataKey="coursesCompleted">
        {barData.map((entry, index)=>(
          <Cell key={index} fill={entry.color} />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
 );
}

export default ProductChart;

// import '../dist/style.css'
import '../App.css'

import {
 PieChart, Pie, Tooltip, ResponsiveContainer, Cell
} from "recharts";
const data = [
 { name: "Com Architecture", value: 30, color: "red"},
 { name: "AI Engineering", value: 65, color: "blue"},
 { name: "Database Design", value: 15, color: "green"},
 { name: "Python Programming", value: 45, color: "orange"},
 { name: "Backend Dev", value: 35, color: "purple"}
];

function CategoryChart() {
  
 return (
  <ResponsiveContainer width="100%" height={150} className="flex">
    <PieChart className="pie-chart-slice">
      <Pie data={data} dataKey="value" nameKey="name" outerRadius={70} strokeWidth={5}>
        {data.map((entry, index)=>(
          <Cell key={`cell-${index}`} fill={entry.color} stroke='#fff'/>
        ))}
      </Pie>
      <Tooltip />
      {/* <Legend width={200} /> */}
    </PieChart>
  </ResponsiveContainer>
  );
}

export default CategoryChart

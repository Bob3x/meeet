// src/components/EventGenresChart.js

import { useState, useEffect } from "react";
import { PieChart, Pie, Legend, Cell, ResponsiveContainer } from 'recharts';


const EventGenresChart = ({ events }) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];

    useEffect(() => {
        const getData = () => {
            const data = genres.map((genre) => {
                const filteredEvents = events.filter((event) => event.summary.includes(genre));
                return {
                    name: genre, 
                    value: filteredEvents.length
                }
            })
            return data;
        }
        try {
            setIsLoading(true);
            setData(getData());
        } catch (error) {
            console.error("Error displaying data:", error);
        } finally {
            setIsLoading(false);
        }   
    }, [`${events}`]);

    const COLORS = {
        React: '#1dd3b0',
        JavaScript: '#8884d8',
        Node: '#086375',
        jQuery: '#16743f',
        AngularJS: '#372b54'
      };

const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius;
    const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
    const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;

    return percent ? (
      <text
        x={x}
        y={y}
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${genres[index]} ${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  }

if (isLoading) return <div>Loading chart data...</div>;
if (!events.length) return <div>No events to display</div>;

return (
    <ResponsiveContainer width="99%" height={400}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={130}
          animationDuration={500}
          animationBegin={0} >
         {data.map((entry, index) => (
              <Cell 
              key={`cell-${index}`} 
              fill={COLORS[entry.name]} 
              stroke="#affc41"
              strokeWidth={2}
              />
            ))}
            </Pie>
          <Legend 
          align="center" 
          verticalAlign="bottom" 
          layout="horizontal" 
          height={2} 
          />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default EventGenresChart;
// src/components/CityEventsChart.js

import { useState, useEffect, useCallback } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const CityEventsChart = ({ allLocations, events }) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getData = useCallback(() => {
        const data = allLocations.map((location) => {
            const count = events.filter((event) => event.location === location).length
            const city = location.split((/, | - /))[0]
            return { city, count };
        })
        return data;
    }, [allLocations, events]);

    useEffect(() => {
        try {
            setIsLoading(true);
            setData(getData());
        } catch (error) {
            console.error("Error displaying data:", error);
        }finally {
            setIsLoading(false);
        }
    }, [getData, allLocations, `${events}`]);

    if (isLoading) return <div>Loading chart data...</div>;
    if (!events.length) return <div>No events to display</div>;

    return (
        <ResponsiveContainer width="99%" height={400}>
            <ScatterChart
                margin={{
                    top: 20,
                    right: 20, 
                    bottom: 60, 
                    left: -30,
                }}
                >
                <CartesianGrid />
                <XAxis type="category" dataKey="city" name="City" angle={60} interval={0} tick={{ dx: 20, dy: 40, fontSize: 14 }} />
                <YAxis type="number" dataKey="count" name="Number of events" allowDecimals={false} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="City-events" data={data} fill="#8884d8" /> 
                </ScatterChart>
        </ResponsiveContainer>
    );
};

export default CityEventsChart;
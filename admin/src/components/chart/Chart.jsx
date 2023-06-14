import "./chart.scss";
import {
    AreaChart,
    Area,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import { useState, useEffect } from 'react';
import axios from 'axios';

const months = [
    { num: 1, name: "January", Total: 1200 },
    { num: 2, name: "February", Total: 2100 },
    { num: 3, name: "March", Total: 800 },
    { num: 4, name: "April", Total: 1600 },
    { num: 5, name: "May", Total: 900 },
    { num: 6, name: "June", Total: 1700 },
    { num: 7, name: "July", Total: 1700 },
    { num: 8, name: "August", Total: 1700 },
    { num: 9, name: "September", Total: 1700 },
    { num: 10, name: "October", Total: 1700 },
    { num: 11, name: "November", Total: 1700 },
    { num: 12, name: "December", Total: 1700 }
]

const Chart = ({ aspect, title }) => {

    const [chartData, setChartData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/chart');
                setChartData(response.data.monthlyTotals);
            } catch (error) {
                setChartData([]);
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Invoke the fetchData function
    }, []);

    const updatedMonths = months.map(month => {
        const year = '2023'; // Specify the desired year here
        const monthNumber = month.num.toString();
        const totalValue = chartData[year]?.[monthNumber] || 0;

        return { ...month, Total: totalValue };
    });

    return (
        <div className="chart">
            <div className="title">{title}</div>
            <ResponsiveContainer width="100%" aspect={aspect}>
                <AreaChart
                    width={730}
                    height={250}
                    data={updatedMonths}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="gray" />
                    <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="Total"
                        stroke="#8884d8"
                        fillOpacity={1}
                        fill="url(#total)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;
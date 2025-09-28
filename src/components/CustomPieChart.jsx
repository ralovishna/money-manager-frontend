import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Text, Tooltip } from 'recharts';

// CustomPieChart component for rendering a themed pie chart
const CustomPieChart = ({ data, label, totalAmount, colors, showTextAnchor }) => {
    return (
        <div className="w-full h-[400px] relative">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <defs>
                        {/* Gradient for pie segments */}
                        <linearGradient id="pieGradientBalance" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#164E63" stopOpacity={1} /> {/* bg-cyan-800 */}
                            <stop offset="100%" stopColor="#4f46e5" stopOpacity={0.7} /> {/* Indigo blend */}
                        </linearGradient>
                        <linearGradient id="pieGradientIncome" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#14532D" stopOpacity={1} /> {/* bg-green-800 */}
                            <stop offset="100%" stopColor="#4f46e5" stopOpacity={0.7} />
                        </linearGradient>
                        <linearGradient id="pieGradientExpense" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#7F1D1D" stopOpacity={1} /> {/* bg-red-800 */}
                            <stop offset="100%" stopColor="#4f46e5" stopOpacity={0.7} />
                        </linearGradient>
                        {/* Gradient for chart background */}
                        <linearGradient id="bgGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#e0e7ff" stopOpacity={0.3} />
                            <stop offset="100%" stopColor="#f3f4f6" stopOpacity={0.1} />
                        </linearGradient>
                        {/* Gradient for tooltip background */}
                        <linearGradient id="tooltipGradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#e0e7ff" stopOpacity={0.9} />
                            <stop offset="100%" stopColor="#c7d2fe" stopOpacity={0.9} />
                        </linearGradient>
                        {/* Gradient for center text */}
                        <linearGradient id="labelGradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#4f46e5" stopOpacity={1} />
                            <stop offset="100%" stopColor="#7c3aed" stopOpacity={1} />
                        </linearGradient>
                    </defs>

                    {/* Full chart background */}
                    <rect x="0" y="0" width="100%" height="100%" fill="url(#bgGradient)" />

                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        innerRadius={60} // Donut chart effect
                        label={showTextAnchor ? ({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)` : false}
                        labelLine={{ stroke: '#d1d5db', strokeWidth: 1 }}
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={`url(#pieGradient${entry.name})`} // Use specific gradient per segment
                            />
                        ))}
                    </Pie>

                    <Tooltip
                        contentStyle={{
                            background: 'url(#tooltipGradient)',
                            backgroundColor: 'rgba(255, 255, 255, 0.9)', // Fallback
                            border: 'none',
                            borderRadius: '16px',
                            boxShadow: '0px 8px 24px rgba(79, 70, 229, 0.3)',
                            fontSize: '14px',
                            fontFamily: "'Poppins', 'Arial', sans-serif",
                            fontWeight: 600,
                            padding: '16px',
                            color: '#1f2937',
                        }}
                        labelStyle={{
                            color: '#4f46e5',
                            fontWeight: 700,
                            fontSize: '16px',
                            marginBottom: '8px',
                            fontFamily: "'Poppins', 'Arial', sans-serif",
                        }}
                        itemStyle={{
                            color: '#1f2937',
                            fontWeight: 500,
                            fontSize: '14px',
                        }}
                    />

                    <Text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        style={{
                            fontSize: '16px',
                            fontFamily: "'Poppins', 'Arial', sans-serif",
                            fontWeight: 600,
                            fill: 'url(#labelGradient)',
                            filter: 'drop-shadow(0px 1px 3px rgba(79, 70, 229, 0.5))',
                        }}
                    >
                        {label}: {totalAmount}
                    </Text>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomPieChart;
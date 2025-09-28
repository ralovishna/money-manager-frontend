import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
} from 'recharts';

const CustomLineChart = ({ data }) => {
    return (
        <div className="w-full h-[400px]">
            <ResponsiveContainer>
                <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <defs>
                        {/* Gradient for the line */}
                        <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#4f46e5" stopOpacity={1} />
                            <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.5} />
                        </linearGradient>
                        {/* Gradient for the area fill under the line */}
                        <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.8} />
                            <stop offset="100%" stopColor="#a5b4fc" stopOpacity={0.2} />
                        </linearGradient>
                        {/* Gradient for axis labels */}
                        <linearGradient id="labelGradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#4f46e5" stopOpacity={1} />
                            <stop offset="100%" stopColor="#7c3aed" stopOpacity={1} />
                        </linearGradient>
                        {/* Gradient for tooltip background */}
                        <linearGradient id="tooltipGradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#e0e7ff" stopOpacity={0.9} />
                            <stop offset="100%" stopColor="#c7d2fe" stopOpacity={0.9} />
                        </linearGradient>
                        {/* Gradient for full chart background */}
                        <linearGradient id="bgGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#e0e7ff" stopOpacity={0.3} />
                            <stop offset="100%" stopColor="#f3f4f6" stopOpacity={0.1} />
                        </linearGradient>
                    </defs>

                    {/* Full chart background */}
                    <rect x="0" y="0" width="100%" height="100%" fill="url(#bgGradient)" />

                    <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" opacity={0.5} />

                    <XAxis
                        dataKey="date"
                        tick={{
                            fontSize: 14,
                            fill: 'url(#labelGradient)',
                            fontFamily: "'Poppins', 'Arial', sans-serif",
                            fontWeight: 600,
                            letterSpacing: '0.5px',
                            filter: 'drop-shadow(0px 1px 3px rgba(79, 70, 229, 0.5))',
                        }}
                        axisLine={{ stroke: '#e5e7eb', strokeWidth: 1 }}
                        tickLine={false}
                        tickMargin={10}
                    />

                    <YAxis
                        dataKey="totalAmt"
                        tick={{
                            fontSize: 14,
                            fill: 'url(#labelGradient)',
                            fontFamily: "'Poppins', 'Arial', sans-serif",
                            fontWeight: 600,
                            letterSpacing: '0.5px',
                            filter: 'drop-shadow(0px 1px 3px rgba(79, 70, 229, 0.5))',
                        }}
                        axisLine={{ stroke: '#e5e7eb', strokeWidth: 1 }}
                        tickLine={false}
                        tickMargin={10}
                    />

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
                        cursor={{ stroke: '#4f46e5', strokeWidth: 2, strokeDasharray: '4 4' }}
                    />

                    {/* Area with gradient fill under the line */}
                    <Area type="monotone" dataKey="totalAmt" stroke="none" fill="url(#areaGradient)" />

                    {/* Curved line with gradient */}
                    <Line
                        type="monotone"
                        dataKey="totalAmt"
                        stroke="url(#lineGradient)"
                        strokeWidth={4}
                        dot={{ r: 5, fill: '#4f46e5', strokeWidth: 2, stroke: '#ffffff' }}
                        activeDot={{ r: 7, fill: '#7c3aed', strokeWidth: 2, stroke: '#ffffff' }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomLineChart;
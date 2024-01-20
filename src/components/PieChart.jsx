import { Tooltip } from '@mui/material';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend } from 'recharts';

import PropTypes from 'prop-types';

function PieChartComponent({data}) {
    console.log(data);
    return (
        <ResponsiveContainer width="100%" height="100%">
            {/* Titulo de la grafica */}
            <PieChart width={400} height={400}>
                <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                />
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    )
}

PieChartComponent.propTypes = {
    data: PropTypes.array.isRequired,
}

export default PieChartComponent
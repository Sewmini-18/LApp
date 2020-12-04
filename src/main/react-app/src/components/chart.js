import React, { useState, useEffect } from 'react';
import { HorizontalBar } from 'react-chartjs-2'


import LogData from './components/NAT64_1_20.json';

const HorizontalBarChart = ()=> {

    const [labels, setLabels] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() =>  {
        if(loading){
            const tempData = [];
            const tempLabels = [];
            for(let i=0; i< LogData.length; i++){
                tempData.push(parseInt(LogData[i].Destination, 10));
                tempLabels.push(LogData[i].Source);
            }
            setData(tempData);
            setLabels(tempLabels);
            setLoading(false);
            // LogData.forEach(e => {
            //     console.log(1)
            //     setData([...data, parseInt(e.Length, 10)]);
            //     setLabels([...labels, e.Source]);
            // })
        }
    })

    return  (
        <div>
            <HorizontalBar
                data={{
                    labels:labels,
                    datasets: [{
                        label: '# of Votes',
                        data:data,
                        backgroundColor: 'light blue',
                        borderColor: 'red'
                    }],
                }}
                height={2000}
                width={500}
                options={{ maintainAspectRatio: false }}

            />
        </div>
    )
}


export default HorizontalBarChart;

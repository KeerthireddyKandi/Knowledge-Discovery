import React, { useState, useEffect } from 'react';
import {Pie} from 'react-chartjs-2';
import axios from "axios";

function Chartjs() {
    const [DataSource, setDataSource] = useState({});
    const CHART = () => {
        let Data = [];
        let Labels = [];
        axios.get('http://localhost:5000/budget')
        .then ((res) => {
            for (var i = 0; i < res.data.myBudget.length; i++){
                Data.push(res.data.myBudget[i].budget);
                Labels.push(res.data.myBudget[i].title); 
            }
            setDataSource({
                datasets:[
                    {   
                        data: Data,
                        backgroundColor: [
                            '#ffcd56',
                            '#ff6384',
                            '#36a2eb',
                            '#fd6b19',
                            '#2E4053',
                            '#2ECC71',
                            '#B7950B',
                            '9B59B6'
                        ],
                    }
                ],
                labels: Labels
            })
        })
    }

    useEffect(() => {
        CHART();
    }, []);

    return (
        <Pie
        width = {200}
        height = {200}
        data={DataSource}    
        options={{
            title:{
            display:true,
            fontSize:30
            },
            legend:{
            display:true,
            position:'right'    
            }
        }}
        />
    ); 
}

export default Chartjs;

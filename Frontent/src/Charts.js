import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Card, CardBody, Container } from 'react-bootstrap';

ChartJS.register(ArcElement, Tooltip, Legend);

export function Charts() {
    const [numberAnswers, setNumberAnswers] = useState([]);

    useEffect (()=>{
        getData()
    }, []);

    const getData = async () => {
        try {
            Swal.fire("Cargando datos")
            Swal.showLoading()
            //Res.data
            const { data } = await axios.get("http://localhost:4000/get-answers-to-chart");
            setNumberAnswers(data);
            Swal.close()
        } catch (error) {
            Swal.fire("Oppps algo salio mal", error.msg, "error")
        }
    }

    const data = {
        labels: [
          "Muy insatisfecho", 
          "Insatisfecho", 
          "Neutral", 
          "Satisfecho", 
          "Muy satisfecho"
        ],
        datasets: [
          {
            label: '# de respuestas',
            data: numberAnswers, //Numero de cantidad de respuestas
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 2,
          },
        ],
      };

  return (
    <Container>
        <Card>
            <Card.Body>
                <div style={{width:"300px", height:"300px", margin:"auto"}}>
                    <Doughnut data = {data} />;
                </div>
            </Card.Body>
        </Card>
    </Container>
  );
}
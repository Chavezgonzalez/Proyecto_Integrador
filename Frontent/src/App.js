import React, { useState } from 'react'; // Importa React y useState
import './App.css';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap'; // Asegúrate de tener estos componentes
import Swal from 'sweetalert2';
import axios from 'axios';

function App() {
  const [answers, setAnswers] = useState({});

  const questionnaire = {
    preguntas: [
      "¿Qué tan motivado te sientes en tu trabajo?",
      "¿Cómo calificarías tu ambiente laboral?",
      "¿Con qué frecuencia recibes reconocimiento por tu trabajo?",
      "¿Qué tan cómodo te sientes compartiendo tus ideas?",
      "¿Cuánto apoyo sientes de tus compañeros?",
      "¿Qué tan claras son tus responsabilidades?",
      "¿Qué tan satisfecho estás con tus oportunidades de desarrollo profesional?",
      "¿Cuántas veces al mes participas en actividades de equipo?",
      "¿Qué tan alineados están tus objetivos personales con los de la empresa?",
      "¿Qué tan seguido recibes retroalimentación sobre tu trabajo?",
      "¿Te sientes parte de la cultura de la empresa?",
      "¿Cómo calificarías tu equilibrio entre trabajo y vida personal?",
      "¿Qué tan satisfecho estás con la comunicación dentro de tu equipo?",
      "¿Qué tan fácil es para ti abordar a tu supervisor?",
      "¿Cómo calificarías tu satisfacción general en el trabajo?"
    ],
    opciones: ["Muy insatisfecho", "Insatisfecho", "Neutral", "Satisfecho", "Muy satisfecho"] // Define las opciones
  };

  const onChange = (e) => {
    const data = { ...answers }; // Clonamos el objeto de respuestas
    data[e.target.name] = e.target.value;
    console.log(data);
    setAnswers(data);
  };

  const onSubmit = async () => {
    const questionUnanswered = [];
    questionnaire.preguntas.forEach((_, i) => {
      if (!answers[`pregunta_${i}`]) {
        questionUnanswered.push(i + 1);
      }
    });

    if (questionUnanswered.length > 0) {
      Swal.fire(
        "Opppss!, parece que faltan preguntas por contestar",
        questionUnanswered.join(','),
        "error"
      );
      return;
    }

    Swal.fire("Enviando respuestas")
    Swal.showLoading()

    try {
      await axios.post("http://localhost:4000/save-answers", answers)
      Swal.fire("Respuestas almacenadas con exito ji ji,","","success").then(() => {
        window.location.reload();  
      });
    } catch (error) {
      Swal.fire("Ocurrio un error al guardar tus respuestas", error.msg, "error")
    }
  };

  return (
    <Container className='mt-3'>
      <header>
        <nav>
          <h1 className="etiqueta1">Evaluación Docente</h1>
        </nav>
      </header>

      <Card className="mt-3">
        <Card.Body>
          <p>INSTRUCCIONES:</p>
          <ul>
            <li>1) Lee cada pregunta detenidamente...</li>
            <li>2) Selecciona la opción que mejor describa tu experiencia...</li>
            <li>3) Responde con honestidad y objetividad...</li>
            <li>4) No dejes preguntas sin contestar...</li>
            <li>5) En caso de dudas sobre una pregunta...</li>
            <li>6) Confidencialidad: Todas tus respuestas son anónimas...</li>
          </ul>
        </Card.Body>
      </Card>

      {questionnaire.preguntas.map((pregunta, i) => (
        <Form.Group key={`q-${i}`}>
          <Form.Label>{`${i + 1}._ ${pregunta}`}</Form.Label>
          <Form>
            {questionnaire.opciones.map((opcion, io) => (
              <Form.Check
                value={opcion}
                onChange={onChange}
                key={`q-${i}-o-${io}`}
                type="radio"
                id={`opcion-${io}-pregunta_${i}`}
                name={`pregunta_${i}`}
                label={opcion}
              />
            ))}
          </Form>
        </Form.Group>
      ))}

      <Row className='text-center'>
        <Col>
          <Button onClick={() => onSubmit()}>Enviar</Button>
        </Col>
      </Row>

      <footer>
        <nav>
          <ul>
            <li>Gracias por tus respuestas.</li>
          </ul>
        </nav>
      </footer>

    </Container>
  );
}

export default App;


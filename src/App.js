import logo from './logo.svg';
import './App.css';

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
    ]
  };

  const onChange = (e)=>{
    e.preventDefault();
    const data = answers;
    data [e.target.name] = e.target.value;
    console.log(data);
    setAnswers(data);
  }

  const onSubmit = ()=>{
      //Validar que las preguntas fueron contestadas
      const questionUnanswered = [];
      questionnaire.preguntas.map((_,i)=>{
        if(!answers[`pregunta_${i}`]){
          questionUnanswered.push(i + 1)
        }
      })

      if(questionUnanswered.length > 0){
        Swal.fire("Opppss!, parece que faltan preguntas por contestar",
          questionUnanswered.join(','),
          "error"
        );
        return;
      }
  }

  return (
   <Container className ='mt-3'>
    
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

      {
        questionnaire.preguntas.map((pregunta, i)=>{
          <Form.Group key={`q-${i}`}>
            <Form.Label>{`${i + 1}._ ${pregunta}`}</Form.Label>
              <Form> 
                {
                  questionnaire.opciones.map((opcion, io) => {
                    <Form.Check
                    value = {opcion}
                    onChange = {onChange}
                    key = {`q-${i}-o-${io}`}
                    type = "radio"
                    id = {`opcion-${io}-pregunta_${i}`}
                    name = {`pregunta_${i}`}
                    label = {opcion}
                    />
                  })
                }
                </Form>
          </Form.Group>
        })
      }

      <Row className = 'text-center'>
        <col>
          <Button onClick = {()=>onSubmit()}>Enviar</Button>
        </col>
      </Row>                                           

      <footer>
        <nav>
          <ul>
            <li>Gracias por tus respuestas.</li>
          </ul>
        </nav>
      </footer>

   </Container> 
  )

export default App;

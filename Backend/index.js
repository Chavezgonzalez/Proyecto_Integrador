import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";
// import { DatesModel } from './models/DatesModels.js';
import { AnswerModel } from './models/AnswersModel.js';
/* import formRoutes from './routes/formRoutes.js';
import userRoutes from './routes/userRoutes.js';
import surveyRoutes from './routes/surveyRoutes.js'; */

import userController from './controllers/userController.js';

mongoose
  .connect('mongodb://localhost:27017/formulario')
  .then(() => {
    console.log('Conexión exitosa a la BD');
  })
  .catch((error) => {
    console.error('Error al conectar a la BD:', error);
  });

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hola desde mi servidor');
});

app.post("/create", (req, res) => {
  const { pregunta_1, pregunta_2, pregunta_3, pregunta_4, pregunta_5, pregunta_6 } = req.body;
  if (!pregunta_1 || !pregunta_2 || !pregunta_3 || !pregunta_4 || !pregunta_5 || !pregunta_6) {
    return res.status(400).json({
      msg: "Necesitamos todos los valores para almacenar un documento!"
    });
  }
  // Aquí se puede agregar la lógica para almacenar el documento en la base de datos
  res.status(201).json({ msg: "Documento creado exitosamente!" });
});

/*  app.use('/form', formRoutes);
  app.use('/users', userRoutes);
  app.use('/surveys', surveyRoutes); */ 

app.post("/user/create", userController.createUser);
app.delete("/user/delete/:id", userController.deleteUser);
app.put("/user/update/:id", userController.updateUser);
app.get("/users", userController.getAllUsers);
app.get("/user/:id", userController.getUser);
app.post("/login", userController.login);

app.post("/save-answers", async (req, res)=>{
  console.log(req.body)
  //Arreglo del 1 al 15
  const numberOfQuestions = Array.from(Array(15).keys());
  let flag = true;
  for (const nQ of numberOfQuestions){
    console.log()
    if (!req.body[`pregunta_${nQ}`]) {
      flag = false;
    }
  }
  if (!flag){
    return res.status(400).json({msg: "Datos inclompletos"})
  }

  try {
    await AnswerModel.create(req.body);
    return res.status(200).json({msg:"Datos almacenados con exito"})
  } catch (error) {
    return res.status(500).json({msg:"Algo salio mal al guardar las respuestas"})
  }
})

app.get("/get-answers", async (req, res) => {
  return res.status(200).json(await AnswerModel.find())
})

app.get("/get-answers-to-chart", async (req, res) => {
  const allAnswers = await AnswerModel.find();
  let totalMuyInsatisfecho = 0;
  let totalInsatisfecho = 0;
  let totalNeutral = 0;
  let totalSatisfecho = 0;
  let totalMuySatisfecho = 0;

  for (const answer of allAnswers) {
      for (let i = 0; i < 15; i++) {
          const answerPerQuestion = answer[`pregunta_${i}`];
          
          if (answerPerQuestion === "Muy insatisfecho") {
            totalMuyInsatisfecho++
          } else if (answerPerQuestion === "Insatisfecho") {
            totalInsatisfecho++
          } else if (answerPerQuestion === "Neutral") {
            totalNeutral++
          } else if (answerPerQuestion === "Satisfecho") {
            totalSatisfecho++
          } else if (answerPerQuestion === "Muy satisfecho") {
            totalMuySatisfecho++;
          }
      }
  }

  return res.status(200).json([
    totalMuyInsatisfecho,
    totalInsatisfecho,
    totalNeutral,
    totalSatisfecho,
    totalMuySatisfecho
  ])
})


  app.listen(4000, () => {
    console.log('Servidor en linea en el puerto 4000');
  });


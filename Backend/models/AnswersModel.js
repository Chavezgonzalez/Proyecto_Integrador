import { Schema, model } from "mongoose";

const AnswerSchema = new Schema ({
    pregunta_0:{
        type: String, 
        required: true
    },
    pregunta_1:{
        type: String, 
        required: true
    },
    pregunta_2:{
        type: String, 
        required: true
    },
    pregunta_3:{
        type: String, 
        required: true
    },
    pregunta_4:{
        type: String, 
        required: true
    },
    pregunta_5:{
        type: String, 
        required: true
    },
    pregunta_6:{
        type: String, 
        required: true
    },
    pregunta_7:{
        type: String, 
        required: true
    },
    pregunta_8:{
        type: String, 
        required: true
    },
    pregunta_9:{
        type: String, 
        required: true
    },
    pregunta_10:{
        type: String, 
        required: true
    },
    pregunta_11:{
        type: String, 
        required: true
    },
    pregunta_12:{
        type: String, 
        required: true
    },
    pregunta_13:{
        type: String, 
        required: true
    },
    pregunta_14:{
        type: String, 
        required: true
    }
})

export const AnswerModel = model ("answers", AnswerSchema)
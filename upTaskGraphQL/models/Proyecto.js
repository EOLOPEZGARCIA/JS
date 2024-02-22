const mongoose = require("mongoose");

const ProyoyectoSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required:true,
        trim: true
    },
    creadore:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Usuario'

    },
    creado:{
        type: Date,
        default:Date.now()
    }
})

module. exports= mongoose.model('Proyecto',ProyoyectoSchema)
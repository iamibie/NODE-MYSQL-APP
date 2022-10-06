import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import asyncHandler from 'express-async-handler'

dotenv.config()

const port = process.env.PORT || 5000

const app = express()

app.use(express.json())




 




////Connect Database////////////////

const connectDB = async () => {
    try {
        const conn =  await mongoose.connect(process.env.MONGO_URI)

        console.log(`MongoDB connected:${conn.connection.host}`)
        
    } catch (error) {
        console.error(`Error ${error.message}`)
        process. exit(1)
        
    }
}

connectDB();


////CreateDataModel and Scehma

const messageSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true

    },
},
   
    {timestamps:true}
)

const Message = mongoose.model('message', messageSchema)


////Routes///
app.post('/api/message', asyncHandler(async (req,res) => {
        const {name, email, message} = req.body
    
        const saveMessage = await Message.create({
            name,
            email,
            message
        })
    
        if(saveMessage){
            res.status(201).json({
                _id:saveMessage._id,
                name:saveMessage.name,
                email:saveMessage.email,
                message:saveMessage.message,
               
            })
        } else {
            res.status(404)
            throw new Error('Message not saved!')
        }
        
    }
))






if (process.env.NODE_ENV === 'production'){
    app.use(express.static('public'))
} else{

    app.get('/', (req, res)=>{

        res.send(`Server running in ${process.env.NODE_ENV} mode`)
    
    })

}





app.listen(port, ()=>{
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${port}`)
})






















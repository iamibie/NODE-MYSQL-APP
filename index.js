import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import asyncHandler from 'express-async-handler'

dotenv.config()

const port = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(express.static('public'))

app.listen(port, ()=>{
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${port}`)
})

{/**
    app.get('/', (req, res)=>{

    res.send(`App is running in ${process.env.NODE_ENV} mode`)

})
 */}




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










































{/**
    ////SAMPLE DATA/////

const messages = [
    {
        name:"Ibrahim Mahamane",
        email:"example@exampleg.com",
        message:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name:"Ibrahim Mahamane",
        email:"example@exampleg.com",
        message:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name:"Ibrahim Mahamane",
        email:"example@exampleg.com",
        message:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }
]

///seederScript

const importData = asyncHandler(
    async () => {
        try {
            await Message.deleteMany()
            
            const sampleMessages = messages.map(message => {
                return {
                    ...message
                }
            })
    
            await Message.insertMany(sampleMessages)
    
            
            console.log('Data Imported!')
            process.exit()
        } catch (error) {
            console.error(`${error}`)
            process.exit(1)
            
        }
    }
)

const destroyData = async () => {
    try {
        await Message.deleteMany()
        

        console.log('Data Destroyed!')
        process.exit()


    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

if(process.argv[2] ==='-d') {
    destroyData()
} else {
    importData()
}
 */}




import mongoose from "mongoose";
export async function connectDB() {
    try{
        await mongoose.connect('mongodb+srv://grupo-30:grupo-30@cluster0.blryo.mongodb.net/NodeMod3Cohorte5') ;
    console.log('Conexión exitosa de María José a MongoDB');
    } catch (error) {
        console.error('Error al conectar a MongoDB María José, intenta más tarde:', error);
        Process.exit(1);
    }
}
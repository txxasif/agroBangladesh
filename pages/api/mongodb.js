const connectDB = require("@/models/mongoose");
export default async function handler(req,res){
        await connectDB();
        res.status(200).json({
            message : 'done'
        });
}
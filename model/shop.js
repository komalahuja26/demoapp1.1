const mongooose= require("mongoose");
const schemaObject = {
    name:{type:String, required:true},
    author:{type:String,required:true},
    description:{type:String, required:true},
    price:{type:Number, required:true}
}

const mongooseSchema = mongooose.Schema(schemaObject);
module.exports=mongooose.model("shop",mongooseSchema);

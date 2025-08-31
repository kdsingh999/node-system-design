import {readFile} from "fs"

function readConfig(filePath:any,options:any,callback:Function){
    readFile(filePath,'utf8',(err:any,data:any)=>{
        if(err){
            return callback(err);
        }
        callback(data)
    })
}

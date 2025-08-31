import { error } from "console";
import {EventEmitter} from "events"
import { readFile } from "fs"

export function searchRecordInCsv(files:any,searchTerm:any){
    const emitter=new EventEmitter();

    for(const file of files){
        readFile(file,'utf8',(error,data)=>{
            if(error){
                return emitter.emit("error",error);
            }
            emitter.emit("fileRead",data);

            const lines=data.trim().split("\n");

            for(let i=1;i<lines.length;i++){
                const row=lines[i].split(",");
                const found=row.some((col:any)=>col.includes(searchTerm));
                if(found){
                    emitter.emit("recordFound",file,row)
                }
            }
        })
    }

    return emitter
}
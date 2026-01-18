import {exec} from "child_process"
import { error } from "console";
import {path} from "path"
import {fs}  from "fs"
 

async function startProject() {
    console.log("Executing of script.js start..");
    const outDirPath=path.join(__dirname,'output');

    const program=exec(`cd ${outDirPath} && npm install && npm run build`);

    program.stdout.on('data',function (data){
        console.log(data.toString());
    } )

    program.stdout.on('error', function (data){
        console.log(error.toString());
    })

    program.on('close',async function (){
        console.log("Build close..");

        // now taking the dist folder 

        const distPath= path.join(__dirname,'output','dist');
        const distFileContents=fs.readdirSync(distPath,{recursive : true});

        for(const filePath of distFileContents){
            if(fs.lstatSync(filePath).isDirectory()){
                continue;
            }
            
        }
    })


    
}
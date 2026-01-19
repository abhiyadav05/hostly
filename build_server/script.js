import {exec} from "child_process"
import { error } from "console";
import {path} from "path"
import {fs}  from "fs"
import {S3Client,PutObjectCommand} from "@aws-sdk/client-s3"
import {mime} from 'mime-types'
 
const s3Client=new S3Client({
    region : process.env.AWS_REGION,
    credentials :{
        accessKeyId : process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY,

    }
});

const PROJECT_ID=process.env.PROJECT_ID;

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

        for(const file of distFileContents){
            const filePath=path.join(distPath,file);
            if(fs.lstatSync(filePath).isDirectory()){
                continue;
            }

            const  command = new PutObjectCommand({
                Bucket : process.env.S3_BUCKET_NAME,
                Key :`__output/${PROJECT_ID}/${file}`,
                Body : fs.createReadStream(filePath),
                ContentType : mime.lookup(filePath)
            })

            await s3Client.send(command);
            
        }
        console.log("Uploading is done..")
    })


    
}

startProject();
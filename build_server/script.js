import {exec} from "child_process"
import { error } from "console";
import path from "path"
import fs  from "fs"
import {S3Client,PutObjectCommand} from "@aws-sdk/client-s3"
import mime from 'mime-types'
import { fileURLToPath } from 'url';

import dotenv from "dotenv";
dotenv.config();
 
const s3Client=new S3Client({
    region : process.env.AWS_REGION,
    credentials :{
        accessKeyId : process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY,
    }

});

function walkDirectory(dir) {
  let files = [];
  for (const item of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, item);
    if (fs.lstatSync(fullPath).isDirectory()) {
      files = files.concat(walkDirectory(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

const PROJECT_ID=process.env.PROJECT_ID;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startProject() {
    console.log(process.env.AWS_ACCESS_KEY_ID);
    try {
        console.log("Executing of script.js start..");
    const outDirPath=path.join(__dirname,'output');

    const program=exec(`cd ${outDirPath} && npm install && npm run build`);

    program.stdout.on('data',function (data){
        console.log(data.toString());
    } )

    program.stderr.on('error', function (data){
        console.log(error.toString());
    })

    program.on('close',async function (){
        console.log("Build close..");

        // now taking the dist folder 

        const distPath= path.join(outDirPath,'dist');
        const files = walkDirectory(distPath);

        for(const file of files){
            const relativePath = path.relative(distPath, file);

            const  command = new PutObjectCommand({
                Bucket : process.env.S3_BUCKET_NAME,
                Key :`__output/${PROJECT_ID}/${relativePath}`,
                Body : fs.createReadStream(file),
                ContentType : mime.lookup(file)
            })

            await s3Client.send(command);
            console.log(`Uploaded ${relativePath} to S3`);
            
        }
        console.log("Uploading is done..")
    });
    } catch (error) {
        console.error("Error in script.js:", error);

    }


    
}

startProject();
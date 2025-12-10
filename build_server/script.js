const {exec} =require('child_process')
const path=require('path')
const fs=require('fs')
const {S3Client,PutObjectCommand} =require('@aws-sdk/client-s3')

const mime = require('mime-types')

const s3Clint= new S3Client({
        region : 'ap-south-1',
        credentials : {
            accessKeyId : process.env.S3_ACCESS_KEY,
            secretAccessKey : process.env.S3_SECRET_KEY
        }
})

const PROJECT_ID = proccess.env.PROJECT_ID

async function init() {
    console.log("Executing the script.js")
    const outDirPath=path.join(__dirname,'output')

    const p= exec(`cd ${outDirPath} && npm install && npm run build`)
    
    p.stdout.on('data',function(data){
        console.log(data.toString());
    })
    p.stdout.on('error',function(data){
        console.log(data.toString());
    })
    p.stdout.on('close',async function(){
        console.log("build complete");

        const distFolderPath=path.join(__dirname,'output','dist')
        const distFolderContent=fs.readdirSync(distFolderPath,{recursive : true})

        for( const filePath of distFolderContent){
            if(fs.lstatSync(filePath).isDirectory()) continue;
            const command =new PutObjectCommand({
                Bucket : 'hostly-clone',
                Key : `__output/${PROJECT_ID}/${filePath}`,
                Body : fs.createReadStream(filePath),
                ContentType : mime.lookup(filePath)
            })
            await s3Clint.send(command)

            console.log("finished")

        }
    })
}

init();


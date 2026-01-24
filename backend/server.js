import express from 'express';
import {ECSClient,RunTaskCommand} from '@aws-sdk/client-ecs';
import dotenv from "dotenv";
import { nanoid } from 'nanoid';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 9000;


app.use(express.json());

const ecsClient = new ECSClient({
    region : process.env.AWS_REGION,
    credentials :{
        accessKeyId : process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY,
    }
})


app.post('/build',async (req,res)=>{
    const {gitUrl}= req.body;
    const projectId = "rakesh";

    const runTaskcmd=   new RunTaskCommand({
        cluster: process.env.CLUSTER_ARN,
        taskDefinition: process.env.TASK_ARN,
        launchType: 'FARGATE',
        count: 1,
        networkConfiguration : {
            awsvpcConfiguration :{
                subnets : [process.env.SUBNET_1,process.env.SUBNET_2,process.env.SUBNET_3],
                securityGroups :[process.env.SECURITY_GROUP],
                assignPublicIp : 'ENABLED',
            }
        },
        overrides :{
            containerOverrides : [{
                name : process.env.IMAGE_NAME,
                environment :[
                    {
                    name : 'GIT_REPOSITORY_URL',
                    value : gitUrl,
                    },
                    {
                        name : 'PROJECT_ID',
                        value : projectId,
                    },
                    {
                        name :'S3_BUCKET_NAME',
                        value : process.env.S3_BUCKET_NAME,
                    },
                    {
                        name : 'AWS_REGION',
                        value : process.env.AWS_REGION,
                    },
                    {
                        name : 'AWS_ACCESS_KEY_ID',
                        value : process.env.AWS_ACCESS_KEY_ID,
                    },
                    {
                        name : 'AWS_SECRET_ACCESS_KEY',
                        value : process.env.AWS_SECRET_ACCESS_KEY,
                    }      
            ]
            }]
        }
    });

    await ecsClient.send(runTaskcmd);

    return res.json({
        status : 'built',
        data : {
            projectId,
            url : `http://${projectId}.localhost:3000`
        }
    })
})

app.listen(PORT,()=>{
  console.log(`app running on ${PORT}`);
})
import express from 'express';
import {ECSClient,RunTaskCommand} from '@aws-sdk/client-ecs';
import dotenv from "dotenv";
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


app.get('/build',(req,res)=>{
    const {gitUrl}= req.body;


    const runTaskcmd=  new RunTaskCommand({
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
                    
            ]
            }]
        }
    })
})
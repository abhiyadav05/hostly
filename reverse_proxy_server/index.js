import express from 'express';
import httpProxy from 'http-proxy'
import path from 'path';
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const proxy = httpProxy.createProxy();
const baseBucketUrl=process.env.BASE_URL;
app.use((req,res)=>{
    const hostname=req.hostname;
    const subDomain=hostname.split('.')[0];

    const resolvedUrl=`${baseBucketUrl}/${subDomain}`;

   return proxy.web(req,res,{target:resolvedUrl , changeOrigin:true},(e)=>{
        res.status(500).send("Error in proxying the request.");
    });

})

proxy.on('proxyReq',(proxyReq,req,res)=>{
    const url=req.url;
    if(url==='/'){
        proxyReq.path+='index.html';
    }
    return proxyReq;
})

app.listen(PORT, () => {
  console.log(`Reverse Proxy Server is running on port ${PORT}`);
});
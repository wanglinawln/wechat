const titbit=require("titbit");
const wxmsg=require("./wxmsgdisp");
const parsexml = require('xml2js').parseString;


var app=new titbit();

app.router.post('/wx/msg',async c=>{
    try{
        let data=await new Promise((rv,rj)=>{
            parsexml(c.body,{explicitArray:false},(err,result)=>{
                if(err){
                    rj(err);
                }
                else{
                    rv(result.xml);
                }
            })
        })
        let retmsg={
            touser:data.FromUserName,
            fromuser:data.ToUserName,
            msgtype:"",
            msgtime:parseInt(Date.now()/1000)
        }
        c.res.body=wxmsg.msgDispatch(data,retmsg);
    }catch(err){
        console.log(err);
    }
})

app.run(8000,'localhost');
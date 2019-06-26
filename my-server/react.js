


//  react.js

var express = require("express");

var router = express.Router();  

var {conn} = require("./util/db");
var {setError,aesEncrypt,keys}  =require("./util")
var {ObjectID} = require ("mongodb");

var {series,waterfall}= require("async");
var util = require('./config/index.js');

//获取医院列表
router.get("/getHospitals",(req,res)=>{
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("hospitalList").find({},{}).toArray((err,result)=>{
            setError(err,res,db);
            res.json({
                msg:"获取医院成功",
                code:200,
                result
            })
        })
    })
})
//获取挂号分类
router.get("/getIllTypes",(req,res)=>{
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("illnessList").find({},{}).toArray((err,result)=>{
            setError(err,res,db);
            res.json({
                msg:"获取分类成功",
                code:200,
                result
            })
        })
    })
})

//得到科室的分类
router.post("/getClassify",(req,res)=>{
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("hotClassify").find({},{}).toArray((err,result)=>{
            console.log(result);
            setError(err,res,db);
            res.json({
                msg:"获取数据成功",
                code:200,
                result
            })
            // db.close();
        })
    })
})

//得到新闻的数据

router.get("/getNews",(req,res)=>{
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("news").find({},{}).sort({_id:1}).toArray((err,result)=>{
            console.log(result);
            setError(err,res,db);
            res.json({
                msg:"获取数据成功",
                code:200,
                result
            })
            // db.close();
        })
    })
})


//查询留言
router.get("/getCommont",(req,res)=>{

    conn((err,db)=>{
        setError(err,res,db);
        db.collection("commont").find({},{}).sort({_id:1}).toArray((err,result)=>{
            console.log(result);
            setError(err,res,db);
            res.json({
                msg:"获取数据成功",
                code:200,
                result,
            })
            db.close();
        })
    })
})

// 删除留言
router.get("/delCommont",(req,res)=>{
    var _id = req.query._id || "";

    conn((err,db)=>{
        setError(err,res,db);
        db.collection("commont").remove({_id:ObjectID(_id)},(err,result)=>{
            setError(err,res,db);
            res.json({
                msg:"删除数据成功",
                code:200,
                result,
            })
            db.close();
        })
    })
})


// 新增留言
router.post("/addCommont",(req,res)=>{
    var body = req.body;
    console.log(body);
    conn((err,db)=>{
        setError(err,res,db);
        var commont = db.collection("commont");
        series([
            (callback)=>{
                commont.insert(body,(err,result)=>{
                    callback(err,result);
                })
            },
            (callback)=>{
                commont.find({},{}).sort({_id:1}).toArray((err,result)=>{
                    callback(err,result);
                })
            }
        ],(err,result)=>{
            setError(err,res,db);
            res.json({
                msg:"新增留言成功",
                code:200,
                result:result[1]
            })
            db.close();
        })
    })
})

// 短信验证码接口 


// 生成验证码的函数 

function getCode(){
    return 1000 + Math.floor(Math.random() * 9000);
}

// 获取短信验证码  
router.post('/sendCode', function(req, res, next) {
    console.log(req.body);
    const mobile = req.body.mobile; //需要发送的号码
    var param = getCode()  //变量内容  需要发送手机的验证码
    console.log(param);



    if (mobile == '') {
        res.json({
            msg:"手机号不能为空",
            code:200
        })
    }else{
        // 云之讯发送验证码到手机 
        util.getResult(param, mobile).then(function(response) {
            console.log(response.data);
            console.log(response.data.code);
            if (response.data.code == '000000') {  // 发送成功 
                conn((err,db)=>{
                    setError(err,res,db);
                    var codes = db.collection("codes");
                    // 数据库 判断验证码是否存在 
                    // 验证码不存在 直接插入
                    // 发送的验证码相同  改变插入时间 
                    waterfall([
                        (callback)=>{
                            codes.findOne({mobile,code:param},(err,result)=>{
                                callback(err,result);
                            })
                        },
                        (args,callback)=>{
                            if(args){
                                // 修改数据 时间
                                var time =  new Date().getTime();
                                codes.update({
                                    mobile,
                                    code:param
                                },{
                                    $set:{
                                        time
                                    }
                                },(err,result)=>{
                                    callback(err,result);
                                })
                            }else{
                                // 直接插入 
                                codes.insert({
                                    mobile,
                                    code:param,
                                    time: new Date().getTime()
                                },(err,result)=>{
                                    callback(err,result);
                                })
                            }
                        }
                    ],(err,result)=>{
                        console.log("111")
                        console.log(result)
                        setError(err,res,db);
                        res.json({
                            msg:"验证码发送成功",
                            result:param,
                            code:200
                        })
                    })
                })
            } else {
               res.json({
                   msg:"发送验证码失败",
                   code:200
               })
            }
    
        }, function(err) {
            res.json({
                msg:"云之讯数据库错误",
                code:200
            })
        })
    }
});

// 接收验证码  判断验证码 正确 

router.post("/testCode",(req,res)=>{
    var mobile = req.body.mobile;
    var code = req.body.code * 1;

    conn((err,db)=>{
        setError(err,res,db);
        var codes = db.collection("codes");

        codes.findOne({mobile,code},(err,result)=>{
            setError(err,res,db);
            if(result){
                var time = new Date().getTime();
                var alias = mobile + "wh1901" + code ;
                var token = aesEncrypt(alias,keys);
                var tel = mobile
                req.session.token = token;
                if(time-result.time<60*1000){
                    res.json({
                        code:200,
                        msg:"验证码通过",
                        type:1,
                        token,
                        tel
                    })
                }else{
                    res.json({
                        code:200,
                        msg:"验证码失效",
                        type:0,
                    })
                }
            }else{
                res.json({
                    msg:"验证码不匹配",
                    code:200,
                    type:0
                })
            }
        })

    })

})



module.exports = router;
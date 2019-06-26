


// vue  的项目   路由模块

var express = require("express");

var router = express.Router();  

var {conn} = require("./util/db");
var {setError,aesEncrypt,keys}  =require("./util")
var {ObjectID} = require ("mongodb")

//查询电影  接口
router.get("/movie",(req,res)=>{
    var limit = req.query.limit *1 || 0;
    console.log(req.session);
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("movie").find({},{title:1,id:1,year:1,genres:1,'rating.average':1,'images.large':1}).sort({_id:-1}).limit(limit).toArray((err,result)=>{
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

//登录  
router.post("/login",(req,res)=>{
    var body= req.body;
    console.log(body);

    conn((err,db)=>{
        setError(err,res,db);
        db.collection("userinfo").findOne(body,(err,result)=>{
            setError(err,res,db);
            console.log(result);
            if(result){
                const token = aesEncrypt(body.username + new Date().getTime(),keys);
                console.log("token :"+ token );
                req.session.token = token;
                res.json({
                    msg:"登录成功",
                    code:200,
                    type:1,
                    token
                })
            }else{
                res.json({
                    msg:"登录失败",
                    code:200,
                    type:0,
                })
            }
        })
    }) 
})

// 得到商品 列表
router.get("/getGoodList",(req,res)=>{
    var query = req.query;
    var limit = query.limit *1 || 0 ;
    var keyword = query.keyword;
    var obj = {};
    if(keyword){
        obj ={
            $or:[
                {name :new RegExp(keyword)},
                {'type.text':new RegExp(keyword)}
            ]
        }
    }
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("goods").find(obj,{}).sort({_id:-1}).limit(limit).toArray((err,result)=>{
            setError(err,res,db);
            console.log(result)
            res.json({
                msg:"获取数据成功",
                code:200,
                result,
            })
            db.close();
        })
    })
})

// 获取 商品详情信息

router.get("/getGoodOne",(req,res)=>{
    var goodId = req.query.goodId;
    var obj = {};
    if(goodId){
        obj._id = ObjectID(goodId);
    }
    console.log(obj);
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("goods").findOne(obj,(err,result)=>{
            setError(err,res,db);
            console.log(result)
            res.json({
                code:200,
                msg:'获取商品详情成功',
                result
            });
            db.close();
        })
    })
})

//去重 查询  商品分类
router.get("/getGoodType",(req,res)=>{
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("goods").distinct("type",(err,result)=>{
            setError(err,res,db);
            res.json({
                code:200,
                msg:"获取 商品分类成功",
                result
            })
            db.close();
        })
    })
})



router.get("/mongoose",(req,res)=>{
    getConn((err,mongoose)=>{
        if(err) throw err;
        var schema = new mongoose.Schema({ age:Number, name: String});
        var Like = mongoose.model("Like",schema);
        var emper = new Like({
            age:18,
            name:"zuzouomu-1"
        })
        emper.save((err,result)=>{
            if(err) throw err;
            console.log(result);
            res.send("mongoose -- 测试")
        })

    })
})




router.get("/",(req,res)=>{
    res.send("这是 vue项目接口 服务器 地址");
})

router.get("/demo",(req,res)=>{
    res.json({
        msg:"demo---demo--demo",
        code:200,
        type:1,
    })
})


module.exports = router;
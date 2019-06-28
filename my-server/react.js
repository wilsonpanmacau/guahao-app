


//  react.js

var express = require("express");

var router = express.Router();

var { conn } = require("./util/db");
var { setError, aesEncrypt, keys } = require("./util")
var { ObjectID } = require("mongodb");

var { series, waterfall } = require("async");
var util = require('./config/index.js');

//获取医院详情
router.get("/getHosDetail", (req, res) => {
    var title = req.query.title;
    console.log(title);
    conn((err, db) => {
        setError(err, res, db);
        db.collection("hosDetail").findOne({ title: title }, {}, (err, result) => {
            setError(err, res, db);
            res.json({
                msg: "获取医院详情成功",
                code: 200,
                result
            })
            db.close();
        })
    })
})
//获取医院列表 (查询搜索)
router.get("/getHospitals", (req, res) => {
    var query = req.query;
    var keyword = query.keyword;
    console.log(keyword);
    var obj = {};
    if (keyword) {
        obj = {
            $or: [
                { title: new RegExp(keyword) }
            ]
        }
    }
    conn((err, db) => {
        setError(err, res, db);
        db.collection("hospitalList").find(obj, {}).toArray((err, result) => {
            setError(err, res, db);
            res.json({
                msg: "获取医院成功",
                code: 200,
                result
            })
            db.close();
        })
    })
})

//获取挂号分类
router.get("/getIllTypes", (req, res) => {
    conn((err, db) => {
        setError(err, res, db);
        db.collection("illnessList").find({}, {}).toArray((err, result) => {
            setError(err, res, db);
            res.json({
                msg: "获取分类成功",
                code: 200,
                result
            })
            db.close();
        })
    })
})

//得到科室的分类
router.post("/getClassify", (req, res) => {
    conn((err, db) => {
        setError(err, res, db);
        db.collection("hotClassify").find({}, {}).toArray((err, result) => {
            console.log(result);
            setError(err, res, db);
            res.json({
                msg: "获取数据成功",
                code: 200,
                result
            })
            db.close();
        })
    })
})

//得到新闻的数据

router.get("/getNews", (req, res) => {
    conn((err, db) => {
        setError(err, res, db);
        db.collection("news").find({}, {}).sort({ _id: 1 }).toArray((err, result) => {
            console.log(result);
            setError(err, res, db);
            res.json({
                msg: "获取数据成功",
                code: 200,
                result
            })
            db.close();
        })
    })
})
//得到新闻的详情
router.get("/getNewDetail", (req, res) => {

    console.log(req.query)
    var id = req.query.newid;

    conn((err, db) => {
        setError(err, res, db);
        db.collection("newsDetail").findOne({ id }, (err, result) => {
            setError(err, res, db);
            console.log(result);
            res.json({
                msg: "获取数据成功",
                code: 200,
                result
            })
            db.close();
        })

    })

})

//得到医生详情信息
router.get("/getDocDetail", (req, res) => {
    console.log(req.query)
    var userid = req.query.userid;

    conn((err, db) => {
        setError(err, res, db);
        db.collection("doc").findOne({ userid }, (err, result) => {
            setError(err, res, db);
            console.log(result);
            res.json({
                msg: "获取数据成功",
                code: 200,
                result
            })
            db.close();
        })

    })

})
//得到科室详情
router.get("/getClassifyDetail", (req, res) => {
    console.log(req.query)
    var catname = req.query.catname;
    var limit = req.query.limit ? req.query.limit * 1 : 0;
    var skip = req.query.skip ? req.query.skip * 1 : 0;
    console.log(skip)
    conn((err, db) => {
        setError(err, res, db);
        db.collection("doc").find({ catname }, {}).limit(limit).skip(skip).toArray((err, result) => {
            setError(err, res, db);
            res.json({
                msg: "获取数据成功",
                code: 200,
                result
            })
            db.close();
        })

    })
})
//添加就诊人
router.post("/addPatient", (req, res) => {
    console.log(req.body);
    let name = req.body.name;
    let idcard = req.body.idcard;
    let tel = req.body.tel;
    let usertel = req.body.usertel;
    conn((err, db) => {
        setError(err, res, db);
        db.collection("myPatient").insert({ name, idcard, tel, usertel }, {}, (err, result) => {
            setError(err, res, db);
            res.json({
                msg: "添加就诊人成功",
                code: 200,
                result
            })
            db.close();
        })

    })
})
//收藏医生
router.post("/addCollect", (req, res) => {
    console.log(req.body);
    const body = req.body
    let usertel = body.usertel;
    let userid = body.userid;
    conn((err, db) => {
        setError(err, res, db);
        db.collection("myCollect").findOne({ usertel, userid }, {}, (err, result) => {
            setError(err, res, db);
            if (result) {
                db.collection("myCollect").remove({ usertel, userid }, {}, (err, result) => {
                    setError(err, res, db);
                    res.json({
                        msg: "取消收藏成功",
                        code: 200,
                        type: 0
                    })
                    db.close();
                })
            } else {
                db.collection("myCollect").insert(body, {}, (err, result) => {
                    setError(err, res, db);
                    res.json({
                        msg: "添加收藏成功",
                        code: 200,
                        type: 1
                    })
                    db.close();
                })
            }
        })
    })
})
//判断是否已经收藏
router.post("/findCollect", (req, res) => {
    console.log(req)
    let usertel = req.body.usertel;
    let userid = req.body.userid;
    conn((err, db) => {
        setError(err, res, db);
        db.collection("myCollect").findOne({ usertel, userid }, {}, (err, result) => {
            setError(err, res, db);
            console.log(11111)
            console.log(result);
            if (result) {
                res.json({
                    type: 1,
                    code: 200,
                })
            } else {
                res.json({
                    type: 0,
                    code: 200
                })
            }
            db.close();
        })
    })
})
//查看全部收藏
router.post("/findAllCollect", (req, res) => {
    console.log(req)
    let usertel = req.body.usertel;
    conn((err, db) => {
        setError(err, res, db);
        db.collection("myCollect").find({ usertel }, {}).toArray((err, result) => {
            setError(err, res, db);
            console.log(11111)
            console.log(result);
            res.json({
                type: 1,
                code: 200,
                result
            })
            db.close();
        })
    })
})
//查看挂号订单
router.post("/findPatientInfo", (req, res) => {
    console.log(req)
    let usertel = req.body.usertel;
    conn((err, db) => {
        setError(err, res, db);
        db.collection("patientInfo").find({ usertel }, {}).toArray((err, result) => {
            setError(err, res, db);
            console.log(result);
            res.json({
                msg: "获取数据成功",
                code: 200,
                result
            })
            db.close();
        })
    })
})
//取消挂号订单
router.post("/delPatientInfo", (req, res) => {
    console.log(req);
    const id = req.body.id;
    conn((err, db) => {
        setError(err, res, db);
        db.collection("patientInfo").remove({ _id: ObjectID(id) }, (err, result) => {
            setError(err, res, db);
            res.json({
                msg: "取消挂号成功",
                code: 200,
            })
            db.close();
        })
    })
})
// 添加就诊人数据
router.get("/addPatientInfo", (req, res) => {
    console.log(req);
    const query = req.query;

    conn((err, db) => {
        setError(err, res, db);
        db.collection("patientInfo").insert(query, (err, result) => {
            setError(err, res, db);
            console.log(result);
            res.json({
                msg: "成功",
                code: 200,
                result
            })
            db.close();
        })
    })

})


//获取当前用户的就诊人
router.get("/getParient", (req, res) => {
    console.log(req.query);
    const usertel = req.query.usertel;
    conn((err, db) => {
        setError(err, res, db);
        db.collection("myPatient").find({ usertel }, {}).toArray((err, result) => {
            setError(err, res, db);
            if (result.length > 0) {
                res.json({
                    msg: "查询就诊人成功",
                    code: 200,
                    result
                })
                db.close();
            } else {
                res.json({
                    msg: "还没有就诊人,请添加",
                    code: 200,
                })
            }
        })
    })
})
router.get("/deletePat", (req, res) => {
    var _id = req.query._id || "";
    console.log(req.query._id);
    conn((err, db) => {
        setError(err, res, db);
        db.collection("myPatient").remove({ _id: ObjectID(_id) }, (err, result) => {
            setError(err, res, db);
            res.json({
                msg: "删除数据成功",
                code: 200,
                result,
            })
            db.close();
        })
    })
})
router.post("/addComment", (req, res) => {
    console.log(req.body);
    conn((err, db) => {
        setError(err, res, db);
        db.collection("comments").insert(req.body, (err, result) => {
            setError(err, res, db);
            console.log(result);
            res.json({
                msg: "评论成功",
                code: 200,
                result
            })
            db.close();
        })
    })
})
router.get("/findComments", (req, res) => {
    console.log(req.query);
    conn((err, db) => {
        setError(err, res, db);
        db.collection("comments").find({ userid:req.query.userid }, {}).toArray((err, result) => {
            setError(err, res, db);
            res.json({
                msg: "查询评论成功",
                code: 200,
                result
            })
            db.close();
        })
    })
})
















//查询留言
router.get("/getCommont", (req, res) => {

    conn((err, db) => {
        setError(err, res, db);
        db.collection("commont").find({}, {}).sort({ _id: 1 }).toArray((err, result) => {
            console.log(result);
            setError(err, res, db);
            res.json({
                msg: "获取数据成功",
                code: 200,
                result,
            })
            db.close();
        })
    })
})

// 删除留言
router.get("/delCommont", (req, res) => {
    var _id = req.query._id || "";

    conn((err, db) => {
        setError(err, res, db);
        db.collection("commont").remove({ _id: ObjectID(_id) }, (err, result) => {
            setError(err, res, db);
            res.json({
                msg: "删除数据成功",
                code: 200,
                result,
            })
            db.close();
        })
    })
})


// 新增留言
router.post("/addCommont", (req, res) => {
    var body = req.body;
    console.log(body);
    conn((err, db) => {
        setError(err, res, db);
        var commont = db.collection("commont");
        series([
            (callback) => {
                commont.insert(body, (err, result) => {
                    callback(err, result);
                })
            },
            (callback) => {
                commont.find({}, {}).sort({ _id: 1 }).toArray((err, result) => {
                    callback(err, result);
                })
            }
        ], (err, result) => {
            setError(err, res, db);
            res.json({
                msg: "新增留言成功",
                code: 200,
                result: result[1]
            })
            db.close();
        })
    })
})

// 短信验证码接口 


// 生成验证码的函数 

function getCode() {
    return 1000 + Math.floor(Math.random() * 9000);
}

// 获取短信验证码  
router.post('/sendCode', function (req, res, next) {
    console.log(req.body);
    const mobile = req.body.mobile; //需要发送的号码
    var param = getCode()  //变量内容  需要发送手机的验证码
    console.log(param);



    if (mobile == '') {
        res.json({
            msg: "手机号不能为空",
            code: 200
        })
    } else {
        // 云之讯发送验证码到手机 
        util.getResult(param, mobile).then(function (response) {
            console.log(response.data);
            console.log(response.data.code);
            if (response.data.code == '000000') {  // 发送成功 
                conn((err, db) => {
                    setError(err, res, db);
                    var codes = db.collection("codes");
                    // 数据库 判断验证码是否存在 
                    // 验证码不存在 直接插入
                    // 发送的验证码相同  改变插入时间 
                    waterfall([
                        (callback) => {
                            codes.findOne({ mobile, code: param }, (err, result) => {
                                callback(err, result);
                            })
                        },
                        (args, callback) => {
                            if (args) {
                                // 修改数据 时间
                                var time = new Date().getTime();
                                codes.update({
                                    mobile,
                                    code: param
                                }, {
                                        $set: {
                                            time
                                        }
                                    }, (err, result) => {
                                        callback(err, result);
                                    })
                            } else {
                                // 直接插入 
                                codes.insert({
                                    mobile,
                                    code: param,
                                    time: new Date().getTime()
                                }, (err, result) => {
                                    callback(err, result);
                                })
                            }
                        }
                    ], (err, result) => {
                        console.log("111")
                        console.log(result)
                        setError(err, res, db);
                        res.json({
                            msg: "验证码发送成功",
                            result: param,
                            code: 200
                        })
                    })
                })
            } else {
                res.json({
                    msg: "发送验证码失败",
                    code: 200
                })
            }

        }, function (err) {
            res.json({
                msg: "云之讯数据库错误",
                code: 200
            })
        })
    }
});

// 接收验证码  判断验证码 正确 

router.post("/testCode", (req, res) => {
    var mobile = req.body.mobile;
    var code = req.body.code * 1;

    conn((err, db) => {
        setError(err, res, db);
        var codes = db.collection("codes");

        codes.findOne({ mobile, code }, (err, result) => {
            setError(err, res, db);
            if (result) {
                var time = new Date().getTime();
                var alias = mobile + "wh1901" + code;
                var token = aesEncrypt(alias, keys);
                var tel = mobile
                req.session.token = token;
                if (time - result.time < 60 * 1000) {
                    res.json({
                        code: 200,
                        msg: "验证码通过",
                        type: 1,
                        token,
                        tel
                    })
                } else {
                    res.json({
                        code: 200,
                        msg: "验证码失效",
                        type: 0,
                    })
                }
            } else {
                res.json({
                    msg: "验证码不匹配",
                    code: 200,
                    type: 0
                })
            }
        })

    })

})



module.exports = router;
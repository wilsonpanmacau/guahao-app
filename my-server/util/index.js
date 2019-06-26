


/**
 * 加密 模块 crypto Node 模块
 * 
 */

 var crypto = require("crypto"); //

 //加密函数
 function  aesEncrypt(data,key) {
    const cipher = crypto.createCipher('aes192',key);
    var crypted = cipher.update(data,'utf8','hex');
    crypted +=cipher.final("hex");
    return crypted;
 }

 //解密
 function aesDecrypt(encrypted,key){
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
 }
 var keys = "1901";

 exports.aesEncrypt = aesEncrypt //加密
 exports.aesDecrypt = aesDecrypt //解密
 exports.keys = keys;  //密匙

 /* 
    数据库错误  500
    返回结果给前端
 */

 function setError(err,res,db){
    if(err){
        res.json({
            statusCode:500,
            msg:"数据库错误",
            err
        });
        // db.close();
        throw err;
    }
}
exports.setError =setError

/**
 * 判断用户是否登录  */

// exports.checkIsLogin = function(req,res,callback){
//     var token = req.session.token;
//     if(token){
//         callback();
//     }else{
//         res.send(`<script>alert('session已经过期,请重新登录'); location.href='/login'</script>`);
//     }
// }
/*
***  判断用户是否登录  500   检测 token   
**   0. 正在登录 跳过token 验证 
**   1. res_token  前端 没有 token  直接判断没有登录
**   2. 前端请求头携带 token ,但是后端的 token 已经失效 判断 你已经登录超时  
**   3. 前端 token  和  后端 token 都有 但是不一致  判断 token  有误  
*/ 
exports.checkIsLogin = function(req,res,next){
    console.log("检测--------------token");
    console.log(req.path);
    if(req.path!=="/vue/login"){
        // 判断 token 
        const res_token = req.headers.token;   // 前端 请求头带过来 的token 
        console.log(123);
        console.log(res_token);
        if(res_token){
            const req_token = req.session.token;   // 后端登录 成功存储  token 
            if(req_token){
                if(req_token==res_token){
                    next();  // token 通过 
                }else{
                    res.json({
                        code:401,
                        msg:"token 不匹配 ,请重新登录",
                        type:0
                    })
                }
            }else{
                res.json({
                    code:401,
                    msg:"token 过期 ,请重新登录",
                    type:0
                })
            }
        }else{
            res.json({
                code:401,
                msg:"token 不存在,请马上登录",
                type:0
            })
        }
        
    }else{
        next()
    }
  
}



var {conn} = require("./db");
exports.login= function(req,res,next){
    next();
}




/**
 *  获取解密的用户名
*/

exports.username = function(req){
    return aesDecrypt(req.session.token,keys);
}



// 日期格式化
exports.dataFormat = function(time){
    var date = new Date(time);
    var year = date.getFullYear();
    var month = date.getMonth() +1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    sec = parseInt(sec);

    return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
}
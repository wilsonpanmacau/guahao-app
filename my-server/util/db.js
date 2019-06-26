

// 封装链接数据库 函数

const config = {
    hostname:"47.100.249.226",
    port:27017,
    dbName:"hospital"
}

let {
    hostname,
    port,
    dbName
} = config;

var CONN_DB_STR = `mongodb://${hostname}:${port}/${dbName}`;

var {MongoClient} = require("mongodb");

exports.conn = function(callback){
    MongoClient.connect(CONN_DB_STR,(err,db)=>{
        if(err){
            callback(err,null);
            console.log("数据库连接错误");
        }else{
            callback(null,db);
            console.log("数据库链接成功....")
        }
    })
}
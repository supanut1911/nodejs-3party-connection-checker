# 3party-Connection-Checker

🛠️ The utility tool to verify the connection to 3 party application 

### use ages
1. To check connection to MongoDB Atlas via 
```
[POST] {{baseurl}}/check-mongo-connection

body: 
{
        "mongourl": "{{Mongodb Atlas Url}}"
}
```



2. To check connection to Redis cloud via
```
[POST] {{baseurl}}/check-redis-connection

body: 
{
    "redisUrl": "{{Redis cloud Url}}"
}
```

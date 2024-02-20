# 3party-Connection-Checker

🛠️ The utility tool to verify the connection to 3 party application 
- Mongodb Atlas
- Redis
- Elasticsearch

### Run app
method 1 run via node & npm:
```
$ cd app
    
$ npm i

$ node index
```

method 2 run via docker :
```
$ docker build --no-cache --platform=linux/amd64 \
  -t thirdpart-connection-chcker .


$ docker run -d -p 4455:4455 thirdpart-connection-chcker
```

method 2 run via docker-compose with makefile :
```
$ make up

$ make down
```


---


### use ages

"Cloud 🌥️"
```

1. To check connection to MongoDB Atlas via:

[POST] {{baseurl}}/checker/check-mongo-connection
body: 
{
        "mongourl": "{{Mongodb Atlas Url}}"
}

#---------------------------------------------------------

2. To check connection to Redis cloud via:

[POST] {{baseurl}}/checker/check-redis-connection
body: 
{
    "redisUrl": "{{Redis cloud Url}}"
}

#---------------------------------------------------------

3. To check connection to Elasticsearch cloid via:

[POST] {{baseurl}}/checker/check-check-elasticsearch-connection-connection
body: 
{
    "elasticsearchEndpoint": "{{Elastic endpoint}}",
    "username": "{{username}}",
    "password": "{{password}}"
}
```

---

"Local 🏠"
```
1. To check connection to MongoDB Atlas local via:

[POST] http://localhost:4455/check-mongo-connection
body: 
{
    "mongourl": "mongodb://admin:p4ss@mongodb"
}

#---------------------------------------------------------

2. To check connection to Redis local via:

[POST] {{baseurl}}/check-redis-connection-local

#---------------------------------------------------------

3. To check connection to Elasticsearch local via:

[POST] {{baseurl}}/check-check-elasticsearch-connection-connection
body: 
{
    "elasticsearchEndpoint": "http://elasticsearch:9200",
    "username": "elastic",
    "password": "elasticsearchP4ss"

}
```


---

###  Try Demo Deployment 
baseurl => https://thirdpartyconnectionchecker.0xnutx.space


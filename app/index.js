
const { MongoClient, ServerApiVersion } = require('mongodb');
const redis = require('redis')
const {Client} = require('@elastic/elasticsearch')

const express = require('express')
const bodyParser = require('body-parser');
const app = express()

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).json({
    msg: 'server is running',
  })
})

app.get('/health', (req, res) => {
  res.status(200).json({
    status: "up"
  })
})

app.post('/check-redis-connection-local', async(req, res) => {
  const redisClient = redis.createClient({
    host: 'redis',
    password: 'redisp4ss'
  })

  try {
    await redisClient.connect()
    await redisClient.ping();
    res.status(200).json({
      status: "Can connect to Redis"
    })
  } catch (error) {
    res.status(500).json({
      status: 'Error connecting to Redis',
      error
    });
  } finally {
    if(redisClient) {
      redisClient.quit()
    }
  }
})

app.post('/check-redis-connection', async (req, res) => {
  const {redisUrl} = req.body
  const redisClient = redis.createClient({
    url: redisUrl
  })
  try {
    await redisClient.connect()
    await redisClient.ping();
    res.status(200).json({
      status: "Can connect to Redis"
    })
  } catch (error) {
    res.status(500).json({
      status: 'Error connecting to Redis',
      error
    });
  } finally {
    if(redisClient) {
      redisClient.quit()
    }
  }
})

app.post('/check-mongo-conntection', async (req, res) => {
  const {mongourl}= req.body
  let client
  try {
    if (!mongourl) {
      throw new Error('MongoURL must not be empty');
    }

    client = new MongoClient(mongourl, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });

    await client.connect();
    res.status(200).json({status: "Connected to MongoDB Atlas Success!"})
  } catch (error){
    res.status(500).json({
      status: `Error connecting to MongoDB`,
      error
    })
  } finally {
    if(client) {
      await client.close();
    }
  }
})

app.post('/check-elasticsearch-connection', async (req, res) => {
  const {elasticsearchEndpoint, username, password} = req.body
  let elasticsearchClient
  elasticsearchClient = new Client({ 
    node: elasticsearchEndpoint,
    auth: {
      username,
      password,
    }
  })

  try {
    const response = await elasticsearchClient.ping()
    if(response) {
      res.status(200).json({
        status: "Can connect to Elasticsearch",
      })
    }
    else {
      res.status(400).json({
        status: "Can not connect to Elasticsearch",
        error: "Your Elasticsearch endpoint is wrong, please check it."
      })
    }
  } catch (error) {
    let errormsg = ''
    if (error.meta.statusCode === 401) {
      errormsg = "Your Elasticsearch credential is wrong, please check it."
    }
    res.status(500).json({
      status: 'Error while connecting to Elasticsearch',
      error: errormsg ? errormsg : error
    });
  }
})

app.listen(4455, () => {
  console.log('app is running on 4455')
})

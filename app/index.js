
const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express')
const bodyParser = require('body-parser');
const redis = require('redis')
const app = express()

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send({
    msg: 'server is running',
  })
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
    console.log({error});
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

app.listen(4455, () => {
  console.log('app is running on 4455')
})

const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')

app.use(express.json())
app.use(express.urlencoded({extended: false}))

const Product = require('./models/productModel')

//routes
app.get('/blog', (req, res) => {
  res.send('Hello Blog API')
})

app.get('/products', async(req, res) => {
    // res.send(req.body())
  try {
      const products = await Product.find({});
      res.status(200).json(products);
  } catch (error) {
      res.status(500).json({message: error.message})
  }
})

app.get('/products/:id', async(req, res) =>{
  try {
      const {id} = req.params;
      const product = await Product.findById(id);
      res.status(200).json(product);
  } catch (error) {
      res.status(500).json({message: error.message})
  }
})


app.post('/products', async(req, res) => {
  try {
    //   res.send(req.body);
      const product = await Product.create(req.body)
      res.status(200).json(product);
      
  } catch (error) {
      console.log(error.message);
      res.status(500).json({message: error.message})
  }
})

// update a product
app.put('/products/:id', async(req, res) => {
  try {
      const {id} = req.params;
      const product = await Product.findByIdAndUpdate(id, req.body);
      // we cannot find any product in database
      if(!product){
          return res.status(404).json({message: `cannot find any product with ID ${id}`})
      }
      const updatedProduct = await Product.findById(id);
      res.status(200).json(updatedProduct);
      
  } catch (error) {
      res.status(500).json({message: error.message})
  }
})

// delete a product

app.delete('/products/:id', async(req, res) =>{
  try {
      const {id} = req.params;
      const product = await Product.findByIdAndDelete(id);
      if(!product){
          return res.status(404).json({message: `cannot find any product with ID ${id}`})
      }
      res.status(200).json(product);
      
  } catch (error) {
      res.status(500).json({message: error.message})
  }
})

app.get('/', (req, res) => {
    res.send('Hello NODE API')
})

mongoose.set("strictQuery", false)
mongoose.
connect('mongodb+srv://ShubhamP15:ssp150901@cluster0.p6wvh1n.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to MongoDB')
    app.listen(port, () => {
      console.log(`CRUDNodeAPI app listening on port ${port}`)
    })
}).catch((error) => {
    console.log(error)
})


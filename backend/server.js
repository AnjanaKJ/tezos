const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoute = require('./routes/userRoute');
const depositeRoute = require('./routes/depositeRoute');
//const stockRoute = require('./routes/stockRoute');
//const emailRoute = require('./routes/emailRoute');
//const companyRoute = require('./routes/companyRoute');
//const CompanyStock = require('./models/CompanyStock');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Tezos test system');
});

app.use('/api/users', userRoute);
app.use('/api/deposit', depositeRoute);
//app.use('/api/users', emailRoute);
//app.use('/api/stock', stockRoute);
//app.use('/api/list', companyRoute);

mongoose.connect('mongodb://127.0.0.1:27017/tezos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
  process.exit(1);
});

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoute = require('./routes/userRoute');
const depositRoute = require('./routes/depositRoute');
const transferRoute = require('./routes/transferRoute');
const balanceRoute = require('./routes/balanceRoute');
//const companyRoute = require('./routes/companyRoute');
//const CompanyStock = require('./models/CompanyStock');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Tezos test system');
});

app.use('/api/users', userRoute);
app.use('/api/deposit', depositRoute);
app.use('/api/transfer', transferRoute);
app.use('/api/balance', balanceRoute);
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

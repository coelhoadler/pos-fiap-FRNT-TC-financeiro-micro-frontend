require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongooseConnection = require('./database/dbConnection');
const accountRoutes = require('./routes/AccountRoutes');
const AccountTypeRoutes = require('./routes/AccountTypeRoutes');
const profileRoutes = require('./routes/ProfileRoutes');
const transactionRoutes = require('./routes/TransactionRoutes');
const typeTransactionRoutes = require('./routes/TypeTransactionRoutes');


const app = express();
app.use(cors());
app.use(express.json());

mongooseConnection().then(() => {
  console.log("Conexão com o MongoDB estabelecida com sucesso!");
}).catch((err) => {
  console.error("Erro ao conectar ao MongoDB:", err);
});

app.use('/api/accounts', accountRoutes);
app.use('/api/account-types', AccountTypeRoutes); 
app.use('/api/profiles', profileRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/type-transactions', typeTransactionRoutes);

app.get('/', (req, res) => {
  res.send('API rodando!');
});

app.listen(3000, () => console.log("API rodando na porta 3000"));

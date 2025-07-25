require('dotenv').config();

const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require('cors');
const mongooseConnection = require('./database/dbConnection');
const accountRoutes = require('./routes/AccountRoutes');
const AccountTypeRoutes = require('./routes/AccountTypeRoutes');
const profileRoutes = require('./routes/ProfileRoutes');
const transactionRoutes = require('./routes/TransactionRoutes');
const typeTransactionRoutes = require('./routes/TypeTransactionRoutes');
const userRoutes = require('./routes/UserRoutes');

const app = express();

const corsOptions = {
  origin: 'http://localhost:9000', 
  credentials: true,              
};

app.use(cors(corsOptions));
// app.use(cors());
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET)); 


app.get('/', (req, res) => {
  res.send('API rodando!');
});

app.use('/api/accounts', accountRoutes);
app.use('/api/account-types', AccountTypeRoutes); 
app.use('/api/profiles', profileRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/type-transactions', typeTransactionRoutes);
app.use('/api/user', userRoutes);

mongooseConnection.mongooseConnection()
  .then(() => {
    console.log("✅ Conexão com o MongoDB estabelecida com sucesso!");
    app.listen(3000, () => console.log("🚀 API rodando na porta 3000"));
  })
  .catch((err) => {
    console.error("❌ Erro ao conectar ao MongoDB:", err);
  });

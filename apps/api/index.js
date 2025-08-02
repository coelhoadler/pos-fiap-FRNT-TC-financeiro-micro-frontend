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
const authenticateToken = require('./middleware/autenticateToken');

const app = express();

const corsOptions = {
  origin: [
    'http://localhost:9000',
    'https://main.d25xvicp4sjatv.amplifyapp.com'    
  ], // Adicione o seu domínio frontend
  credentials: true,              
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET)); 


app.get('/', (req, res) => {
  res.send('API rodando!');
});

app.use('/api/accounts', authenticateToken, accountRoutes);
app.use('/api/account-types',authenticateToken, AccountTypeRoutes); 
app.use('/api/profiles', authenticateToken, profileRoutes);
app.use('/api/transactions', authenticateToken, transactionRoutes);
app.use('/api/type-transactions', authenticateToken, typeTransactionRoutes);
app.use('/api/user', userRoutes);

mongooseConnection.mongooseConnection()
  .then(() => {
    console.log("✅ Conexão com o MongoDB estabelecida com sucesso!");
    app.listen(3000, () => console.log("🚀 API rodando na porta 3000"));
  })
  .catch((err) => {
    console.error("❌ Erro ao conectar ao MongoDB:", err);
  });

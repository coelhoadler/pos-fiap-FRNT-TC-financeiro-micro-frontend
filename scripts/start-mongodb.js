const { MongoClient } = require("mongodb");

const uri = "mongodb://admin:admin123@localhost:27017";

async function test() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log("✅ Conexão bem-sucedida com o MongoDB!");
    await client.close();
  } catch (err) {
    console.error("❌ Erro ao conectar no MongoDB:", err.message);
  }
}

test();

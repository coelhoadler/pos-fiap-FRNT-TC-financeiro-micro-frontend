import React, { useEffect, useState } from "react";

const UsuarioLogado: React.FC = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/user/info", {
      method: "GET",
      credentials: "include",
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setUser({ name: data.name, email: data.email });
          console.log(data);
        } else {
          setErro("Usuário não autenticado.");
        }
      })
      .catch(() => setErro("Erro ao buscar usuário."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ color: "yellow" }}>Carregando...</div>;
  if (erro) return <div style={{ color: "red" }}>{erro}</div>;
  if (!user) return <div style={{ color: "red" }}>Usuário não autenticado.</div>;

  return (
    <div style={{ padding: 32 }}>
      <h2 style={{ color: "blue" }}>Bem-vindo, {user.name}!</h2>
      <p style={{ color: "green" }}>Você está logado no sistema.</p>
      
    </div>
  );
};

export default UsuarioLogado; 
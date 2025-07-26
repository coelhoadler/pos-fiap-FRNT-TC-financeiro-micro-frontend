import React, { useEffect, useState } from "react";

const UsuarioLogado: React.FC = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
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
  }, []);

  if (erro) return <div >{erro}</div>;
  if (!user) return <div>Usuário não autenticado.</div>;

  return (
    <div>
      <h2>Bem-vindo, {user.name}!</h2>
      <p >Você está logado no sistema.</p>
    </div>
  );
};

export default UsuarioLogado; 
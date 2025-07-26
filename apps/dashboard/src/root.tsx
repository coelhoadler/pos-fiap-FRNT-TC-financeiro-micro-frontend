import "./index.css";
import UsuarioLogado from "./UsuarioLogado";

export default function Root(props) {
  return (
    <>
      <UsuarioLogado />
    </>
  );
  // return <section className="bg-primary text-yellow-600">{props.name} is mounted!</section>;
}

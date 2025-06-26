import './index.css';

export default function Root(props) {
  return <section className="bg-primary text-green-500">{props.name} is mounted!</section>;
}

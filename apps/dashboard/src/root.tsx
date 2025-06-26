import './index.css';

export default function Root(props) {
  return <section className="bg-primary text-yellow-600">{props.name} is mounted!</section>;
}

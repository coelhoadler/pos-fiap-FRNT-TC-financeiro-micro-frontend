import Home from './components/Home/home';
import './index.css';

export default function Root(props) {
  return <Home />;
  <section className="bg-primary text-green-500">{props.name} is mounted!</section>;
}

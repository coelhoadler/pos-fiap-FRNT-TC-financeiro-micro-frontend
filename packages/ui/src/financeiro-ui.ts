// Export shared components
import './styles/index.css';

export { Button } from './components/generic/button';
export { Header } from './components/dashboard/Header';
export { default as CustomModal } from './components/generic/customModal';

export { Input } from './components/generic/input';
export { Label } from './components/generic/label';
export { Message } from './components/generic/messages';

export { loginRequest } from './features/login/slice';
export { loginSuccess } from './features/login/slice';
export { loginFailure } from './features/login/slice';
export { logoutRequest } from './features/login/slice';

export { Footer } from './components/login/footer';
export { default as HeaderLogin } from './components/login/header';

export { default as store } from './store/login';

export { DesktopMenu, MenuItens, MobileMenu } from './components/dashboard/MobileMenu';
export { Title } from './components/dashboard/Title';

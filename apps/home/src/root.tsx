import React from 'react';
import ReactDOM from 'react-dom/client';
import singleSpaReact from 'single-spa-react';
import App from './App';
import type { AppProps } from 'single-spa';

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient: ReactDOM,
  rootComponent: App,
  errorBoundary(_err, _info, _props) {
    console.error('[Home] ⚠️ Erro dentro do React');
    return <div>Erro no microfrontend Home</div>;
  },
});

export const bootstrap = async (props: AppProps) => {
  console.log('[Home] 🚀 bootstrap');
  return lifecycles.bootstrap(props);
};

export const mount = async (props: AppProps) => {
  console.log('[Home] ✅ mount');
  return lifecycles.mount(props);
};

export const unmount = async (props: AppProps) => {
  console.log('[Home] ❌ unmount');
  return lifecycles.unmount(props);
};

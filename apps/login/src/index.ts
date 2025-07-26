import React from "react";
import ReactDOM from "react-dom/client";
import singleSpaReact from "single-spa-react";
import Root from "./root"; // <- seu componente
import { AppProps } from "single-spa";

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient: ReactDOM,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    console.error("Error in single-spa application:", err, info, props);
    return React.createElement("div", null, "Error loading application");
  },
});

export const bootstrap = (props: AppProps) => lifecycles.bootstrap(props);
export const mount = (props: AppProps) => lifecycles.mount(props);
export const unmount = (props: AppProps) => lifecycles.unmount(props);

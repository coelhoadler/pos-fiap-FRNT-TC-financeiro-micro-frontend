import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";

import microfrontendLayout from './microfrontend-layout.html';

function limparExportDefault(conteudo){
  const regex = /^export\s+default\s+["`](.*)["`];?$/s;
  const match = conteudo.match(regex);
  return match ? match[1] : conteudo;
}

const layoutString = limparExportDefault(microfrontendLayout);
console.log("Layout content:", layoutString);

const routes = constructRoutes(layoutString);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    // return System.import(name);
    return import(/* webpackIgnore: true */ name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
layoutEngine.activate();
start();

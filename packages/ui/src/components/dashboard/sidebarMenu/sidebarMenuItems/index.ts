import { Routes } from '../../../../enums/routes';
import {  TSideBarMenuItems } from '../../../../types/generic/TSideBarMenu';

export const sideBarMenuItems: TSideBarMenuItems[] = [
  {
    title: 'Inicio',
    path: Routes.DASHBOARD,
  },
  {
    title: 'Transferências',
    path: Routes.TRANSFERENCIAS,
  },
  {
    title: 'Investimentos',
    path: Routes.INVESTIMENTOS,
  },
  {
    title: 'Outros serviços',
    path: Routes.OUTROS_SERVICOS,
  },
];
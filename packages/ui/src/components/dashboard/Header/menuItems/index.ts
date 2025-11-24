import { TMenuLinksItems } from '../../../../types/generic/TMenu';
import { Routes } from '../../../../enums/routes';

export const DashboardMenuItems: TMenuLinksItems[] = [
  {
    text: 'Inicio',
    href: Routes.DASHBOARD,
  },
  {
    text: 'Transferências',
    href: Routes.TRANSFERENCIAS,
  }
];
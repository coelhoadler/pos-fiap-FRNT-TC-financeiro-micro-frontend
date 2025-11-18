import { TMenuLinksItems } from '../../../../types/generic/TMenu';
import { Routes } from '../../../../enums/routes';
// TODO: Criar um enum para os links do menu
export const DashboardMenuItems: TMenuLinksItems[] = [
  {
    text: 'Inicio',
    href: Routes.DASHBOARD,
  },
  {
    text: 'Transferências',
    href: Routes.TRANSFERENCIAS,
  },
  {
    text: 'Investimentos',
    href: Routes.INVESTIMENTOS,
  },
  {
    text: 'Outros serviços',
    href: Routes.OUTROS_SERVICOS,
  },
];
import { IS_WEB_DISPLAYED_ON_MOBILE, TsdLayoutsMenuSection } from 'src/app/layouts';

const showedInMobile = IS_WEB_DISPLAYED_ON_MOBILE;
const urlExt = showedInMobile ? 'mobile' : 'web';

export const GENERAL_SNAV_ITEMS: TsdLayoutsMenuSection[] = [
  {
    title: 'General',
    urlExtension: `general`,
    items: [
      {
        label: 'Permisos',
        urlExtension: `permisos/${urlExt}`,
        icon: '🔑',
        subitems: [{ label: 'Gestionar', url: 'manage' }],
      },
    ],
  },
];

import { IS_WEB_DISPLAYED_ON_MOBILE, TsdLayoutsMenuSection } from './layouts';
import { GENERAL_SNAV_ITEMS } from '@navigation/general';

const showedInMobile = IS_WEB_DISPLAYED_ON_MOBILE;
const urlExt = showedInMobile ? 'mobile' : 'web';

export const APP_NAVIGATION: TsdLayoutsMenuSection[] = [
  {
    title: 'Principal',
    items: [{ label: 'Dashboard', icon: '📊', active: true, url: '' }],
  },
  ...GENERAL_SNAV_ITEMS,
];

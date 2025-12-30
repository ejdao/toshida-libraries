export interface TsdLayoutsNavItem {
  label: string;
  icon?: string;
  urlExtension?: string;
  url?: string;
  active?: boolean;
  subitems?: TsdLayoutsNavItem[];
  expanded?: boolean;
}

export interface TsdLayoutsMenuSection {
  title: string;
  urlExtension?: string;
  items: TsdLayoutsNavItem[];
}

export const IS_WEB_DISPLAYED_ON_MOBILE =
  navigator.userAgent.match(/Android/i) ||
  navigator.userAgent.match(/webOS/i) ||
  navigator.userAgent.match(/iPhone/i) ||
  navigator.userAgent.match(/iPad/i) ||
  navigator.userAgent.match(/iPod/i) ||
  navigator.userAgent.match(/BlackBerry/i) ||
  navigator.userAgent.match(/Windows Phone/i)
    ? true
    : false;

export type TakSnavIconsType = 'material-icon' | 'img';
export type TakSnavItemType = 'link' | 'collection' | 'dropdown';

export interface TakSnavItems {
  name: string;
  icon?: string;
  url?: string;
  type: TakSnavItemType;
  urlIsNotAutoCompleted?: boolean;
  dropdownLinks?: TakSnavDropdownLink[];
  objects?: TakSnavItems[];
  authorities?: string[];
  disableOnContexts?: string[];
  showCollectionContent?: boolean;
  forceDisabledContent?: boolean;
  showForWeb?: boolean;
  showForMobile?: boolean;
  isOpened?: boolean;
}

export interface TakSnavDropdownLink {
  name: string;
  url: string;
  urlIsNotAutoCompleted?: boolean;
  authorities?: string[];
  disableOnContexts?: string[];
  forceDisabledContent?: boolean;
  showForWeb?: boolean;
  showForMobile?: boolean;
}

export interface BaseAppNavItem {
  name: string;
  // e.g., application:write
  // If any of the permission is granted, the config (and its descants) will be rendereed.
  permissions?: string[];
}

export interface AppNavItemContainer<T extends BaseAppNavItem> {
  children?: T[];
}

export interface AppNavItemConfig extends BaseAppNavItem {
  routerLink?: (string | any)[];
}

export interface AppNavPrimaryItemConfig
  extends AppNavItemConfig,
    AppNavItemContainer<AppNavItemConfig> {
  icon?: string;
}

export interface AppNavCategoryConfig
  extends BaseAppNavItem,
    AppNavItemContainer<AppNavPrimaryItemConfig> {
  showSeparator?: boolean;
}

export interface AppNavConfig {
  categories: AppNavCategoryConfig[];
  // TODO: more attributes can be added here:
}

// ! Don't use me:
export function isPrimaryNavConfigItem(
  navConfigItem: AppNavPrimaryItemConfig | AppNavItemConfig
): navConfigItem is AppNavPrimaryItemConfig {
  return !!(navConfigItem as AppNavPrimaryItemConfig).children;
}

export interface AppNavActiveItem {
  config?: AppNavItemConfig;
  path?: string;
}

import { AppNavConfig } from "./types";

export interface PermissionsContainer {
  permissions?: string[];
  children?: PermissionsContainer[];
  categories?: PermissionsContainer[];
}

export type ResourcePermissions = { [resourceType: string]: string[] };

export function getNavConfigResourceTypes(navConfig: AppNavConfig): string[] {
  return unique(
    getAllNavItemPermissions(navConfig).map(permission =>
      permission.split(":")[0].trim()
    )
  );
}

export function filterNavConfigByPermissions(
  navConfig: AppNavConfig,
  resourcePermissions: ResourcePermissions
): AppNavConfig {
  const flatResourcePermissions = unique(
    Object.values(resourcePermissions).flat()
  );

  function permissionCheck(item: { permissions?: string[] }) {
    return (
      !item.permissions ||
      item.permissions.some(permission =>
        flatResourcePermissions.includes(permission.trim())
      )
    );
  }

  const newNavConfig = {
    categories: navConfig.categories
      .filter(category => permissionCheck(category))
      .map(category => {
        const newCategory = { ...category };
        if (newCategory.children) {
          newCategory.children = newCategory.children
            .filter(primaryItem => permissionCheck(primaryItem))
            .map(primaryItem => {
              const newPrimaryItem = { ...primaryItem };
              if (newPrimaryItem.children) {
                newPrimaryItem.children = newPrimaryItem.children.filter(item =>
                  permissionCheck(item)
                );
              }
              return newPrimaryItem;
            });
        }
        return newCategory;
      })
  };

  return newNavConfig;
}

export function getAllNavItemPermissions(
  navItem: PermissionsContainer
): string[] {
  const childrenPermissions = (
    navItem.children ||
    navItem.categories ||
    []
  ).flatMap(item => getAllNavItemPermissions(item));
  return [...getNavItemPermissions(navItem), ...childrenPermissions];
}

export function getNavItemPermissions(item: {
  permissions?: string[];
}): string[] {
  return item.permissions || [];
}

export function unique<T>(input: T[]) {
  return Array.from(new Set(input));
}

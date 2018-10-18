import "core-js/features/array";

import {
  getNavConfigResourceTypes,
  filterNavConfigByPermissions
} from "./util";
import navConfig from "./nav-config";
import permissions from "./permissions";

console.log(getNavConfigResourceTypes(navConfig));

console.log(
  JSON.stringify(filterNavConfigByPermissions(navConfig, permissions), null, 4)
);

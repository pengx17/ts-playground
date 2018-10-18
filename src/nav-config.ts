import { AppNavConfig } from "./types";

const DEFAULT_CONFIG: AppNavConfig = {
  categories: [
    {
      name: 'nav_container_computing',
      showSeparator: true,
      permissions: ['hehe:view'],
      children: [
        {
          icon: 'basic:application_s',
          name: 'application',
          routerLink: ['app'],
          permissions: ['hehe:create'],
        },
        { icon: 'basic:gears_s', name: 'config', routerLink: ['configmap'] },
        {
          icon: 'basic:route_s',
          name: 'network',
          children: [
            { name: 'kube_service', routerLink: ['service'], permissions: ['hehe:create'], },
            { name: 'network_policy', routerLink: ['network_policy'] },
          ],
        },
      ],
    },
    {
      name: 'nav_devops',
      children: [
        {
          icon: 'basic:jenkins',
          name: 'nav_jenkins_pipelines',
          children: [
            {
              name: 'nav_jenkins_pipelines',
              routerLink: ['jenkins', 'pipelines'],
              permissions: ['hehe:create', 'haha:update']
            },
            {
              name: 'nav_jenkins_histories',
              routerLink: ['jenkins', 'histories'],
            },
          ],
        },
      ],
    },
  ],
};

export default DEFAULT_CONFIG;

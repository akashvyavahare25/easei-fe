export let getMenuData: any[] = [
  /* {
    category: true,
    title: 'Settings',
  }, */
  {
    title: 'Home',
    key: 'Home',
    icon: 'fe fe-database',
    url: '/home',
    permission: ['-', 'admin', 'superadmin'],
  },
  {
    title: 'Define Parameter',
    key: 'parameter',
    icon: 'fe fe-home',
    permission: ['parameter', 'admin', 'superadmin'],
    // roles: ['admin'], // set user roles with access to this route
    /* count: 4, */
    children: [
      {
        title: 'Create',
        key: 'create',
        url: 'parameter/create',
        permission: ['parameter:create', 'admin', 'superadmin']
      },
      {
        title: 'All',
        key: 'all',
        url: 'parameter/all',
        permission: ['parameter:all', 'admin', 'superadmin']
      },
    ],
  },
  {
    title: 'Define Master',
    key: 'master',
    icon: 'fe fe-database',
    permission: ['define master', 'admin', 'superadmin'],
    // roles: ['admin'], // set user roles with access to this route
    /* count: 4, */
    children: [
      {
        title: 'Create',
        key: 'create',
        url: 'master/create',
        permission: ['define master:create', 'admin', 'superadmin'],
      },
      {
        title: 'All',
        key: 'all',
        url: 'master/all',
        permission: ['define master:all', 'admin', 'superadmin'],
      },
    ],
  },
  // {
  //   title: 'File',
  //   key: 'file-upload',
  //   icon: 'fe fe-database',
  //   permission: ['-', 'admin', 'superadmin'],
  //   children: [
  //     {
  //       title: 'File-Upload',
  //       key: 'upload',
  //       url: 'file-upload/upload',
  //       permission: ['-', 'admin', 'superadmin'],
  //     },
  //     {
  //       title: 'Template-Upload',
  //       key: 'template',
  //       url: 'file-upload/template',
  //       permission: ['-', 'admin', 'superadmin'],
  //     },
  //   ],
  
  // },
  // {
  //   title: 'File',
  //   key: 'upload',
  //   icon: 'fe fe-database',
  //   // url: '/file-template',
  //   permission: ['-', 'admin', 'superadmin'],
  //   children: [
  //     {
  //       title: 'Template-Upload',
  //       key: 'create',
  //       url: '/file-template/create',
  //       permission: ['-', 'admin', 'superadmin'],
  //     },
  
  //   ],
  //   // roles: ['admin'], // set user roles with access to this route
  //   /* count: 4, */
  
  // },
  // {
  //   title: 'Define Report',
  //   key: 'report',
  //   icon: 'fe fe-database',
  //   permission: ['-', 'admin', 'superadmin'],
  //   roles: ['admin', 'superadmin'],
  //   /* count: 4, */
  //   children: [
  //     {
  //       title: 'Create',
  //       key: 'create',
  //       url: 'report/create',
  //       permission: ['-', 'admin', 'superadmin'],
  //     },
  //     {
  //       title: 'All',
  //       key: 'all',
  //       url: 'report/all',
  //       permission: ['-', 'admin', 'superadmin'],
  //     },
  //   ],
  // },
  /* {
    title: 'Define Screen',
    key: 'screen',
    icon: 'fe fe-monitor',
    permission: ['screen', 'admin', 'superadmin'],
    children: [
      {
        title: 'Create',
        key: 'create',
        url: 'screen/create',
        permission: ['screen:create', 'admin', 'superadmin']
      },
      {
        title: 'All',
        key: 'all',
        url: 'screen/all',
        permission: ['screen:all', 'admin', 'superadmin'],
      },
    ],
  }, */
  // {
  //   title: 'Define Rules',
  //   key: 'rules',
  //   icon: 'fe fe-database',
  //   permission: ['-', 'admin', 'superadmin'],
  //   children: [
  //     {
  //       title: 'Create',
  //       key: 'create',
  //       url: 'rules/create',
  //       permission: ['-', 'admin', 'superadmin']
  //     },
  //     {
  //       title: 'All',
  //       key: 'all',
  //       url: 'rules/all',
  //       permission: ['-', 'admin', 'superadmin'],
  //     },
  //   ],
  // },
  // {
  //   title: 'Define Upload',
  //   key: 'upload',
  //   icon: 'fe fe-database',
  //   permission: ['-', 'admin', 'superadmin'],
  //   roles: ['admin', 'superadmin'],
  //   // roles: ['admin'], // set user roles with access to this route
  //   /* count: 4, */
  //   children: [
  //     {
  //       title: 'Create',
  //       key: 'create',
  //       url: 'upload/create',
  //       permission: ['-', 'admin', 'superadmin'],
  //       roles: ['admin', 'superadmin'],
  //     },
  //     {
  //       title: 'All',
  //       key: 'all',
  //       url: 'upload/all',
  //       permission: ['-', 'admin', 'superadmin'],
  //       roles: ['admin', 'superadmin'],
  //     },
  //   ],
  // },
  // {
  //   title: 'Define Job',
  //   key: 'job',
  //   icon: 'fe fe-database',
  //   permission: ['-', 'admin', 'superadmin'],
  //   roles: ['admin', 'superadmin'],
  //   // roles: ['admin'], // set user roles with access to this route
  //   /* count: 4, */
  //   children: [
  //     {
  //       title: 'Create',
  //       key: 'create',
  //       url: 'job/create',
  //       permission: ['-', 'admin', 'superadmin'],
  //       roles: ['admin', 'superadmin'],
  //     },
  //     {
  //       title: 'All',
  //       key: 'all',
  //       url: 'job/all',
  //       permission: ['-', 'admin', 'superadmin'],
  //       roles: ['admin', 'superadmin'],
  //     },
  //   ],
  // },

  // {
  //   title: 'Define Hierarchy',
  //   key: 'Hierarchy',
  //   icon: 'fe fe-database',
  //   permission: ['-', 'admin', 'superadmin'],
  //   roles: ['admin', 'superadmin'],
  //   // roles: ['admin'], // set user roles with access to this route
  //   /* count: 4, */
  //   children: [
  //     {
  //       title: 'Create',
  //       key: 'create',
  //       url: 'hierarcy/create',
  //       permission: ['-', 'admin', 'superadmin'],
  //       roles: ['admin', 'superadmin'],
  //     },
  //     {
  //       title: 'All',
  //       key: 'all',
  //       url: 'hierarcy/all',
  //       permission: ['-', 'admin', 'superadmin'],
  //     },
  //   ],
  // },
  // {
  //   title: 'Define Dashboard',
  //   key: 'dashboard',
  //   icon: 'fe fe-database',
  //   permission: ['-', 'admin', 'superadmin'],
  //   roles: ['admin', 'superadmin'],
  //   // roles: ['admin'], // set user roles with access to this route
  //   /* count: 4, */
  //   children: [
  //     {
  //       title: 'Create',
  //       key: 'create',
  //       url: 'dashboard/create',
  //       permission: ['-', 'admin', 'superadmin'],
  //       roles: ['admin', 'superadmin'],
  //     },
  //     {
  //       title: 'All',
  //       key: 'all',
  //       url: 'dashboard/all',
  //       permission: ['-', 'admin', 'superadmin'],
  //       roles: ['admin', 'superadmin'],
  //     },
  //   ],
  // },
  // {
  //   title: 'Define Virtual Widget',
  //   key: 'virtual',
  //   icon: 'fe fe-database',
  //   permission: ['-', 'admin', 'superadmin'],
  //   roles: ['admin', 'superadmin'],
  //   // roles: ['admin'], // set user roles with access to this route
  //   /* count: 4, */
  //   children: [
  //     {
  //       title: 'Create',
  //       key: 'create',
  //       url: 'visual/create',
  //       permission: ['-', 'admin', 'superadmin'],
  //       roles: ['admin', 'superadmin'],
  //     },
  //     {
  //       title: 'All',
  //       key: 'all',
  //       url: 'visual/all',
  //       permission: ['-', 'admin', 'superadmin'],
  //       roles: ['admin', 'superadmin'],
  //     },
  //   ],
  // },
  {
    title: 'Masters',
    key: 'masters',
    icon: 'fe fe-database',
    url: 'masters/list',
    permission: ['-', 'admin', 'superadmin'],
  },
 /*  {
    title: 'Matser Permission',
    key: 'masterPermission',
    icon: 'fe fe-user',
    url: 'masterPermission/permission',
  }, */
  {
    title: 'Hierarchy',
    key: 'createhierarchy',
    icon: 'fe fe-user',
    url: 'create-hierarchy/find',        
    roles: ['admin', 'superadmin'],
    // children: [
    //       {
    //         title: 'Create',
    //         key: 'create',
    //         url: 'create-hierarchy/create',           
    //         roles: ['admin', 'superadmin'],
    //       },
    //       {
    //         title: 'Search',
    //         key: 'all',
    //         url: 'create-hierarchy/find',        
    //         roles: ['admin', 'superadmin'],
    //       },
    //     ],
  },
 /* {
    title: 'Define Roles',
    key: 'roles',
    icon: 'fe fe-home',
    permission: ['-', 'admin', 'superadmin'],
    // roles: ['admin'], // set user roles with access to this route
    /* count: 4,  
    children: [
      {
        title: 'Create',
        key: 'create',
        url: 'roles/create',
        permission: ['-', 'admin', 'superadmin']
      },
      {
        title: 'All',
        key: 'all',
        url: 'roles/all',
        permission: ['-', 'admin', 'superadmin']
      },
    ],
  }, */
  {
    title: 'Users',
    key: 'userManagement',
    icon: 'fe fe-user',
    url: 'user/list',
    permission: ['-', 'admin', 'superadmin'],
  },
 /*  {
    title: 'Roles',
    key: 'roleManagement',
    icon: 'fe fe-user',
    url: 'role/list',
    permission: ['-', 'admin', 'superadmin'],
    roles: ['admin', 'superadmin'],
  }, */ 
  //  {
  //   title: 'Help',
  //   key: 'helpManagement',
  //   icon: 'fe fe-user',
  //   url: 'help/list',
  //   permission: ['-', 'admin', 'superadmin'],
  //   roles: ['admin', 'superadmin'],
  // }, 
  // {
  //   title: 'Workflow Snap',
  //   key: 'workflow',
  //   icon: 'fe fe-layers',
  //   permission: ['-', 'admin', 'superadmin'],
  //   roles: ['admin', 'superadmin'],
  //   children: [
  //     {
  //       title: 'history',
  //       key: 'history',
  //       url: 'workflow/history',
  //       permission: ['-', 'admin', 'superadmin'],
  //       roles: ['admin', 'superadmin'],
  //     }
  //   ],
  // },
  // {
  //   title: 'Notification',
  //   key: 'notification',
  //   icon: 'fe fe-layers',
  //   permission: ['-', 'admin', 'superadmin'],
  //   children: [
  //     {
  //       title: 'All',
  //       key: 'all',
  //       url: 'notification/all',
  //       permission: ['-', 'admin', 'superadmin'],
  //     },
  //   ],
  // },
  // {
  //   title: 'Approval Workflow',
  //   key: 'approvalWorkflow',
  //   icon: 'fe fe-layers',
  //   permission: ['-', 'admin', 'superadmin'],
  //   children: [
  //     {
  //       title: 'Create',
  //       key: 'create',
  //       url: 'approval/workflow',
  //       permission: ['-', 'admin', 'superadmin'],
  //     },
  //     {
  //       title: 'All',
  //       key: 'all',
  //       url: 'approval/all',
  //       permission: ['-', 'admin', 'superadmin'],
  //     },
  //   ],
  //   // url: '/approval/workflow',
  // },
  // {
  //   title: 'Application Master',
  //   key: 'appMaster',
  //   icon: 'fe fe-layers',
  //   permission: ['application master', 'admin', 'superadmin'],
  //   children: [
  //     {
  //       title: 'Create',
  //       key: 'create',
  //       url: 'appmaster/create',
  //       permission: ['application master:create', 'admin', 'superadmin'],
  //     },
  //     {
  //       title: 'All',
  //       key: 'all',
  //       url: 'appmaster/all',
  //       permission: ['application master:all', 'admin', 'superadmin'],
  //     },
  //   ],
  // },
  // {
  //   category: true,
  //   title: 'Permissions',
  //   roles: ['admin', 'superadmin'],
  // },
  // {
  //   title: 'Permission',
  //   key: 'permission',
  //   icon: 'fe fe-lock',
  //   roles: ['admin', 'superadmin'],
  //   permission: ['-', 'admin', 'superadmin'],
  //   children: [
  //     {
  //       title: 'Create',
  //       key: 'create',
  //       url: 'permission/create',
  //     },
  //   ],
  // },
  // {
  //   title: 'Define Interface',
  //   key: 'interface',
  //   icon: 'fe fe-database',
  //   permission: ['screen', 'admin', 'superadmin'],
  //   children: [
  //     {
  //       title: 'Create',
  //       key: 'create',
  //       url: '/interface/create',
  //       permission: ['interface:create', 'admin', 'superadmin']
  //     },
  //     {
  //       title: 'All',
  //       key: 'all',
  //       url: '/interface/all',
  //       permission: ['interface:all', 'admin', 'superadmin'],
  //     },
  //   ],
  // },
  {
    title: 'Customer',
    key: 'customer',
    icon: 'fe fe-layers',
    permission: ['-', 'admin', 'superadmin'],
    children: [
      {
        title: 'Assign Logo',
        key: 'create',
        url: 'customer/logo',
        permission: ['-', 'admin', 'superadmin'],
      },
      // {
      //   title: 'All',
      //   key: 'all',
      //   url: 'customer/all',
      //   permission: ['-', 'admin', 'superadmin'],
      // },
    ],
  }, 
 /*  {
    title: 'Plant Layout',
    key: 'plantLayout',
    icon: 'fe fe-user',
    url: 'plantLayout/plant',
  },
  {
    title: 'NCU Layout',
    key: 'ncuLayout',
    icon: 'fe fe-user',
    url: 'ncuLayout/ncu',
  },
  {
    title: 'BotAnalyticsPage',
    key: 'BotAnalytics',
    icon: 'fe fe-user',
    url: 'botAnalytics/bot',
  }, */
  // {
  //   title: 'Project',
  //   key: 'project',
  //   icon: 'fe fe-layers',
  //   permission: ['-', 'admin', 'superadmin'],
  //   children: [
  //     {
  //       title: 'Create',
  //       key: 'create',
  //       url: 'project/create',
  //       permission: ['-', 'admin', 'superadmin'],
  //     },
  //     // {
  //     //   title: 'All',
  //     //   key: 'all',
  //     //   url: '/project/all',
  //     //   permission: ['-', 'admin'],
  //     // },
  //   ],
  // },
  /* {
    category: true,
    title: 'Apps',
  }, */
]

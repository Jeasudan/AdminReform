import Layout from '@/layout'

const treeRouter = {
  path: '/tree',
  component: Layout,
  redirect: '/tree/actionOnPop/index.vue',
  name: 'Tree',
  meta: {
    title: 'Tree',
    icon: 'tree-table'
  },
  children: [
    {
      path: 'actionOnPop-tree',
      component: () => import('@/views/tree/actionOnPop/index'),
      name: 'actionOnPopTree',
      meta: { title: 'actionOnPopTree' }
    },
    {
      path: 'actionOnLine-tree',
      component: () => import('@/views/tree/actionOnLine/index'),
      name: 'actionOnLineTree',
      meta: { title: 'actionOnLineTree' }
    },
    // {
    //   path: 'inline-edit-table',
    //   component: () => import('@/views/table/inline-edit-table'),
    //   name: 'InlineEditTable',
    //   meta: { title: 'Inline Edit' }
    // },
    // {
    //   path: 'complex-table',
    //   component: () => import('@/views/table/complex-table'),
    //   name: 'ComplexTable',
    //   meta: { title: 'Complex Table' }
    // }
  ]
}
export default treeRouter
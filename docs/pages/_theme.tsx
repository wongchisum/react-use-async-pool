import React from 'react'
import { createTheme, defaultSideNavs } from 'vite-pages-theme-doc'

import Component404 from './404'

export default createTheme({
  logo: <div style={{ fontSize: '20px' }}>🕶 react-use-async-pool</div>,
  topNavs: [
    {
      label: '首页',
      path: '/',
      activeIfMatch: {
        // match all first-level paths
        path: '/:foo',
        end: true,
      },
    },
    {
      label: '使用',
      path: '/components/Demo',
      activeIfMatch: '/components',
    },
    {
      label:"Github",
      href:"https://github.com/TonicFizzRicky/react-use-async-pool"
    }
  ],
  sideNavs: (ctx) => {
    return defaultSideNavs(ctx, {
      groupConfig: {
        components: {
          demos: {
            label: 'Demos (dev only)',
            order: -1,
          },
          general: {
            label: 'General',
            order: 1,
          },
          'data-display': {
            label: 'Data Display',
            order: 2,
          },
        },
      },
    })
  },
  Component404,
})

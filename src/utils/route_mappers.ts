const createConfig = <U>() => <T extends { [name: string]: U }>(config: T) => {
  return config
}

type Route = {
  path: string
  routePath: (...args: any[]) => string
}

export const routes = createConfig<Route>()({
  home: {
    path: '/',
    routePath: () => '/',
  },
  users: {
    path: '/users',
    routePath: () => '/users',
  },
  user: {
    path: '/user/:slug',
    routePath: (slug: string) => `/user/${slug}`,
  },
})

console.log(routes.user.routePath('user-name'))

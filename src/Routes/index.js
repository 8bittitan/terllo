import Board from './Board'
import Boards from './Boards'
import Login from './Login'
import Settings from './Settings'
import Signup from './Signup'

const routes = [
  {
    path: '/',
    component: Signup,
    exact: true,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/boards',
    component: Boards,
    protected: true,
  },
  {
    path: '/board/:id',
    component: Board,
    protected: true,
  },
  {
    path: '/settings',
    component: Settings,
    protected: true,
  },
]

export default ({ React, Route, Redirect }) => userId =>
  routes.map((route) => {
    if (route.protected && userId === '') {
      return <Redirect key={route.path.replace('/', '')} to="/login" />
    }

    return (
      <Route
        key={route.path.replace('/', '')}
        path={route.path}
        component={route.component}
        exact={route.exact || false}
      />
    )
  })

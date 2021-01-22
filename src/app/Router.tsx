import React from 'react'
import { useSelector } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'

// layouts
import { Main as MainLayout } from 'app/layouts'

// pages
import { LoginPage } from 'features/login'
import {
  ElectionsPage,
  ElectionPage,
  ElectionSettingsPage,
  ElectionKeysPage,
} from 'features/elections'
import { PartiesPage, PartiesPage_Id } from 'features/parties'
import { StudentsPage } from 'features/students'
import { CoursesPage } from 'features/courses'
import { NotFoundPage } from 'features/404'

import { Snackbar } from 'features/snackbar'
import { selectIsAuth } from 'features/app/appSlice'
import useFetchInitialData from './hooks/useFetchInitialData'
import useResponseInterceptor from './hooks/useResponseInterceptor'

const Router: React.FC<{}> = () => {
  const isAuth = useSelector(selectIsAuth)
  return <>{isAuth ? <RouteAuth /> : <RouteGuest />}</>
}

export default Router

//

const RouteGuest: React.FC = () => {
  return (
    <>
      <Switch>
        <Route path="/login" component={LoginPage} exact />
        <Redirect to="/login" from="*" />
      </Switch>
    </>
  )
}

const RouteAuth: React.FC = () => {
  useResponseInterceptor()
  useFetchInitialData()

  return (
    <MainLayout>
      <Switch>
        <Route path="/" component={ElectionsPage} exact />

        <Route path="/elections" component={ElectionsPage} exact />
        <Route path="/elections/:id" component={ElectionPage} exact />
        <Route
          path="/elections/:id/settings"
          layout={MainLayout}
          component={ElectionSettingsPage}
          exact
        />
        <Route path="/elections/:id/keys" component={ElectionKeysPage} exact />

        <Route path="/parties" component={PartiesPage} exact />
        <Route path="/parties/:id" component={PartiesPage_Id} exact />

        <Route path="/students" component={StudentsPage} exact />
        <Route path="/students/courses" component={CoursesPage} exact />

        <Route path="/404-not-found" component={NotFoundPage} exact />
        <Redirect to="/404-not-found" from="*" />
      </Switch>

      <Snackbar />
    </MainLayout>
  )
}

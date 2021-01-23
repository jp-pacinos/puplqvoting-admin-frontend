import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

// layouts
import { Main as MainLayout } from 'app/layouts'

// pages
import {
  ElectionsPage,
  ElectionPage,
  ElectionSettingsPage,
  ElectionKeysPage,
} from 'features/elections'
import { PartiesPage, PartiesPage_Id } from 'features/parties'
import { StudentsPage } from 'features/students'
import { CoursesPage } from 'features/courses'
import { AccountPage } from 'features/account'
import { NotFoundPage } from 'features/404'

// others
import { Snackbar } from 'features/snackbar'
import useFetchInitialData from 'app/hooks/useFetchInitialData'
import useResponseInterceptor from 'app/hooks/useResponseInterceptor'

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

        <Route path="/account" component={AccountPage} exact />

        <Route path="/404-not-found" component={NotFoundPage} exact />
        <Redirect to="/404-not-found" from="*" />
      </Switch>

      <Snackbar />
    </MainLayout>
  )
}

export default RouteAuth

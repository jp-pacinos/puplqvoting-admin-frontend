import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

// layouts
import { RouteWithLayout } from 'common/components'
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
import { NotFoundPage } from 'features/404'

const Router: React.FC<{}> = () => {
  return (
    <Switch>
      <RouteWithLayout path="/" layout={MainLayout} component={ElectionsPage} exact />

      <RouteWithLayout path="/elections" layout={MainLayout} component={ElectionsPage} exact />
      <RouteWithLayout path="/elections/:id" layout={MainLayout} component={ElectionPage} exact />
      <RouteWithLayout
        path="/elections/:id/settings"
        layout={MainLayout}
        component={ElectionSettingsPage}
        exact
      />
      <RouteWithLayout
        path="/elections/:id/keys"
        layout={MainLayout}
        component={ElectionKeysPage}
        exact
      />

      <RouteWithLayout path="/parties" layout={MainLayout} component={PartiesPage} exact />
      <RouteWithLayout path="/parties/:id" layout={MainLayout} component={PartiesPage_Id} exact />

      <RouteWithLayout path="/students" layout={MainLayout} component={StudentsPage} exact />
      <RouteWithLayout path="/students/courses" layout={MainLayout} component={CoursesPage} exact />

      <Route to="/404-not-found" component={NotFoundPage} exact />

      <Redirect to="*" from="/404-not-found" />
    </Switch>
  )
}

export default Router

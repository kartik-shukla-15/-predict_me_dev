import React, { Suspense, lazy } from "react"
import { Router, Switch, Route } from "react-router-dom"
import { history } from "./history"
import { connect } from "react-redux"
// import { Redirect } from "react-router-dom"
import Spinner from "./ToolKit/spinner/Loading-spinner"
// import knowledgeBaseCategory from "./views/pages/knowledge-base/Category"
// import knowledgeBaseQuestion from "./views/pages/knowledge-base/Questions"
import { ContextLayout } from "./Layout/Layout"
const Login = lazy(() => import("./components/Login"))
const Register = lazy(() => import("./components/Register"))
const FileUpload = lazy(() => import("./components/FileUpload"))
const Result = lazy(() => import("./components/Result"))

// Set Layout and Component Using App Route
const RouteConfig = ({ component: Component, fullLayout, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return (
        <ContextLayout.Consumer>
          {context => {
            let LayoutTag =
              fullLayout === true
                ? context.fullLayout
                : context.state.activeLayout === "horizontal"
                ? context.horizontalLayout
                : context.VerticalLayout
            return (
              <LayoutTag {...props} permission={props.user}>
                <Suspense fallback={<Spinner />}>
                  <Component {...props} />
                </Suspense>
              </LayoutTag>
            )
          }}
        </ContextLayout.Consumer>
      )
    }}
  />
)
const mapStateToProps = state => {
  return {
    user: state.auth.login.userRole
  }
}

const AppRoute = connect(mapStateToProps)(RouteConfig)

class AppRouter extends React.Component {
  render() {
    return (
      // Set the directory path if you are deploying in sub-folder
      <Router history={history}>
        <Switch>
        <AppRoute exact path="/" component={FileUpload} />
        <AppRoute path="/results" component={Result} />
        </Switch>
      </Router>
    )
  }
}

export default AppRouter

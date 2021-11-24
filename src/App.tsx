import React from "react"
import Posts from "./Posts"
import { Redirect, Route, Switch } from "react-router"
import PostDetail from "./PostDetail"

export default () => (
  <div>
    <Switch>
      <Route exact path="/" component={Posts} />
      <Route exact path="/posts/:id" component={PostDetail} />
      <Redirect to="/" />
    </Switch>
  </div>
)

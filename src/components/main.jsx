import * as React from "react"
import { Provider } from "react-redux" // eslint-disable-line no-unused-vars
import { createStore } from "redux"
import Home from "./routes/home/content" // eslint-disable-line no-unused-vars
import { AppConfig } from "../config"
import { BrowserRouter, Route } from 'react-router-dom'
import 'bootstrap'

document.title = AppConfig.title;

export default class Main extends React.Component{
  render() {
    return (
      <Provider store={createStore(() => {})}>
        <BrowserRouter>
          <Route exact path="/" component={Home} />
        </BrowserRouter>
      </Provider>
    )
  }
}

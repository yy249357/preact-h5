import { h, Component } from 'preact'
import { Router, route } from 'preact-router'
import { createHashHistory } from 'history'
import Toast, { T } from 'react-toast-mobile'
import 'react-toast-mobile/lib/react-toast-mobile.css'
import Test from './Test'

class Redirect extends Component {
  componentWillMount() {
    route(this.props.to, true)
  }
  render() {
    return null
  }
}
export default class App extends Component {
  render() {
    return (
      <div id="app">
        <Toast />
        <Router history={createHashHistory()}>
          <Redirect path="/" to="/test" />
          <Test path="/test" />
        </Router>
      </div>
    )
  }
}

import { h, Component } from 'preact'
import '../style/page.scss'
import api from '../utils/api'
import { T } from 'react-toast-mobile'

class Test extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentWillMount() {
    document.title = '测试'
  }
  render() {
    return (
      <div>
        <img src={require('../assets/img/index.jpg')} style={{ width: '100vw' }} />
      </div>
    )
  }
}
export default Test

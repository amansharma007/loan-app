import React, {Component} from 'react';
import './css/App.css';
import { Layout, Menu } from 'element-react';
import History from './components/History';
import Calculator from './components/Calculator';
import axios from 'axios';

class App extends Component{

  state = {
    isLoading: true,
    loanDetails : {}
  }

  getData = (type, val) => {
    if(type === 'amount'){
      axios.get(`https://ftl-frontend-test.herokuapp.com/interest?amount=${val}&numMonths=${this.state.loanDetails.numPayments}`)
      .then(res => this.setState({ isLoading: false, loanDetails: res.data }))
    } else {
      axios.get(`https://ftl-frontend-test.herokuapp.com/interest?amount=${this.state.loanDetails.principal.amount}&numMonths=${val}`)
      .then(res => this.setState({ isLoading: false, loanDetails: res.data }))
    }
    console.log("You will get your data when you use axios.", val, type);
  }

  componentWillMount(){
    
  }

  componentWillUpdate(){
    // Set the local storage here, before the state is updated
  }

  componentDidMount(){
    axios.get('https://ftl-frontend-test.herokuapp.com/interest?amount=500&numMonths=6')
    .then(res => this.setState({ isLoading: false, loanDetails: res.data }))
  }

  render() {
    return (
      <div className="App">
        <Layout.Row>
          <Layout.Col span="24">
            <Menu theme="dark" className="el-menu-demo" mode="horizontal">
              <Menu.Item index="0"><span id="AppTitle">Loan App</span></Menu.Item>
            </Menu>
          </Layout.Col>
        </Layout.Row>
        <Layout.Row>
          <Layout.Col span="4" className="left-pane"><History /></Layout.Col>
          <Layout.Col span="20" className="right-pane">
            <Calculator getData={this.getData} data={this.state} />
          </Layout.Col>
        </Layout.Row>
      </div>
    );
  }
}

export default App;

import React, {Component} from 'react';
import './css/App.css';
import { Layout, Menu } from 'element-react';
import History from './components/History';
import Calculator from './components/Calculator';
import axios from 'axios';
import uuid from 'uuid';

class App extends Component{

  state = {
    isLoading: true,
    loanDetails : {},
    history: [],
    selectedId: null
  }

  getData = (type, val) => {
    if(type === 'amount'){
      axios.get(`https://ftl-frontend-test.herokuapp.com/interest?amount=${val}&numMonths=${this.state.loanDetails.numPayments}`)
      .then(res => this.setState({ isLoading: false, loanDetails: res.data }))
    } else {
      axios.get(`https://ftl-frontend-test.herokuapp.com/interest?amount=${this.state.loanDetails.principal.amount}&numMonths=${val}`)
      .then(res => this.setState({ isLoading: false, loanDetails: res.data }))
    }
  }

  addHistory = () => {
    this.setState(state => {
      let lD = state.loanDetails;
      lD.id = uuid.v4();
      const arr = state.history.concat(lD);
      return {
        isLoading: false,
        loanDetails: state.loanDetails,
        history: arr
      }
    })
  }

  changeState = (newDetails) => {
    this.setState({selectedId: newDetails.id});
    this.setState({loanDetails: newDetails});
  }

  resetEverything = () => {
    let dummyState= {
      interestRate: 0.25,
      monthlyPayment: {
        amount: 93,
        currency: "USD"
      },
      numPayments: 6,
      principal: {
        amount: 500,
        currency: "USD"
      }
    }
    //Push current loanDetails to the history array
    if(!this.state.selectedId){
      this.addHistory()
    }
    //Resetting the whole state
    this.setState({ isLoading: false, loanDetails: dummyState });
    this.setState({selectedId: null});
  }

  componentWillMount(){
    //Check if there is already 'loanHistory' present in the local storage. If present, update the state accordingly.
    if(localStorage.getItem('loanHistory')){
      this.setState({
        history: JSON.parse(localStorage.getItem('loanHistory'))
      })
    }
  }

  componentWillUpdate(nextProps, nextState){
    // Update the local storage here with the server fetched data, before the state is updated
    localStorage.setItem('loanHistory', JSON.stringify(nextState.history));
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
          <Layout.Col span="4" className="left-pane">
            <History data={this.state.history} selectedId={this.state.selectedId} changeState={this.changeState}/>
          </Layout.Col>

          <Layout.Col span="20" className="right-pane">
            <Calculator getData={this.getData} data={this.state} resetEverything={this.resetEverything}/>
          </Layout.Col>
        </Layout.Row>

      </div>
    );
  }
}

export default App;

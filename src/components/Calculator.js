import React, {Component} from 'react';
import '../css/RightPane.css'
import { Layout, Button } from 'element-react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';


class Calculator extends Component{

  state = {
    value1: 500
  }

  resetEverything = () => {
    this.setState({value1: 500})
    console.log("Every thing is reset.. Run!!");
  }

  amountSlider = () => {
    const loading = this.props.data.isLoading;
    if(loading){
      return <Slider min={500} max={5000} value={500} onChange={this.props.getData.bind(this, 'amount')} />
    } else {
      return <Slider min={500} max={5000} value={this.props.data.loanDetails.principal.amount} onChange={this.props.getData.bind(this, 'amount')} />
    }
  }

  monthSlider = () => {
    const loading = this.props.data.isLoading;
    if(loading){
      return <Slider min={6} max={24} value={6} onChange={this.props.getData.bind(this, 'month')} />
    } else {
      return <Slider min={6} max={24} value={this.props.data.loanDetails.numPayments} onChange={this.props.getData.bind(this, 'month')} />
    }
  }

  render() {
    const {isLoading, loanDetails} = this.props.data
    return (
      <div id="main-container">
          <Layout.Row>
              <Layout.Col span="16">
                <div className="bg-grey content-block">
                    <h2>Loan Amount</h2>
                    <div className="block">
                      <span className="demonstration">Slide and select the total Loan Amount</span>
                      {/* <pre>{this.state.value1}</pre> */}
                      {this.amountSlider()}
                      {/* <Slider min={500} max={5000} value={this.state.value1} onChange={(val) => {this.setState({value1: val})}} /> */}
                    </div>
                    <h2>Loan Duration</h2>
                    <div className="block">
                      <span className="demonstration">Slide and select the Duration for which you want to take the loan.</span>
                      {this.monthSlider()}
                      {/* <Slider min={6} max={24} value={(!isLoading) ? loanDetails.numPayments : 0} onChange={this.props.getData.bind(this, 'month')} /> */}
                    </div>
                    <Button type="primary" onClick={this.props.resetEverything.bind(this)} style={{borderRadius: 0}}>RESET</Button>
                    <br /><br />
                    <sup><em>Current selection will be saved in History on Reset.</em></sup>
                </div>
              </Layout.Col>
              <Layout.Col span="8">
                <div id="results-section" className="bg-purple content-block">
                    <div className="results-wrapper">
                    <span className="big-text">${(!isLoading) ? (loanDetails.monthlyPayment.amount * loanDetails.numPayments) : ('...')}</span>
                    <br />
                    <sup><em>Total Payable Amount</em></sup>
                    <br />
                    <span className="big-text">${(!isLoading) ? (loanDetails.monthlyPayment.amount) : ('...')}</span>
                    <br />
                    <sup><em>Monthly Payment</em></sup>
                    <br />
                    <span className="big-text">{(!isLoading) ? (Number(loanDetails.interestRate * 100).toPrecision(2)) : ('...')}%</span>
                    <br />
                    <sup><em>Interest Rate</em></sup>
                    </div>
                </div>
              </Layout.Col>
          </Layout.Row>
      </div>
    );
  }
}

export default Calculator;

import React, {Component} from 'react';
import '../css/RightPane.css'
import { Layout, Slider, Button } from 'element-react';

class RightPane extends Component{

  loadSlider = (type) => {
    const loading = this.props.data.isLoading;
    const min = (type === 'amount') ? 500 : 6;
    const max = (type === 'month') ? 24 : 5000;
    
    if(loading){
      return <Slider min={min} max={max} onChange={this.props.getData.bind(this, type)} />
    } else {
      return <Slider min={min} max={max} value={(type === 'amount') ? (this.props.data.loanDetails.principal.amount) : (this.props.data.loanDetails.numPayments)} onChange={this.props.getData.bind(this, type)} />
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
                      {this.loadSlider('amount')}
                      {/* <Slider min={500} max={5000} value={(!isLoading) ? (loanDetails.principal.amount) : 0} onChange={this.props.getData.bind(this, 'amount')} /> */}
                    </div>
                    <h2>Loan Duration</h2>
                    <div className="block">
                      <span className="demonstration">Slide and select the Duration for which you want to take the loan.</span>
                      {this.loadSlider('month')}
                      {/* <Slider min={6} max={24} value={(!isLoading) ? loanDetails.numPayments : 0} onChange={this.props.getData.bind(this, 'month')} /> */}
                    </div>
                    <Button type="primary" style={{borderRadius: 0}}>RESET</Button>
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

export default RightPane;

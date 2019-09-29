import React, {Component} from 'react';

class HistoryItem extends Component{

    getStyle = () => {
        return {
            paddingTop: '10px',
            paddingBottom: '10px',
            cursor: 'pointer',
            color: (this.props.selectedId === this.props.history.id) ? '#20a0ff' : 'black'
        }
    }

  render() {
    return (
        <li style={this.getStyle()} onClick={this.props.changeState.bind(this, this.props.history)}>${this.props.history.principal.amount} Loan, for {this.props.history.numPayments} Months</li>
    );
  }
}

export default HistoryItem;

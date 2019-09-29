import React, {Component} from 'react';
import {Menu} from 'element-react';
import '../css/LeftPane.css';
import HistoryItem from './HistoryItem';

class History extends Component{


  render() {
    const histories = this.props.data;
    return (
        <Menu defaultOpeneds={['1']} className="el-menu-vertical-demo">
        <Menu.SubMenu index="1" title={<span><i className="el-icon-time"></i>History</span>}>
          <ul>
            {histories.map(history => (    
              <HistoryItem key={history.id} selectedId={this.props.selectedId} history={history} changeState={this.props.changeState} />
            ))}
          </ul>
        </Menu.SubMenu>
        
        </Menu>
    );
  }
}

export default History;

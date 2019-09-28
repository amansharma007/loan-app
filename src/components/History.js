import React, {Component} from 'react';
import {Menu} from 'element-react';
import '../css/LeftPane.css';

class LeftPane extends Component{

  render() {
    const numbers = [1,2,3,4];
  const listItems = numbers.map((number) => (
    <Menu.Item key={number} index="{number}">{number}</Menu.Item>
  ))
    return (
        <Menu defaultOpeneds={['1']} className="el-menu-vertical-demo">
        <Menu.SubMenu index="1" title={<span><i className="el-icon-time"></i>History</span>}>
            {listItems}
        </Menu.SubMenu>
        
        </Menu>
    );
  }
}

export default LeftPane;

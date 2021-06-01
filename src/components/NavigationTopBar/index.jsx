import React, { useState } from 'react';
import { Menu } from 'antd';
import { QqOutlined, UnorderedListOutlined, VideoCameraOutlined } from '@ant-design/icons/lib';
import { Link, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginPage from '../Login';
import SortDragTable from '../MovieList';

const NavTopBar = () => {

  const [state, setState] = useState('profile')

  const handleClick = (e) => {
    console.log('click ', e);
    setState(e.key);
  };

    return (
        <Router>
          <Menu onClick={handleClick} selectedKeys={[state]} theme={"dark"} mode="horizontal">
            <Menu.Item key="profile" icon={<QqOutlined spin/>}>
              <Link to={"/profile"}>Profile</Link>
            </Menu.Item>
            <Menu.Item key="SubMenu" icon={<VideoCameraOutlined spin />} >
              <Link to={"/movies"}>Movies</Link>
            </Menu.Item>
            <Menu.Item key="movie-list" icon={<UnorderedListOutlined spin/>}>
              <Link to={"/movie-lists"}>Movie Lists</Link>
            </Menu.Item>
          </Menu>

          <Switch>
            <Route path={"/movies"} > <LoginPage /> </Route>
            <Route path={"/movie-lists"} > <SortDragTable /> </Route>
          </Switch>
        </Router>
    );
}

export default NavTopBar
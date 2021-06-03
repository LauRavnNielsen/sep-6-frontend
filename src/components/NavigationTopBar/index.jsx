import React, { useState } from 'react';
import { Button, Form, Input, Menu, Modal } from 'antd';
import { UnorderedListOutlined, VideoCameraOutlined } from '@ant-design/icons/lib';
import { Link, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MovieTable from '../MoviesTable';
import MovieListTable from '../MovieList';
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const NavTopBar = () => {

  const [state, setState] = useState('movies')

  const handleClick = (e) => {
    console.log('click ', e);
    setState(e.key);
  };

  const [showModal, setShowModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(true)
  const [userExists, setUserExists] = useState("")
  const [wrongPW, setWrongPW] = useState("")
  const [loggedInAs, setLoggedInAs] = useState("")


  const onFinish = (values: any) => {
    console.log('Success:', values);

    createAccount(createAccountURL(values.email, values.username, values.password ), createAccountParams)
  };

  const onFinishLogin = (values: any) => {
    console.log('Success:', values);

    loginAccountGET(loginAccountURL(values.usernameLogin, values.passwordLogin ), loginAccountParams)

    setLoggedInAs(values.usernameLogin);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const wrongPWmsg = (boolean) => {
    if (boolean) {
      setWrongPW("Wrong password or username!")
    } else setWrongPW("")
  }

  const createAccountURL = (email, username, password) => `https://sep6-314408.ew.r.appspot.com/user/Register?userName=${username}&password=${password}&email=${email}`
  const loginAccountURL = (username, password) => `https://sep6-314408.ew.r.appspot.com/user/Login?userName=${username}&password=${password}`

  const createAccountParams = {
    method: "POST"
  }

  const loginAccountParams = {
    method: "GET"
  }

  const createAccount = (url, params) => {
    fetch(url, params).then(data =>{return data.json()}).then(res=> (setShowModal(true), setUserExists("User already exists"))).catch(error=>(setShowModal(false), setUserExists("")));
  }
  const loginAccountGET = (url, params) => {
    fetch(url, params).then(data =>{return data.json()}).then(res=> (setShowLoginModal(!res), wrongPWmsg(!res))).catch(error=>(setWrongPW("Error")));
  }

    return (
      <>
        <Router>
          <Menu onClick={handleClick} selectedKeys={[state]} theme={"dark"} mode="horizontal">
            <Menu.Item key="1234" disabled={true}>
              <strong> Logged in as: {loggedInAs}</strong>
            </Menu.Item>
            <Menu.Item key="movies" icon={<VideoCameraOutlined spin />} >
              <Link to={"/"}>Movies</Link>
            </Menu.Item>
            <Menu.Item key="movieList" icon={<UnorderedListOutlined spin />} >
              <Link to={"/movieList"}>Movie Lists</Link>
            </Menu.Item>

          </Menu>

          <Switch>
            <Route path={"/movieList"} > <MovieListTable username={loggedInAs} /> </Route>
            <Route path={"/"} > <MovieTable username={loggedInAs}/> </Route>
          </Switch>
        </Router>
        <Modal visible={showLoginModal} title={"Login"} width={720} centered footer={""}>
          <Form
            layout={"vertical"}
            name="basic"
            onFinish={onFinishLogin}
            onFinishFailed={onFinishFailed}
          >
            <strong>{wrongPW}</strong>
            <Form.Item
              label="Username"
              name="usernameLogin"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input placeholder={"Username"} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="passwordLogin"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password visibilityToggle placholder={"Input your password"}/>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" >
                Login
              </Button>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="default" htmlType="submit" onClick={() => { setShowModal(true)}}>
                Create Account
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <Modal visible={showModal} title={"Create Account"} width={720} centered onCancel={() => setShowModal(false)} footer={""}>
          <Form
            layout={"vertical"}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <strong>{userExists}</strong>
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input placeholder={"Username"} />
            </Form.Item>
            <Form.Item
              label="E-mail"
              name="email"
              rules={[{ required: true, message: 'Please input your e-mail!' }]}
            >
              <Input placeholder={"E-mail"} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password visibilityToggle/>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        </>

    );
}


export default NavTopBar


import { Button, Col, Form, Input, Modal, Row, Space } from 'antd';
import React, { useState } from 'react';
import CreateAccountAccount from '../CreateAccount';

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const LoginPage = () => {
  const [showModal, setShowModal] = useState(false)
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <div style={{ top: "50%", left: "35%", position: "absolute" }}>
        <Space align={"center"}>
          <Row align={"vertical"}>
            <Col>
              <div style={{margin: 5}}>
                <Input placeholder={"Username"} />
              </div>
            </Col>
            <Col>
              <div style={{margin: 5}}>
                <Input.Password placeholder={"Password"} visibilityToggle/>
              </div>
            </Col>
            <Row>
              <Col>
                <div style={{margin: 5}}>
                  <Button type={"primary"} >Login</Button>
                </div>
              </Col>
              <Col>
                <div style={{margin: 5}}>
                  <Button onClick={() => setShowModal(true)}>Create account</Button>
                </div>
              </Col>
            </Row>
          </Row>
        </Space>
      </div>
      <Modal visible={showModal} title={"Create Account"} width={720} centered onCancel={() => setShowModal(false)} footer={""}>
        <Form
          layout={"vertical"}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder={"Username"} />
          </Form.Item>
          <Form.Item
            label="E-mail"
            name="e-mail"
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
          <Form.Item
            label="Password"
            name="password2"
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
};

export default LoginPage
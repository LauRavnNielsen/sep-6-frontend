import React from 'react';
import { Form, Button, Input, Modal } from 'antd';
import PropTypes from 'prop-types';

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const CreateAccountAccount = (visible) => {

    const onFinish = (values: any) => {
      console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };

  return (
    <Modal visible={visible} title={"Create Account"} width={720} centered>
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
  );
};

CreateAccountAccount.defaultProps = {
  visible: false
}

CreateAccountAccount.propTypes = {
  visible: PropTypes.bool.isRequired
}

export default CreateAccountAccount;
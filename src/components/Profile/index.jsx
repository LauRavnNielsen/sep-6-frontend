import { UserOutlined } from '@ant-design/icons/lib';
import { Card, Avatar } from 'antd';
import React from 'react';

const ProfilePage = () => {

  return (
    <>
      <Card width={300} avatar={<Avatar size={64} icon={UserOutlined}/>} title={"Username"} description={"E-mail"}/>
    </>
  );
}

export default ProfilePage;
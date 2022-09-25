import Head from 'next/head'
import Router from 'next/router'


import {useState, useRef, useEffect} from 'react';

import BodyVisualizer from '../components/BodyVisualizer';
import PicturesTab from '../components/Pictures';
import PainPointsTab from '../components/PainPoints';
import VideoTab from '../components/Video';

import {Alert, Layout, Menu, Breadcrumb} from 'antd';

import {Row, Col} from 'antd';
import {Tabs, Divider} from 'antd';

import Cursor3D from '../models/cursor';
import Pictures from '../models/pictures';
import PainPoints from '../models/painPoints';

import {Form, Input, Button, Checkbox} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';

const layout = {};
const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

const Demo = () => {
    const onFinish = values => {
        Router.push(`/chat/${values.username}`);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const username = useRef();

    return (
        <div style={{margin: 'auto', width: '400px', marginTop: '50px'}}>
            <h2>Логін</h2>
            <Form
                {...layout}
                name="basic"
                initialValues={{remember: true}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    name="username"
                    rules={[{required: true, message: 'Будь-ласка, введіть Ваш Логін!'}]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Логін користувача"/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{required: true, message: 'Будь-ласка, введіть Ваш Пароль!'}]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon"/>}
                        type="password"
                        placeholder="Пароль"
                    />
                </Form.Item>

                <Alert
                    message="Деталі"
                    description="Упродовж тестування будь-який користувацький пароль буде прийнятим!"
                    type="info"
                    showIcon
                />
                <br/>
                <Form.Item style={{'textAlign': 'center'}}>
                    <Button type="primary" htmlType="submit">
                        Увійти
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Demo;

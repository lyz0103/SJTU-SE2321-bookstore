import React from 'react';
import {Table, Icon, Button} from 'antd';

import { getAllUsers, updateUserStatus } from '../../services/userService';

export default class UserManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: null,
        };
    }

    handleUsers = data => {
        this.setState({ users: data });
    }

    handleChange = (checked,userId) => {
        console.log("UserTable handleChange:"+checked+" "+userId);
        updateUserStatus(userId,checked);
        window.location.reload();
    }

    componentDidMount() {
        getAllUsers(this.handleUsers);
    }

        render() {
            const columns = [
                {
                    title: 'User_ID',
                    dataIndex: 'userId',
                    key: 'userId',
                },
                {
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: 'E-mail',
                    dataIndex: 'email',
                    key: 'email',
                },
                {
                    title: 'Enabled',
                    dataIndex: 'enabled',
                    key: 'enabled',
                    render: (text, record) => (
                        <div>
                            {record.enabled ?
                                <Icon type='check'></Icon>:
                                <Icon type='cross'></Icon>
                            }
                        </div>
                    ),
                },
                {
                    title: 'Option',
                    dataIndex: 'opt',
                    key: 'opt',
                    render: (text, record) => (
                        record.enabled ?
                            <Button onClick={() => this.handleChange(!record.enabled, record.userId)} type='primary' style={{width: 80}}>Disable</Button> :
                            <Button onClick={() => this.handleChange(!record.enabled, record.userId)} type='primary' style={{width: 80}}>Enable</Button>
                    ),
                }
        ];
        return (
            <Table columns={columns} dataSource={this.state.users}/>
        );
    }
}

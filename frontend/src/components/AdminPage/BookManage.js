import React from 'react';
import {Table, Button} from 'antd';

import {getBooks, deleteBookById} from "../../services/bookService.js";

export default class BookManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: null,
        };
    }

    handleBooks = data => {
        this.setState({ books: data });
    }

    handleDelete = (id) => {
        console.log("handle delete: ");
        console.log(id);
        const data = [...this.state.books];
        this.setState({
            books: data.filter((item) => item.bookId !== id),
        });
        deleteBookById(id);
    }

    handleAdd = () => {
        window.location.href = '/admin/manage_books/add';
    }
  
    // handleChange = (checked,userId) => {
    //     console.log("UserTable handleChange:"+checked+" "+userId);
    //     updateUserStatus(userId,checked);
    // }

    // handleChange1 = (checked) => {
    //     console.log("switch to "+checked);
    // }
  
    componentDidMount() {
        getBooks(this.handleBooks);
    }
  
    render() {
        const columns = [
            {
                title: 'Book_ID',
                dataIndex: 'bookId',
                key: 'bookId',
            },
            {
                title: 'Book_Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Author',
                dataIndex: 'author',
                key: 'author',
            },
            {
                title: 'ISBN',
                dataIndex: 'isbn',
                key: 'isbn',
                // render: (text, record) => (
                //     <div>
                //         <Checkbox
                //             defaultChecked={record.enabled}
                //             onChange={(checked)=>this.handleChange(checked, record.userId)}
                //         />
                //     </div>
                // ),
            },
            {
                title: 'Inventory',
                dataIndex: 'inventory',
                key: 'inventory',
            },
            {
                title: 'Operation',
                key: 'operation',
                render: (_, record) => (
                    <div>
                        <a style={{marginRight: 10}} onClick={() => this.handleDelete(record.bookId)}>Delete</a>
                        <a href={'/admin/modify_book/' + record.bookId}>Modify</a>
                    </div>
                ),
            },
        ];
        return (
            <div>
                <Button type='primary' style={{fontSize: 16, marginTop: 30, marginBottom: 10, marginLeft: 10}} onClick={this.handleAdd}>
                    Add a new book
                </Button>
                <Table columns={columns} dataSource={this.state.books}/>
            </div>
            
        );
    }
}

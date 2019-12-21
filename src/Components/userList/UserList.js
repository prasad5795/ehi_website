import React, { Component } from 'react';
import "./userList.css"
import UpdateForm from "../updateForm/UpdateForm"
import PopupForm from "../insertForm/PopupForm"

export class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userList: [],
            insertFormVisible:false
        }
    }


    render() {
        return (
            <div>
                {
                    this.props.userList.length > 0 ? <table className="table">
                        <tr>
                            <th className="text-bold">First Name</th>
                            <th className="text-bold">Last Name</th>
                            <th className="text-bold">Email</th>
                            <th className="text-bold">Phone Number</th>
                            <th className="text-bold">Status</th>
                            <th className="text-bold">Operation</th>
                        </tr>
                        {

                            this.props.userList.map((user, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phoneNumber}</td>
                                        <td>Active</td>
                                        <td>
                                            <button className="button" onClick={()=>{this.props.showInsertPopup(user)}}>
                                                <i className="fa fa-pencil-square update-button-icon" aria-hidden="true"></i>
                                            </button>
                                            <button className="button" onClick={()=>{this.props.showDeletePopup(user)}}>
                                                <i className="fa fa-trash delete-button-icon" aria-hidden="true"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </table> : <h3>No User Found</h3>
                }
            </div>
        );
    }
}

export default UserList;

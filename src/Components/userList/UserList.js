import React, { Component } from 'react';
import "./userList.css"

export class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: [],
            popupVisible:false
        }
    }

    render() {
        return (
            <div className="container-fluid">
                {
                    this.props.userList && this.props.userList.length > 0 ? <React.Fragment>
                        <div className="row table-row header">
                            <div className="col-2 header-text">First Name</div>
                            <div className="col-2 header-text">Last Name</div>
                            <div className="col-2 header-text">Email</div>
                            <div className="col-2 header-text">Phone Number</div>
                            <div className="col-2 header-text">Status</div>
                            <div className="col-2 header-text">Operation</div>
                        </div>
                        {
                            this.props.userList.map((user, i) => {
                                return (
                                    <div className="row table-row" key={i}>
                                        <div className="col-2 overflow-elipsis">{user.firstName}</div>
                                        <div className="col-2 overflow-elipsis">{user.lastName}</div>
                                        <div className="col-2 overflow-elipsis">{user.email}</div>
                                        <div className="col-2 overflow-elipsis">{user.phoneNumber}</div>
                                        <div className="col-2 overflow-elipsis">{user.status}</div>
                                        <div className="col-2 overflow-elipsis">
                                            <button className="button" onClick={()=>{this.props.showPopup(user,i,true)}}>
                                                <i className="fa fa-pencil-square update-button-icon" aria-hidden="true"></i>
                                            </button>
                                            <button className="button" onClick={()=>{this.props.showDeletePopup(user,i,true)}}>
                                                <i className="fa fa-trash delete-button-icon" aria-hidden="true"></i>
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </React.Fragment> : <h3>No User Found</h3>
                }
            </div>
        );
    }
}

export default UserList;

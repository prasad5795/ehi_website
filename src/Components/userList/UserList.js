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
                            <div className="col-2 header-text table-cell">First Name</div>
                            <div className="col-2 header-text table-cell">Last Name</div>
                            <div className="col-2 header-text table-cell">Email</div>
                            <div className="col-2 header-text table-cell">Phone Number</div>
                            <div className="col-2 header-text table-cell">Status</div>
                            <div className="col-2 header-text table-cell">Operation</div>
                        </div>
                        {
                            this.props.userList.map((user, i) => {
                                return (
                                    <div data-test="actual-list" className="row table-row" key={i}>
                                        <div className="col-2 overflow-elipsis table-cell">{user.firstName}</div>
                                        <div className="col-2 overflow-elipsis table-cell">{user.lastName}</div>
                                        <div className="col-2 overflow-elipsis table-cell">{user.email}</div>
                                        <div className="col-2 overflow-elipsis table-cell">{user.phoneNumber}</div>
                                        <div className="col-2 overflow-elipsis table-cell">{user.status}</div>
                                        <div className="col-2 overflow-elipsis table-cell">
                                            <button data-test="update-button" className="button" onClick={()=>{this.props.showPopup(user,i,true)}}>
                                                <i className="fa fa-pencil-square update-button-icon" aria-hidden="true"></i>
                                            </button>
                                            <button data-test="delete-button" className="button" onClick={()=>{this.props.showDeletePopup(user,i,true)}}>
                                                <i className="fa fa-trash delete-button-icon" aria-hidden="true"></i>
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </React.Fragment> : <h3 data-test="empty-list-label">No User Found</h3>
                }
            </div>
        );
    }
}

export default UserList;
import React, { PureComponent } from 'react';
import "./PopupForm.css"

export default class PopupForm extends PureComponent {
    state = {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: ""
    }


    constructor(props) {
        super(props);

    }


    handleChange = (event) => {
        switch (event.target.id) {
            case "FirstName":
                this.setState({ firstName: event.target.value })
                break;
            case "LastName":
                this.setState({ lastName: event.target.value })
                break;
            case "Email":
                this.setState({ email: event.target.value })
                break;
            case "PhoneNumber":
                this.setState({ phoneNumber: event.target.value })
                break;
            default:
                break;
        }
    }

    handleFormSubmit = (event) => {
        event.preventDefault()
        console.log(this.state)
        let usersString = localStorage.getItem('users')
        if (usersString) {
            console.log("users exists", usersString)
            let arrOfUsers = JSON.parse(usersString)
            arrOfUsers.push(this.state)
            localStorage.setItem('users', JSON.stringify(arrOfUsers))
        } else {
            let arrOfUsers = []
            arrOfUsers.push(this.state)
            localStorage.setItem('users', JSON.stringify(arrOfUsers))
        }
        this.props.closeInsertPopup()
    }

    render() {
        return (
            <div id="popup-div" className={this.props.insertFormVisible ? "popup-visible shadow-lg p-3 mb-5 bg-white rounded" : "popup-invisible"}>
                <button className="close-button" onClick={() => this.props.closeInsertPopup()}>
                    <i class="fa fa-times" aria-hidden="true"></i>
                </button>
                {
                    this.props.deletePopup ?
                        <div>
                            <h4>Are you sue you want to delete {this.state.email} ?</h4>
                            <button className="btn btn-danger mr-2">Yes</button>
                            <button className="btn btn-success">No</button>
                        </div>
                        :
                        <div>
                            {
                                this.state.firstName ?
                                    <h1 className="mb-5">Update User</h1>
                                    :
                                    <h1 className="mb-5">Insert User</h1>
                            }
                            <form onSubmit={this.handleFormSubmit}>
                                <div className="form-group row">
                                    <label htmlFor="FirstName" className="col-sm-3 col-form-label">First Name</label>
                                    <input type="text" className="form-control col-8" id="FirstName" value={this.state.firstName} onChange={this.handleChange} aria-describedby="emailHelp"
                                        placeholder="Enter First Name" />
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="LastName" className="col-sm-3 col-form-label">Last Name</label>
                                    <input type="text" className="form-control col-8" id="LastName" value={this.state.lastName} onChange={this.handleChange} aria-describedby="emailHelp"
                                        placeholder="Enter Last Name" />
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="Email" className="col-sm-3 col-form-label">Email address</label>
                                    <input type="email" className="form-control col-8" id="Email" value={this.state.email} onChange={this.handleChange} aria-describedby="emailHelp"
                                        placeholder="Enter email" />
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="PhoneNumber" className="col-sm-3 col-form-label">Phone Number</label>
                                    <input type="text" className="form-control col-8" id="PhoneNumber" value={this.state.phoneNumber} onChange={this.handleChange} aria-describedby="emailHelp"
                                        placeholder="Enter email" />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>

                }
            </div>
        );
    }


    componentDidUpdate() {
        console.log("props", this.props.selectedUser)
        if (this.props.selectedUser) {
            this.setState({
                firstName: this.props.selectedUser.firstName,
                lastName: this.props.selectedUser.lastName,
                email: this.props.selectedUser.email,
                phoneNumber: this.props.selectedUser.phoneNumber
            })
        } else {
            console.log("null", this.props.selectedUser)
            this.setState({
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: ""
            })
        }
    }
}

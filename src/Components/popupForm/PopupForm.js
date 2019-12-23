import React, { PureComponent } from 'react';
import "./PopupForm.css"

export default class PopupForm extends PureComponent {
    state = {
        user: {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            status: "Activate"
        },
        isUpdateForm: false
    }


    constructor(props) {
        super(props);

    }


    handleChange = (event) => {
        const regexForPhoneNumber = /^[0-9\b]+$/;
        const regexForNames = /^[a-zA-Z]*$/;
        const regexForEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        switch (event.target.id) {
            case "FirstName":
                // if (event.target.value === '' || regexForNames.test(event.target.value)) {
                    this.setState({ user: { ...this.state.user, firstName: event.target.value } })
                // }
                break;
            case "LastName":
                // if (event.target.value === '' || regexForNames.test(event.target.value)) {
                    this.setState({ user: { ...this.state.user, lastName: event.target.value } })
                // }
                break;
            case "Email":
                this.setState({ user: { ...this.state.user, email: event.target.value } })
                break;
            case "PhoneNumber":
                // if (event.target.value === '' || regexForPhoneNumber.test(event.target.value) && this.state.user.phoneNumber.length < 10) {
                    this.setState({ user: { ...this.state.user, phoneNumber: event.target.value } })
                // }
                break;
            case "Status":
                this.setState({ user: { ...this.state.user, status: event.target.value } })
                break;
            default:
                break;
        }
    }

    handleFormSubmit = (event) => {
        event.preventDefault()




        let usersString = localStorage.getItem('users')
        if (usersString) {
            let arrOfUsers = JSON.parse(usersString)
            if (this.state.isUpdateForm) {
                let index = this.props.indexOfSelectedUser
                arrOfUsers[index] = this.state.user
            } else {
                arrOfUsers.push(this.state.user)
            }
            localStorage.setItem('users', JSON.stringify(arrOfUsers))
        } else {
            let arrOfUsers = []
            arrOfUsers.push(this.state.user)
            localStorage.setItem('users', JSON.stringify(arrOfUsers))
        }
        this.props.closePopup()
    }

    render() {
        return (
            <div id="popup-div" className={this.props.popupVisible ? "popup-visible shadow-lg p-3 mb-5 bg-white rounded" : "popup-invisible"}>
                <button className="close-button" onClick={() => this.props.closePopup()}>
                    <i className="fa fa-times" aria-hidden="true"></i>
                </button>
                {
                    this.props.deletePopup ?
                        <div>
                            <h4>Are you sure you want to delete {this.state.user.email} ?</h4>
                            <button className="btn btn-danger mr-2" onClick={this.props.deleteUser}>Yes</button>
                            <button className="btn btn-success" onClick={this.props.closePopup}>No</button>
                        </div>
                        :
                        <div>
                            {
                                this.state.updatePopup ?
                                    <h1 className="mb-5">Update User</h1>
                                    :
                                    <h1 className="mb-5">Insert User</h1>
                            }
                            <form onSubmit={this.handleFormSubmit}>
                                <div className="form-group row">
                                    <label htmlFor="FirstName" className="col-sm-3 col-form-label">First Name</label>
                                    <input type="text" className="form-control col-8" id="FirstName" value={this.state.user.firstName} onChange={this.handleChange} aria-describedby="firstNameHelp"
                                        placeholder="Enter First Name"  required pattern="^[a-zA-Z]*$"/>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="LastName" className="col-sm-3 col-form-label">Last Name</label>
                                    <input type="text" className="form-control col-8" id="LastName" value={this.state.user.lastName} onChange={this.handleChange} aria-describedby="lastNameHelp"
                                        placeholder="Enter Last Name"  required pattern="^[a-zA-Z]*$"/>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="Email" className="col-sm-3 col-form-label">Email address</label>
                                    <input type="email" className="form-control col-8" id="Email" value={this.state.user.email} onChange={this.handleChange} aria-describedby="emailHelp"
                                        placeholder="Enter email"  required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"/>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="PhoneNumber" className="col-sm-3 col-form-label">Phone Number</label>
                                    <input type="text" className="form-control col-8" id="PhoneNumber" value={this.state.user.phoneNumber} onChange={this.handleChange} aria-describedby="phoneNumberHelp"
                                        placeholder="Enter phone number"  required pattern="[0-9]{10}"/>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="Status" className="col-sm-3 col-form-label">Status</label>
                                    <select type="text" className="form-control col-8" id="Status" value={this.state.user.status} onChange={this.handleChange} aria-describedby="statusHelp"
                                        placeholder="Enter Status" required>
                                        <option>Activate</option>
                                        <option>Deactivate</option>

                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>

                }
            </div>
        );
    }


    componentDidMount() {
        if (this.props.updatePopup) {
            this.setState({
                user: this.props.selectedUser,
                isUpdateForm: true
            })
        } else {
            this.setState({
                user: {
                    firstName: "",
                    lastName: "",
                    email: "",
                    phoneNumber: "",
                    status: "Activate"
                },
                isUpdateForm: false
            })
        }
    }
}

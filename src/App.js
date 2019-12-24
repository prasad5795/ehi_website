import React from 'react';
import './App.css';
import UserList from "./Components/userList/UserList"
import PopupForm from "./Components/popupForm/PopupForm"

class App extends React.Component {

  state = {
    popupVisible: false,
    userList: [],
    selectedUser: null,
    updatePopup: false,
    deletePopup: false,
    indexOfSelectedUser: -1
  }

  constructor(props) {
    super(props)
  }

  showPopup = (user, index, updatePopup) => {
    this.setState({ popupVisible: true, selectedUser: user, deletePopup: false, updatePopup: updatePopup, indexOfSelectedUser: index })
  }

  closePopup = () => {
    let usersString = localStorage.getItem('users')
    let users = []
    if (usersString) {
      users = JSON.parse(usersString)
    }
    this.setState({ popupVisible: false, userList: users, deletePopup: false, updatePopup: false })
  }

  showDeletePopup = (user, index, updatePopup) => {
    this.setState({ popupVisible: true, selectedUser: user, deletePopup: true, updatePopup: updatePopup, indexOfSelectedUser: index })
  }


  deleteUser = () => {
    let userList = this.state.userList.slice()
    let userToBeDeleted;
    for (let user of this.state.userList) {
      if (user.email === this.state.selectedUser.email) {
        userToBeDeleted = user
        break
      }
    }
    userList.splice(userList.indexOf(userToBeDeleted), 1)
    localStorage.setItem('users', JSON.stringify(userList))
    this.setState({ userList: userList })
    this.closePopup()
  }

  render() {
    return (
      <React.Fragment>
        <div className="app-header">
          <h1 data-test="app-component-header" className="text-left p-4">Users</h1>
        </div>
        <div className='App'>
          {
            this.state.popupVisible ?
              <PopupForm selectedUser={this.state.selectedUser} updatePopup={this.state.updatePopup} indexOfSelectedUser={this.state.indexOfSelectedUser} deletePopup={this.state.deletePopup} popupVisible={this.state.popupVisible} closePopup={this.closePopup} deleteUser={this.deleteUser}></PopupForm>
              :
              <React.Fragment></React.Fragment>
          }
          <div className={this.state.popupVisible ? 'grey-out' : ''}>
            <UserList data-test="user-list-component" userList={this.state.userList} showPopup={this.showPopup} closePopup={this.closePopup} showDeletePopup={this.showDeletePopup}></UserList>
            <button data-test="insert-popup-button" className="add-button" onClick={() => this.showPopup(null, -1, false)}>
              <i className="fa fa-plus-circle add-button-icon" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }

  componentDidMount() {
    let usersString = localStorage.getItem('users')
    let users = []
    if (usersString) {
      users = JSON.parse(usersString)
    }
    this.setState({ popupVisible: false, userList: users })
  }
}

export default App;

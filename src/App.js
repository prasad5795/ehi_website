import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from "./Components/userList/UserList"
import PopupForm from "./Components/insertForm/PopupForm"




class App extends React.Component {

  state = {
    insertFormVisible: false,
    userList: [],
    selectedUser: null,
    deletePopup:false
  }

  constructor(props) {
    super(props)
  }

  showInsertPopup = (user) => {
    console.log("show popup", user)
    this.setState({ insertFormVisible: true, selectedUser: user, deletePopup:false })
  }

  closeInsertPopup = () => {
    let usersString = localStorage.getItem('users')
    let users = []
    if (usersString) {
      users = JSON.parse(usersString)
    }
    this.setState({ insertFormVisible: false, userList: users, deletePopup:false })
  }

  showDeletePopup = (user) => {
    console.log("delete popup")
    this.setState({ insertFormVisible: true, selectedUser: user , deletePopup:true })

  }

  render() {
    return (
      <div className="App">
        <h1 className="text-left m-4">Users</h1>
        <PopupForm selectedUser={this.state.selectedUser} deletePopup={this.state.deletePopup} insertFormVisible={this.state.insertFormVisible} closeInsertPopup={this.closeInsertPopup}></PopupForm>
        <UserList userList={this.state.userList} showInsertPopup={this.showInsertPopup} closeInsertPopup={this.closeInsertPopup} showDeletePopup={this.showDeletePopup}></UserList>
        <button className="add-button" onClick={()=>this.showInsertPopup(null)}>
          <i className="fa fa-plus-circle add-button-icon" aria-hidden="true"></i>
        </button>
      </div>
    );
  }

  componentDidMount() {
    let usersString = localStorage.getItem('users')
    let users = []
    if (usersString) {
      users = JSON.parse(usersString)
    }
    this.setState({ insertFormVisible: false, userList: users })
  }
}

export default App;

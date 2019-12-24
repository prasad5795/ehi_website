import React from 'react';
import ReactDOM from 'react-dom'
import App from '../../App';
import UserList from './UserList';
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const mockUserState = {
    userList: [{
        firstName: "first name1",
        lastName: "last name1",
        email: "someone1@gmail.com",
        phoneNumber: "987654321",
        status: "Activate"
    }, {
        firstName: "first name2",
        lastName: "last name2",
        email: "someone2@gmail.com",
        phoneNumber: "987654321",
        status: "Activate"
    }, {
        firstName: "first name3",
        lastName: "last name3",
        email: "someone3@gmail.com",
        phoneNumber: "987654321",
        status: "Activate"
    }],
    popupVisible: false
}

describe("UserList", () => {
    test("should render no user found if list is empty", () => {
        const wrapper = shallow(<UserList userList={[]} />);
        const emptyListLabel = wrapper.find("[data-test='empty-list-label']")
        expect(emptyListLabel.length).toBe(1)
    });

    test("should render no user found if list is empty", () => {
        const wrapper = shallow(<UserList userList={[]} />);
        const emptyListLabel = wrapper.find("[data-test='empty-list-label']")
        expect(emptyListLabel.length).toBe(1)
    });

    test("should not render no user found if list is not empty", () => {
        const wrapper = shallow(<UserList userList={mockUserState.userList} />);
        const emptyListLabel = wrapper.find("[data-test='empty-list-label']")
        expect(emptyListLabel.length).toBe(0)
    });

    test("should render list of users if props contain user list", () => {
        const wrapper = shallow(<UserList userList={mockUserState.userList} />);
        const userListDiv = wrapper.find("[data-test='actual-list']")
        expect(userListDiv.length).toBe(mockUserState.userList.length)
    });

    test("should open update popup on click of pencil", () => {
        const appWrapper = shallow(<App />);
        appWrapper.setState({
            popupVisible: false,
            userList: [],
            selectedUser: null,
            updatePopup: false,
            deletePopup: false,
            indexOfSelectedUser: -1
        })
        const showPopup = (user,index,updatePopup) => {
            appWrapper.setState({ popupVisible: true, selectedUser: user, deletePopup: false, updatePopup: updatePopup, indexOfSelectedUser: index })
        }
        const userListWrapper = shallow(<UserList userList={mockUserState.userList} showPopup={showPopup} />);
        const updateBtn = userListWrapper.find("[data-test='update-button']")
        updateBtn.first().simulate('click')
        userListWrapper.update()
        expect(appWrapper.state('popupVisible') && appWrapper.state('updatePopup')===true  && appWrapper.state('indexOfSelectedUser')===0).toBeTruthy()
    });

    test("should open delete popup on click of delete button", () => {
        const appWrapper = shallow(<App />);
        appWrapper.setState({
            popupVisible: false,
            userList: [],
            selectedUser: null,
            updatePopup: false,
            deletePopup: false,
            indexOfSelectedUser: -1
        })
        const showDeletePopup = (user,index,updatePopup) => {
            appWrapper.setState({ popupVisible: true, selectedUser: user, deletePopup: true, updatePopup: updatePopup, indexOfSelectedUser: index })
        }
        const userListWrapper = shallow(<UserList userList={mockUserState.userList} showDeletePopup={showDeletePopup} />);
        const deleteBtn = userListWrapper.find("[data-test='delete-button']")
        deleteBtn.last().simulate('click')
        userListWrapper.update()
        expect(appWrapper.state('popupVisible') && appWrapper.state('deletePopup')===true && appWrapper.state('indexOfSelectedUser')===mockUserState.userList.length-1).toBeTruthy()
    });
});

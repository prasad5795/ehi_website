import React from 'react';
import App from './App';
import Enzyme, {shallow} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new EnzymeAdapter() })

describe("UserList", () => {
    test("should render app component without error", () => {
        const wrapper = shallow(<App/>);
        const headerOfAppComponent = wrapper.find("[data-test='app-component-header']")
        expect(headerOfAppComponent.length).toBe(1)
    });

    test("should render add button", () => {
        const wrapper = shallow(<App/>);
        const insertPopupButton = wrapper.find("[data-test='insert-popup-button']")
        expect(insertPopupButton.length).toBe(1)
    });

    test("should render userlist component", () => {
        const wrapper = shallow(<App/>);
        const userListComponent = wrapper.find("[data-test='user-list-component']")
        expect(userListComponent.length).toBe(1)
    });

    test("should render popup component on click of add button", () => {
        const state = {
            popupVisible: false,
            userList: [],
            selectedUser: null,
            updatePopup: false,
            deletePopup: false,
            indexOfSelectedUser: -1
          }
        const wrapper = shallow(<App/>)
        wrapper.setState(state)
        const insertPopupButton = wrapper.find("[data-test='insert-popup-button']")
        insertPopupButton.simulate('click')
        wrapper.update()
        expect(wrapper.state('popupVisible') && wrapper.state('selectedUser')===null && wrapper.state('indexOfSelectedUser')===-1).toBeTruthy()

    });
});



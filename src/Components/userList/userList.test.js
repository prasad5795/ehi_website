import React from 'react';
import ReactDOM from 'react-dom'
import { isTSAnyKeyword } from '@babel/types'
import UserList from './UserList';
import { render } from '@testing-library/react'
import '@testing-library/jest-dom';

const mockUserState = {
    userList: [{
        firstName:"first name",
        lastName:"last name",
        email:"someone@gmail.com",
        phoneNumber:"987654321",
        status:"Activate"
    }],
    popupVisible: false
}

describe("UserList", () => {
    it("should render UserList component", () => {
        const div = document.createElement('div')
        ReactDOM.render(<UserList></UserList>, div)
    });
});

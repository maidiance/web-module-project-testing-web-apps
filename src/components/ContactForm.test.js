import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />);
});

test('renders the contact form header', ()=> {
    render(<ContactForm />);
    // get element
    const header = screen.queryByText(/Contact Form/i);
    // assert tests
    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).toHaveTextContent(/Contact Form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    // get element
    const firstName = await screen.getByLabelText(/First Name*/i);
    // type test input
    userEvent.type(firstName, 'ab')
    // get error element
    const error = await screen.getByTestId('error');
    // assert error test
    expect(error).toBeInTheDocument();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    // get and click submit button
    const button = await screen.getByRole('button');
    userEvent.click(button);
    // get error elements
    const errors = await screen.getAllByTestId('error');
    // assert there are THREE errors
    expect(errors.length).toBe(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);
    // get elements
    const firstName = await screen.getByLabelText(/First Name*/i);
    const lastName = await screen.getByLabelText(/Last Name*/i);
    // type test inputs
    userEvent.type(firstName, 'testName');
    userEvent.type(lastName, 'testName');
    // get and click submit button
    const button = await screen.getByRole('button');
    userEvent.click(button);
    // get error element
    const error = await screen.getByTestId('error');
    // assert error test
    expect(error).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);
    // get elements
    const email = await screen.getByLabelText(/Email*/i);
    // type test inputs
    userEvent.type(email, 'invalidEmail');
    // get error element
    const error = await screen.getByTestId('error');
    // assert error tests
    expect(error).toBeInTheDocument();
    expect(error).toHaveTextContent('email must be a valid email address');
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);
    // get elements
    const firstName = await screen.getByLabelText(/First Name*/i);
    const email = await screen.getByLabelText(/Email*/i);
    // type test inputs
    userEvent.type(firstName, 'testName');
    userEvent.type(email, 'test@email.com');
    // get and click button
    const button = await screen.getByRole('button');
    userEvent.click(button);
    // find error
    const error = await screen.getByTestId('error');
    // assert error tests
    expect(error).toBeInTheDocument();
    expect(error).toHaveTextContent('lastName is a required field');
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);
    // set test inputs
    const testFirstName = 'testFirstName';
    const testLastName = 'testLastName';
    const testEmail = 'test@test.com';
    // get elements
    const firstName = await screen.getByLabelText(/First Name*/i);
    const lastName = await screen.getByLabelText(/Last Name*/i);
    const email = await screen.getByLabelText(/Email*/i);
    // type test inputs
    userEvent.type(firstName, testFirstName);
    userEvent.type(lastName, testLastName);
    userEvent.type(email, testEmail);
    // get and click button
    const button = await screen.getByRole('button');
    userEvent.click(button);
    // find expected elements
    const submittedFirstName = await screen.getByTestId(/firstnameDisplay/i);
    expect(submittedFirstName).toBeInTheDocument();
    expect(submittedFirstName).toHaveTextContent(testFirstName);
    const submittedLastName = await screen.getByTestId(/lastNameDisplay/i);
    expect(submittedLastName).toBeInTheDocument();
    expect(submittedLastName).toHaveTextContent(testLastName);
    const submittedEmail = await screen.getByTestId(/emailDisplay/i);
    expect(submittedEmail).toBeInTheDocument();
    expect(submittedEmail).toHaveTextContent(testEmail);
    // check to see if message is missing
    const submittedMessage = await screen.queryByTestId(/messageDisplay/i);
    expect(submittedMessage).not.toBeInTheDocument();
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);
    // set test inputs
    const testFirstName = 'testFirstName';
    const testLastName = 'testLastName';
    const testEmail = 'test@test.com';
    const testMessage = 'testMessage';
    // get elements
    const firstName = await screen.getByLabelText(/First Name*/i);
    const lastName = await screen.getByLabelText(/Last Name*/i);
    const email = await screen.getByLabelText(/Email*/i);
    const message = await screen.getByLabelText(/Message/i);
    // type test inputs
    userEvent.type(firstName, testFirstName);
    userEvent.type(lastName, testLastName);
    userEvent.type(email, testEmail);
    userEvent.type(message, testMessage);
    // get and click button
    const button = await screen.getByRole('button');
    userEvent.click(button);
    // find expected elements
    const submittedFirstName = await screen.getByTestId(/firstnameDisplay/i);
    expect(submittedFirstName).toBeInTheDocument();
    expect(submittedFirstName).toHaveTextContent(testFirstName);
    const submittedLastName = await screen.getByTestId(/lastNameDisplay/i);
    expect(submittedLastName).toBeInTheDocument();
    expect(submittedLastName).toHaveTextContent(testLastName);
    const submittedEmail = await screen.getByTestId(/emailDisplay/i);
    expect(submittedEmail).toBeInTheDocument();
    expect(submittedEmail).toHaveTextContent(testEmail);
    const submittedMessage = await screen.getByTestId(/messageDisplay/i);
    expect(submittedMessage).toBeInTheDocument();
    expect(submittedMessage).toHaveTextContent(testMessage);
});
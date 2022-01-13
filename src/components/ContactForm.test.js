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
    const header = screen.queryByText(/Contact Form/i);
    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).toHaveTextContent(/Contact Form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    const firstName = await screen.getByLabelText(/First Name*/i);
    userEvent.type(firstName, 'ab')
    const error = await screen.getByTestId('error');
    expect(error).toBeInTheDocument();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    const button = await screen.getByRole('button');
    userEvent.click(button);
    const errors = await screen.getAllByTestId('error');
    expect(errors.length).toBe(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);
    const firstName = await screen.getByLabelText(/First Name*/i);
    const lastName = await screen.getByLabelText(/Last Name*/i);
    userEvent.type(firstName, 'testName');
    userEvent.type(lastName, 'testName');
    const button = await screen.getByRole('button');
    userEvent.click(button);
    const error = await screen.getByTestId('error');
    expect(error).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);
    const email = await screen.getByLabelText(/Email*/i);
    userEvent.type(email, 'invalidEmail');
    const error = await screen.getByTestId('error');
    expect(error).toBeInTheDocument();
    expect(error).toHaveTextContent('email must be a valid email address');
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);
    const firstName = await screen.getByLabelText(/First Name*/i);
    const email = await screen.getByLabelText(/Email*/i);
    userEvent.type(firstName, 'testName');
    userEvent.type(email, 'test@email.com');
    const button = await screen.getByRole('button');
    userEvent.click(button);
    const error = await screen.getByTestId('error');
    expect(error).toBeInTheDocument();
    expect(error).toHaveTextContent('lastName is a required field');
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    
});

test('renders all fields text when all fields are submitted.', async () => {
});
// No hooks yet...
import React, { Component } from 'react';

import './Auth.css';
import { AuthContext } from "../components/context/auth-context";


class AuthPage extends Component {
    state = {
        isLogin: true
    };

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.emailElement = React.createRef(); // becomes something you can refer too
        this.passwordElement = React.createRef(); // becomes something you can refer too

    }

    // switch the mode of logging in to submitting (i think)
    switchModeHandler = () => {
        this.setState(prevState => {
            return { isLogin: !prevState.isLogin };
        });
    };

    // checks the submitted email and password
    submitHandler = event => {
        event.preventDefault();
        const email = this.emailElement.current.value;
        const password = this.passwordElement.current.value;
        if (email.trim().length === 0 || password.trim().length === 0) {
            return;
        }

        // default is to log in   
        let requestBody = {
            query: `
              query {
                login(email: "${email}", password: "${password}")
                {
                  userId
                  token
                  tokenExpiration
                }
              }
            `
        };

        // else if login is not true, it will allow user to create a new user
        if (!this.state.isLogin) {
            requestBody = {
                query: `
                mutation {
                  createUser(userInput: {email: "${email}", password: "${password}"})
                  {
                    _id
                    email
                  }
                }
              `
            };
        }


        // fetch returns a promise
        fetch("http://localhost:8000/graphql", {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error("Failed!");
                }
                return res.json();
            })
            .then(resData => {
                if (resData.data.login.token) {
                    this.context.login(
                        resData.data.login.token,
                        resData.data.login.userId,
                        resData.data.login.tokenExpiration
                    );
                }
                console.log(resData);
            })
            .catch(err => {
                console.log(err);
            });

    };


    // Return from of entering in email and password.
    render() {
        return (
            <form className='auth-form' onSubmit={this.submitHandler}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" ref={this.emailElement} />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" ref={this.passwordElement} />
                </div>

                <div class="form-actions">
                    <button type="submit">Submit</button>
                    <button type="button" onClick={this.switchModeHandler}>
                        Switch to {this.state.isLogin ? 'Signup' : 'Login'}
                    </button>

                </div>
            </form>);
    }
}

export default AuthPage
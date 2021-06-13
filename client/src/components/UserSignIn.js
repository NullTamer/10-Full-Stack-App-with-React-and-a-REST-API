import React, { Component } from "react";
import { Link } from "react-router-dom";
import Form from "./Form";

class UserSignIn extends Component {
  state = {
    emailAddress: "",
    password: "",
    errors: [],
  };

  render() {
    const { emailAddress, password, errors } = this.state;

    return (
      <main>
        <div className="form--centered">
          <h2>Sign In</h2>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign In"
            elements={() => (
              <React.Fragment>
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="text"
                  value={emailAddress}
                  onChange={this.change}
                  placeholder="Email Address"
                />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.change}
                  placeholder="Password"
                />
              </React.Fragment>
            )}
          />
          <p>
            Don't have a user account? Click here to{" "}
            <Link to="/signup">sign up</Link>!
          </p>
        </div>
      </main>
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };

  submit = () => {
    const { context } = this.props;
    const { emailAddress, password } = this.state;

    context.actions.signIn(emailAddress, password).then((user) => {
      if (user === null) {
        this.setState(() => {
          return { errors: ["Sign-in was unsuccessful"] };
        });
      }
    });
  };

  cancel = () => {
    this.props.history.push("/");
  };
}

export default UserSignIn;

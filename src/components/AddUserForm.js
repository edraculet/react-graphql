import React, {Component} from "react";
import {connect} from 'react-redux';
import {EuiButton, EuiFieldText, EuiForm, EuiFormRow, EuiLink, EuiSelect, EuiSpacer, EuiText} from "@elastic/eui";
import {ADD_USER} from "./UserMutations";
import {Mutation} from "@apollo/react-components";

import {addNewUser, setMessage} from "../actions/actions";

class AddUserForm extends Component {
    state = {
        values: {
            name: "",
            email: "",
            status: ""
        },
    };

    updateState = (event) => {
        const {name, value} = event.target;
        let values = {...this.state.values, [name]: value};
        this.setState({values});

        // reset messages
        this.props.setMessage({
            type: '',
            text: ''
        });
    };

    clearForm = () => {
        //reset form inputs
        let values = {
            name: "",
            email: "",
            status: ""
        };
        this.setState({values})
    };

    render() {

        return (
            <Mutation mutation={ADD_USER}>
                {(addUser, {data}) => (
                    <div>
                        <div>
                            <EuiForm>
                                <EuiSpacer/>
                                <EuiFormRow label="User name">
                                    <EuiFieldText name="name"
                                                  value={this.state.values.name || ''}
                                                  onChange={(e) => this.updateState(e)}/>
                                </EuiFormRow>

                                <EuiFormRow
                                    label="Email" helpText="Add a unique email address">
                                    <EuiFieldText
                                        name="email"
                                        value={this.state.values.email || ''}
                                        onChange={(e) => this.updateState(e)}/>
                                </EuiFormRow>
                                <EuiFormRow
                                    label="Status"
                                    labelAppend={
                                        <EuiText size="xs">
                                            <EuiLink>User status</EuiLink>
                                        </EuiText>
                                    }>
                                    <EuiSelect
                                        hasNoInitialSelection
                                        name="status"
                                        options={[
                                            {value: ' ', text: 'Choose Option'},
                                            {value: 'Active', text: 'Active'},
                                            {value: 'Inactive', text: 'Inactive'},
                                        ]}
                                        value={this.state.values.status || ' '}
                                        onChange={(e) => this.updateState(e)}/>
                                </EuiFormRow>
                                <EuiSpacer/>

                                <EuiButton type="submit" onClick={e => {
                                    e.preventDefault();
                                    if (this.state.values.name !== '' && this.state.values.email !== '' && this.state.values.status !== ' ') {
                                        console.log(this.state);
                                        addUser({variables: this.state.values})
                                            .then(response => response)
                                            .then((res) => {
                                                // add new user to global state
                                                this.props.addNewUser(res.data.addUser);
                                                this.props.setMessage({
                                                    type: 'success',
                                                    text: 'User added!'
                                                });
                                                return this.clearForm();
                                            });
                                    }else{
                                        this.props.setMessage({
                                            type: 'error',
                                            text: 'Complete all required fields!'
                                        });
                                    }
                                }}>
                                    Add User
                                </EuiButton>
                                <EuiSpacer/>
                            </EuiForm>

                        </div>
                    </div>
                )}
            </Mutation>
        );
    }
}
const mapStateToProps = state => ( {
    message: state.message
});

const mapDispatchToProps = {
    addNewUser,
    setMessage
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddUserForm);

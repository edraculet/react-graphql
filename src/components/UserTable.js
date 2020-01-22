import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loadUsers, removeUser, setMessage} from "../actions/actions";
import {GET_USERS, DELETE_USER} from "./UserMutations";
import AddUserForm from "./AddUserForm";
import Messages from "./Messages";
import {withApollo} from 'react-apollo';
import {
    EuiBasicTable,
    EuiLink,
    EuiButton,
    EuiHealth
} from '@elastic/eui';
import {Mutation} from "@apollo/react-components";

class UserTable extends Component {
    // set default set of users
    runQuery(GET_USERS) {
        return this.props.client.query({
            query: GET_USERS,
        }).then(({loading, error, data}) => {
            if (loading) return;
            if (error) {
                console.log(error);
                return;
            }
            this.props.loadUsers(data.allUsers);
        });
    }

    componentDidMount() {
        this.runQuery(GET_USERS);
    }


    render() {

        const columns = [
            {
                field: 'name',
                name: 'Name',
                sortable: true,
                'data-test-subj': 'firstNameCell',
            },
            {
                field: 'email',
                name: 'Email',
                render: email => (
                    <EuiLink href="mailto:{email}" target="_blank">
                        {email}
                    </EuiLink>
                ),
            },
            {
                field: 'status',
                name: 'Status',
                truncateText: true,
                sortable: true,
                render: status => {
                    const color = (status === 'Active') ? 'success' : 'danger';
                    const label = (status === 'Active') ? 'Active' : 'Inactive';
                    return <EuiHealth color={color}>{label}</EuiHealth>;
                }
            },
            {
                field: 'id',
                name: 'Actions',
                render: id => (
                    <Mutation mutation={DELETE_USER} key={id}>
                        {(deleteUser, {data, error}) => (
                            <EuiButton fill onClick={(e) => {
                                e.preventDefault();
                                deleteUser({variables: {id: id}}).then(response => response)
                                    .then((res) => {
                                        // remove user to global state
                                        this.props.removeUser(res.data.deleteUser.id);
                                        this.props.setMessage({
                                            type: 'success',
                                            text: 'User deleted!'
                                        });
                                    });
                            }}>
                                Delete
                            </EuiButton>
                        )}
                    </Mutation>
                )
            },
        ];

        return (
            <React.Fragment>
                <AddUserForm/>
                <Messages/>
                <EuiBasicTable
                    items={this.props.allUsers || []}
                    columns={columns}
                    tableLayout={'fixed'}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    allUsers: state.allUsers,
    message: state.message
});

const mapDispatchToProps = {
    loadUsers,
    removeUser,
    setMessage
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withApollo(UserTable));
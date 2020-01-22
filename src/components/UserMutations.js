import { gql } from 'apollo-boost';

export const GET_USERS = gql`
  {
    allUsers {
      id,
      name,
      email,
      status
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($name: String!, $email: String!, $status: String!) {
     addUser(name:$name, email:$email, status:$status){
        id
        name
        email
        status
      }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

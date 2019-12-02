import gql from 'graphql-tag';

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($idToken: String!) {
    login(idToken: $idToken) {
      token
      user {
        name
        email
        profilePicture
      }
    }
  }
`;

export const EXAMPLE_MUTATION = gql`
  mutation LoginMutation($idToken: String!) {
    login(idToken: $idToken) {
      token
      user {
        name
        email
        profilePicture
      }
    }
  }
`;

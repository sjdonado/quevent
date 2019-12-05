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

export const CREATE_EVENT_MUTATION = gql`
  mutation createEvent($name: String!, $startDate: Date!, $endDate: Date!) {
    createEvent(name: $name, startDate: $startDate, endDate: $endDate) {
      name
      startDate
      endDate
    }
  }
`;

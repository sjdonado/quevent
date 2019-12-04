import gql from 'graphql-tag';

export const APPBAR_QUERY = gql`
  {
    getUser {
      name
      profilePicture
    }
  }
`;

export const EXAMPLE_QUERY = gql`
  {
    getUser {
      name
      profilePicture
    }
  }
`;
export const GET_EVENTS = gql`
  {
    getEvents {
      name
      profilePicture
    }
  }
`;

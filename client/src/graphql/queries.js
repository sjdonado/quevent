import gql from 'graphql-tag';

export const APPBAR_QUERY = gql`
  {
    getUser {
      id
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
export const GET_EVENTS_QUERY = gql`
  {
    getUser {
      id
      events {
        id
        name
        description
        location
        startDate
        endDate
        active
        attendance {
          id
          email
          attended
          active
          invited
        }
      }
    }
  }
`;

export const GET_ATTENDEES_QUERY = gql`
  query getEventById($eventId: ID!){
    getEvent(eventId: $eventId) {
      id
      attendance {
          id
          email
          attended
          active
          invited
        }
    }
  }
`;

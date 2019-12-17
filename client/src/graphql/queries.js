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

export const GET_EVENTS_QUERY = gql`
  {
    getUser {
      id
      events {
        _id
        name
        description
        location
        startDate
        endDate
        active
        attendance {
          _id
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
      _id
      name
      description
      location
      startDate
      endDate
      active
      attendance {
          _id
          email
          attended
          active
          invited
        }
    }
  }
`;

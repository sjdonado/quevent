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
  mutation createEvent(
    $name: String!
    $description: String!
    $location: String!
    $startDate: Date!
    $endDate: Date!
  ) {
    createEvent(name: $name, startDate: $startDate, endDate: $endDate) {
      name
      description
      location
      startDate
      endDate
    }
  }
`;

export const ADD_ATTENDEES = gql`
  mutation addAttendees(
    $eventId: ID!
    $attendees: [AttendeeInput]!
  ) {
    addAttendees(eventId: $eventId, attendees: $attendees) {
      email
      attended
      active
      invited
    }
  }
`;

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

export const CREATE_EVENT_MUTATION = gql`
  mutation createEvent(
    $name: String!
    $description: String!
    $location: String!
    $startDate: Date!
    $endDate: Date!
  ) {
    createEvent(
      name: $name
      description: $description
      location: $location
      startDate: $startDate
      endDate: $endDate
    ) {
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
    addAttendees(
      eventId: $eventId
      attendees: $attendees
    ) {
      email
      attended
      active
      invited
    }
  }
`;


export const SEND_INVITATIONS_MUTATION = gql`
  mutation sendInvitations($eventId: ID!) {
    sendInvitations(eventId: $eventId) {
      name
      startDate
      endDate
    }
  }
`;

export const READ_INVITATION_MUTATION = gql`
  mutation readInvitation($qrCodeKey: String!) {
    readInvitation(qrCodeKey: $qrCodeKey) {
      email
      attended
      active
      invited
    }
  }
`;

export const UPDATE_ATTENDEES_MUTATION = gql`
  mutation updateAttendees($eventId: ID!, $attendees: String!) {
    updateAttendees(
      eventId: $eventId
      attendees: $attendees
    ) {
      email
      attended
      active
      invited
    }
  }
`;

export const UPDATE_EVENTS_MUTATION = gql`
  mutation updateEvents($events: String!) {
    updateEvents(events: $events) {
      _id
      name
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

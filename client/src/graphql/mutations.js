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

export const ADD_ATTENDEES = gql`
  mutation addAttendees($eventId: ID!, $attendees: [AttendeeInput]!) {
    addAttendees(eventId: $eventId, attendees: $attendees) {
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

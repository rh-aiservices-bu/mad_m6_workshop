import { CREATE_NOTIFICATION, DELETE_NOTIFICATION } from "./actions";

const initialState = {
  notifications: [],
  sequence: 0,
};

export const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NOTIFICATION:
      return createNotificationState(state, action);
    case DELETE_NOTIFICATION:
      return deleteNotificationState(state, action);
    default:
      return state;
  }
};

function createNotificationState(state, action) {
  let sequence = state.sequence + 1;
  let newNotification = { key: sequence, ...action.payload.notification };
  let notifications = [...state.notifications, newNotification];
  return { ...state, sequence, notifications };
}

function deleteNotificationState(state, action) {
  let index = state.notifications.findIndex((n) => n.key === action.payload.notification.key);
  if (index < 0) {
    return state;
  }
  let notifications = [
    ...state.notifications.slice(0, index),
    ...state.notifications.slice(index + 1),
  ];
  return { ...state, notifications };
}

export default notificationsReducer;

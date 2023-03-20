export const CREATE_NOTIFICATION = "Notifications.createNotification";
export const createNotification = (notification) => ({
  type: CREATE_NOTIFICATION,
  payload: {
    notification,
  },
});

export const DELETE_NOTIFICATION = "Notifications.deleteNotification";
export const deleteNotification = (notification) => ({
  type: DELETE_NOTIFICATION,
  payload: {
    notification,
  },
});

export const createAxiosErrorNotification = (error) => {
  console.error(error);
  return {
    type: CREATE_NOTIFICATION,
    payload: {
      notification: {
        type: "error",
        header: "Request Error",
        message: error.message,
        persistent: false,
      },
    },
  };
};

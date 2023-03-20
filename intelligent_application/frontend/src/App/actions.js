export const GET_STATUS = "Status.GET_STATUS";
export const getStatus = () => ({
  type: GET_STATUS,
});

export const GET_STATUS_PENDING = "Status.GET_STATUS_PENDING";
export const getStatusPending = () => ({
  type: GET_STATUS_PENDING,
});

export const GET_STATUS_FULFILLED = "Status.GET_STATUS_FULFILLED";
export const getStatusFulfilled = (response) => ({
  type: GET_STATUS_FULFILLED,
  payload: {
    response,
  },
});

export const GET_STATUS_REJECTED = "Status.GET_STATUS_REJECTED";
export const getStatusRejected = (error) => ({
  type: GET_STATUS_REJECTED,
  payload: {
    error,
  },
});

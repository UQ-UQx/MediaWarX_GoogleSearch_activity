export default function reducer(state={
    lti_call_data: {},
    fetching: false,
    fetched: false,
    error: null,
  }, action) {

    switch (action.type) {
      case "FETCH_LTI_CALL_DATA": {
        return {...state, fetching: true}
      }
      case "FETCH_LTI_CALL_DATA_FULFILLED": {
        return {...state, fetching: false, fetched: true, lti_call_data: action.payload}
      }
      case "FETCH_LTI_CALL_DATA_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
    }

    return state
}

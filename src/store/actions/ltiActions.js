import axios from "axios";

export function fetchCallData() {
  return function(dispatch) {
    dispatch({type: "FETCH_LTI_CALL_DATA", payload: null})
    axios.get("http://rest.learncode.academy/api/test123/tweets")
      .then((response) => {
        dispatch({type: "FETCH_LTI_CALL_DATA_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_LTI_CALL_DATA_REJECTED", payload: err})
      })
  }
}

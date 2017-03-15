import { combineReducers } from "redux"

import tweets from "./tweetsReducer"
import user from "./userReducer"
import ltiCallData from "./ltiReducer.js"

export default combineReducers({
    tweets,
    user,
    ltiCallData,
})

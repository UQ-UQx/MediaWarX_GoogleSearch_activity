export default function reducer(state={
    user: {
      id: null,
      name: null,
      age: null,
      admin: false
    },
    fetching: false,
    fetched: false,
    error: null,
  }, action) {

    switch (action.type) {
      case "FETCH_USER": {
        return {...state, fetching: true}
      }
      case "FETCH_USER_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_USER_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          user: action.payload,
        }
      }
      case "SET_USER_NAME": {
        const { id, name } = action.payload

        return {
          ...state,
          user: {...state.user, name:name },
        }
      }
      case "SET_USER_AGE": {
        const { id, age } = action.payload

        return {
          ...state,
          user: {...state.user, age:age },
        }
      }
      case "SET_USER_ADMIN": {
        const { id, admin } = action.payload

        return {
          ...state,
          user: {...state.user, admin:admin },
        }
      }
    }

    return state
}

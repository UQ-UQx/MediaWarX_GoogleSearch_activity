export function fetchUser(id){
    return {
        type: "FETCH_USER_FULFILLED",
        payload:{
            id:41324322,
            name:"Ankith",
            age:26,
            admin:false
        }
    }
}

export function setUserName(id, name){
    return {
        type:"SET_USER_NAME",
        payload: {id, name},
    }
}

export function setUserAge(id, age){
    return {
        type:"SET_USER_AGE",
        payload:{id, age},
    }
}

export function setUserAdmin(id, admin){
    return {
        type:"SET_USER_ADMIN",
        payload:{id, admin},
    }
}

export const loggedIn = (data) => {
  return{
    type: "LOGIN_SUCCESS",
    payload: data
  }
}

export const ifError = (msg) => {
  return{
    type: "ERROR_MESSAGE",
    payload: msg
  }
}

export const reset = () => {
  return{
    type: "RESET"
  }
}

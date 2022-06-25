export const LoginStart = () => ({
    tip: "LOGIN_START",
});

export const UpdateUser = (user) => ({
    tip: "UPDATE_USER",
    payload: user,
});

export const Odjavi = (user) => ({
    tip: "ODJAVI",
});


export const LoginSuccess = (user) => ({
    tip: "LOGIN_SUCCESS",
    payload: user,
});

export const LoginFailure = (error) => ({
    tip: "LOGIN_FAIL",
    error: error
});

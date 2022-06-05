
const UserReducer = (state, action) => {
    switch (action.tip) {
        case "LOGIN_START":
            return {
                user: null,
                ucitavaSe: true,
                error: null,
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                ucitavaSe: false,
                error: null,
            };
        case "LOGIN_FAIL":
            return {
                user: null,
                ucitavaSe: false,
                error: action.error,
            };
        case "UPDATE_USER":
            return {
                user:   action.payload ,
                ucitavaSe: false,
                error: null,
            };
        case "ODJAVI":
            return {
                user: null,
                ucitavaSe: false,
                error: null,
            };

        default:
            return state;
    }
};

export default UserReducer

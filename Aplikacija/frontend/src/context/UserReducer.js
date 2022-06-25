
const UserReducer = (state, action) => {
    switch (action.tip) {
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                ucitavaSe: false,
                error: null,
            }
        case "UPDATE_USER":
            return {
                user: action.payload,
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

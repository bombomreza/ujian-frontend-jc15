import Axios from "axios";
import { api_url } from "../../helpers/api_url";

export const loginAction = (data) => {
	return {
		type: "LOGIN",
		payload: data,
	};
};

export const logoutAction = () => {
    return {
        type: "LOGOUT",
	};
};

export const keepLogin = (id) => {
    return (dispatch) => {
        Axios.get(`${api_url}/users/${id}`)
            .then((res) => {
                dispatch({
                    type: "LOGIN",
                    payload: res.data,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };
};
import { getToken } from "./token";

export const getEmail = async ()=> {
    try {
        const token = getToken();
        console.log( 
            "getting email with token", token
        );
        const request = await fetch(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const data = await request.json();
        console.log("fuck you", data);
        return data;
    }
    catch (error) {
        console.log("can't get the shit", error);
        return error.message;
    }
};
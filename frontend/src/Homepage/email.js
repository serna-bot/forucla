import { getToken } from "./token";

export const getEmail = async ()=> {
    try {
        const token = await getToken();
        console.log( 
            "getting email with token", token
        );
        const link = "https://www.googleapis.com/oauth2/v3/userinfo?access_token=" + token;
        const request = await fetch(
            link,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const data = await request.json();
        if (!data.hasOwnProperty("error")) {
            console.log("fuck you", data.email);
            return (data.email);
        }
        return "error";
    }
    catch (error) {
        console.log("can't get the shit", error);
        return error.message;
    }
};
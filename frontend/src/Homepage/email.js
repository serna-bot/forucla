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
            return (data.email);
        }
        return "error";
    }
    catch (error) {
        return error.message;
    }
};

export const getPhoto = async ()=> {
    try {
        const token = await getToken();
        console.log(
            "getting profile photo with token", token
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
            return (data.picture);
        }
        return "error";
    }
    catch (error) {
        return error.message;
    }
};
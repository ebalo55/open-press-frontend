import {ConfigInterface} from "@open-press/frontend-interfaces";

export const CONFIG: ConfigInterface = {
    app_name: process.env.NEXT_PUBLIC_APP_NAME,
    backend_url: process.env.NEXT_PUBLIC_BACKEND_URL,
};

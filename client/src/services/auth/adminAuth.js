import { setAuth } from "../../app/adminSlice";
import { setError } from "../../app/adminSlice";

export const checkAuth = (pin, dispatch) => {
    if (String(pin) === String(import.meta.env.VITE_ADMIN_PIN)) {
        dispatch(setAuth(true));
        return { success: true };
    } else {
        dispatch(setError("Wrong Pin"));
        return { success: false };
    }
};

import { Redirect } from "expo-router";
import { useGlobalUser } from "../context/AuthContext";

export default function Index() {
    const { user } = useGlobalUser();

    if (user) {
        return <Redirect href="/home" />;
    }

    return <Redirect href="/login" />;
}

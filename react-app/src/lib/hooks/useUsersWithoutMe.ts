import { useCallback, useMemo, useState } from "react";
import getUsers from "lib/services/fetchByQ/users/getUsers";
import OtherUser from "types/OtherUser";
import useAuth0Context from "Auth0Wrapper/AuthContext";

function useUsersWithoutMe() {
    const [users, setUsers] = useState<OtherUser[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const { user, isLoading, ...rest } = useAuth0Context();

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        const users = await getUsers();
        setUsers(users);
        setLoading(false);
    }, []);

    const usersWithoutMe = useMemo(() => users
        ?.filter(otherUser => otherUser.user_id !== user?.sub), [
        users,
        user]
    )

    return {
        loading: loading || isLoading,
        users,
        usersWithoutMe,
        me: user,
        fetchUsers,
        loadingUsers: loading,
        loadingMe: isLoading,
        ...rest
    }
}

export default useUsersWithoutMe;
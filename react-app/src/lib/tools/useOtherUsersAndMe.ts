import useAuth0Context from "Auth0Wrapper/AuthContext";
import useUsers from "lib/hooks/useUsers";
import { useMemo } from "react";

const useOtherUsersAndMe = () => {
    const { user } = useAuth0Context();
    const me = user!;
    const { users } = useUsers();
    const usersWithoutMe = useMemo(() => users.filter(user => user.user_id !== me.sub), [users, me]);

    return {
        me, 
        usersWithoutMe
    }
}

export default useOtherUsersAndMe;
import { useAppDispatch, useAppSelector } from "reduxStorage/hooks";
import { fetchUsersAsync, selectUsers } from "reduxStorage/users/users";
import { useCallback  } from "react";

function useUsers() {
    const dispatch = useAppDispatch();
    const { otherUsers, status } = useAppSelector(selectUsers);

    const fetchUsers = useCallback(() => {
        dispatch(fetchUsersAsync());
    }, [dispatch]);

    return {
        users: otherUsers,
        fetchUsers,
        loading: status === 'loading',
        status
    }
}

export default useUsers;
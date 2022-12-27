import { store } from "reduxStorage/store";
import { fetchUsersAsync } from "reduxStorage/users/users";

const UsersApi = {
    fetchUsers() {
        store.dispatch(fetchUsersAsync());
    },
}

export default UsersApi;
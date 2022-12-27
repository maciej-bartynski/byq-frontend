import { FC, ReactNode } from "react";
import OtherUser from "types/OtherUser";
import UserLabel from "../UserLabel";
import defaultCss from './UsersList.module.css';

const UsersList: FC<{
    users: (OtherUser & {
        bgColor?: string,
        pulseColor?: string,
        pulse?: boolean,
        message?: string,
    })[],
    listTitle?: ReactNode;
}> = ({
    users,
    listTitle,
}) => {
        return (
            <div className={defaultCss.root}>
                {listTitle && (
                    <div className={defaultCss.userListTitle}>
                        {listTitle}
                    </div>
                )}
                <ul>
                    {users.map(u => {
                        return (
                            <li key={u.user_id}>
                                <UserLabel
                                    email={u.email}
                                    id={u.user_id}
                                    bgColor={u.bgColor}
                                    pulseColor={u.pulseColor}
                                    pulse={u.pulse}
                                    message={u.message}
                                />
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }

export default UsersList;
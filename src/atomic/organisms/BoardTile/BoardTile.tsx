import Alert from "atomic/atoms/Alert";
import FieldLabel from "atomic/atoms/FieldLabel";
import Marker from "atomic/atoms/Marker";
import UsersList from "atomic/atoms/UsersList";
import { FC } from "react";
import OtherUser from "types/OtherUser";
import defaultCss from './BoardTile.module.css';

const BoardTile: FC<{
    name: string,
    desc: string,
    id: string,
    meOwner: boolean,
    ownershipUsers: OtherUser[],
    contributionUsers: OtherUser[],
    meRequestedDeletion: boolean,
    deletionRequestMade: boolean,
}> = ({
    name,
    desc,
    id,
    meOwner,
    ownershipUsers,
    contributionUsers,
    meRequestedDeletion,
    deletionRequestMade
}) => {

        const ownershipIndicatorColor = meOwner ? 'color-controlers' : 'color-secondary';
        const ownershipIndicatorMessage = meOwner ? 'You own this board' : 'You contribute to this board';
        const ownershipIndicatorPulse = meOwner ? 'color-controlers' : 'color-secondary';

        return (
            <div className={`${defaultCss.root} ${meOwner ? defaultCss.meOwner : ""}`}>

                <div className={defaultCss.marker}>
                    <Marker
                        bgColor={ownershipIndicatorColor}
                        message={ownershipIndicatorMessage}
                        pulseColor={ownershipIndicatorPulse}
                        pulse={!!ownershipIndicatorPulse}
                        size={12}
                    />
                    <span>
                        {ownershipIndicatorMessage}
                    </span>
                </div>

                <div className={defaultCss.id}>
                    {id}
                </div>

                <h3 className={defaultCss.title} title={name}>
                    {name}
                </h3>

                {desc && (
                    <p className={defaultCss.description} title={desc}>
                        {desc}
                    </p>
                )}

                <div className={defaultCss.userList}>
                    {!!ownershipUsers.length && <>
                        <FieldLabel>
                            owners
                        </FieldLabel>
                        <UsersList users={ownershipUsers} />
                    </>}
                    {!!contributionUsers.length && <>
                        <FieldLabel>
                            contributors
                        </FieldLabel>
                        <UsersList users={contributionUsers} />
                    </>}
                </div>
                <div className={defaultCss.alertWrapper}>
                    {meRequestedDeletion && (
                        <Alert
                            message="You asked for deletion of this item."
                            variant="red"
                        />
                    )}
                    {deletionRequestMade && (
                        <Alert
                            message="Other user(s) asked for deletion of this item."
                            variant="yellow"
                        />
                    )}
                </div>
            </div>
        )
    }

export default BoardTile;
import Alert from "atomic/atoms/Alert";
import Marker from "atomic/atoms/Marker";
import { FC } from "react";
import OtherUser from "types/OtherUser";
import defaultCss from './BoardAsHeader.module.css';
import Button from 'atomic/atoms/Button'
import Layout from "atomic/atoms/Layout";
import Toggler from "atomic/atoms/Toggler";

const BoardAsHeader: FC<{
    name: string,
    desc: string,
    id: string,
    meOwner: boolean,
    ownershipUsers: OtherUser[],
    contributionUsers: OtherUser[],
    meRequestedDeletion: boolean,
    deletionRequestMade: boolean,
    openEdition: () => void,
    openDeletion: () => void,
    loading: boolean
}> = ({
    name,
    desc,
    id,
    meOwner,
    meRequestedDeletion,
    deletionRequestMade,
    openEdition,
    openDeletion,
    loading
}) => {
        const ownershipIndicatorColor = meOwner ? 'color-controlers' : 'color-secondary';
        const ownershipIndicatorMessage = meOwner ? 'You own this board' : 'You contribute to this board';
        const ownershipIndicatorPulse = meOwner ? 'color-controlers' : 'color-secondary';

        return (
            <div className={defaultCss.root}>
                <Marker
                    bgColor={ownershipIndicatorColor}
                    message={ownershipIndicatorMessage}
                    pulseColor={ownershipIndicatorPulse}
                    pulse={!!ownershipIndicatorPulse}
                    size={12}
                />
                <Toggler
                    renderButton={props => (
                        <Layout.H1
                            className={defaultCss.title}
                            title={name}
                            onClick={props.toggleOpened}
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && props.toggleOpened()}
                        >
                            {name}
                        </Layout.H1>
                    )}
                    renderContent={() => (
                        <div className={defaultCss.boardSummary}>
                            <Layout.H1
                                className={defaultCss.title}
                                title={name}
                            >
                                {name}
                            </Layout.H1>
                            <div className={defaultCss.boardSummaryText}>
                                <strong>{id}</strong>
                            </div>
                            <div className={defaultCss.boardSummaryText}>
                                {desc}
                            </div>
                            <div className={defaultCss.boardSummaryActions}>
                                {(meRequestedDeletion || deletionRequestMade) && (
                                    <Button
                                        className={defaultCss.headline__alertsInner}
                                        title={
                                            <>
                                                {meRequestedDeletion && <Alert
                                                    message="You asked for deletion of this item."
                                                    variant="red"
                                                />}
                                                {deletionRequestMade && <Alert
                                                    message="Other user(s) asked for deletion of this item."
                                                    variant="yellow"
                                                />}
                                            </>
                                        }
                                        onClick={openDeletion}
                                    />
                                )}
                                <Button
                                    title='Edit'
                                    onClick={openEdition}
                                    disabled={loading}
                                />
                                <Button
                                    title='Delete'
                                    onClick={openDeletion}
                                    disabled={loading}
                                />
                            </div>
                        </div>
                    )}
                />
            </div>
        )
    }
export default BoardAsHeader;
import { FC } from "react";
import defaultCss from './AddDashboard.module.css';

const AddDashboard: FC<{ onClick: React.MouseEventHandler<HTMLButtonElement> }> = ({ onClick }) => {
    return (
        <button className={defaultCss.root} onClick={onClick}>
            Add board ++
        </button>
    )
}

export default AddDashboard;
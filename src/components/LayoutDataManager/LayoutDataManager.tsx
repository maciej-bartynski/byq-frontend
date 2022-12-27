import LayoutData from "lib/layout/LayoutData";
import { FC, PropsWithChildren, useEffect } from "react";

const LayoutDataManager:FC<PropsWithChildren> = ({children}) => {
    useEffect(() => {
        return () => {
            LayoutData.getInstance().clearElementRefStore();
        }
    }, [])
    return <>{children}</>
}

export default LayoutDataManager
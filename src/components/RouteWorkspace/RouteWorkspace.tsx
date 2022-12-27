import BankApi from "lib/services/apiServices/BankApi";
import ExpensesApi from "lib/services/apiServices/ExpensesApi";
import TagsApi from "lib/services/apiServices/TagsApi";
import { FC, PropsWithChildren, useEffect } from "react";
import { useParams } from "react-router-dom";

const RouteWorkspace:FC<PropsWithChildren> = ({ children }) => {
    const { workspaceId } = useParams<'workspaceId'>();
    useEffect(() => {
        if (workspaceId) {
            ExpensesApi.workspaceId = workspaceId;
            BankApi.workspaceId = workspaceId;
            TagsApi.workspaceId = workspaceId;
            ExpensesApi.fetchExpenses();
            BankApi.fetchBanks();
            TagsApi.fetchTags();
        }
        return () => {
            ExpensesApi.clearExpenses();
            BankApi.clearBanks();
            TagsApi.clearTags();
        }
    }, [workspaceId]);

    return <>{children}</>
}

export default RouteWorkspace
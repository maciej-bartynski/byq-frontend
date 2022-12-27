import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

enum Paths {
    Dashboard = '/',
    BoardDetail = '/board-detail/:workspaceId',
}

const usePaths = () => {
    const navigate = useNavigate();

    const navigateHome = useCallback(() => {
        navigate(Paths.Dashboard)
    }, [navigate]);

    const navigateWorkspace = useCallback((workspaceId: string) => {
        const workspacePath = Paths.BoardDetail.replace(':workspaceId', workspaceId);
        navigate(workspacePath)
    }, [navigate]);

    return {
        navigateHome,
        navigateWorkspace
    }
}

export default usePaths;
export {
    Paths
}
import { useAppSelector } from "reduxStorage/hooks";
import { selectExpenses } from "reduxStorage/expenses/expenses";

function useExpenses() {
    const { expenses, status } = useAppSelector(selectExpenses)
    const loading = status === 'loading';
    return {
        expenses,
        status,
        loading
    }
}

export default useExpenses;
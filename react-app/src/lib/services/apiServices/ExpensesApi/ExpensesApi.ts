import { getExpensesAsync, clearExpenses, createExpenseAsync, deleteExpenseAsync, editExpenseAsync } from "reduxStorage/expenses/expenses";
import { store } from "reduxStorage/store"
import { Expense } from "types/Expense";

const ExpensesApi = {
    workspaceId: "",

    clearExpenses: function () {
        store.dispatch(clearExpenses());
    },

    fetchExpenses: function () {
        store.dispatch(getExpensesAsync(this.workspaceId))
    },

    createExpense: function (expenseFields: Omit<Expense, "_id" | "charged">) {
        store.dispatch(createExpenseAsync({ expenseFields, workspaceId: this.workspaceId }));
    },

    deleteExpense: function (expenseId: Expense["_id"]) {
        store.dispatch(deleteExpenseAsync({
            workspaceId: this.workspaceId,
            expenseId
        }));
    },

    updateExpense: function (expenseFields: Expense) {
        store.dispatch(editExpenseAsync({ expenseFields, workspaceId: this.workspaceId }));
    }
}

export default ExpensesApi
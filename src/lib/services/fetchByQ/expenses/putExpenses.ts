import fetchByQ from "../fetchByQ";
import NoticesService from "lib/services/notices";
import { Expense } from "types/Expense";

const controllerStore = {
    controller: new AbortController()
};

const putExpense = async (values: {
    workspaceId: string;
    expenseFields: Expense
  }): Promise<any> => {
    controllerStore.controller.abort();
    controllerStore.controller = new AbortController();

    const response = await fetchByQ(`workspace/${values.workspaceId}/expense/${values.expenseFields._id}`, {
        method: 'PUT',
        signal: controllerStore.controller.signal,
        body: JSON.stringify(values.expenseFields)
    })
    
    const expense = await response.json();
    const { 
        message, 
        data 
    } = expense;
    if (response.status === 500) {
        NoticesService.newMessage(message);
    }
    return data as any
}

export default putExpense

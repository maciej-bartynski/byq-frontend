import fetchByQ from "../fetchByQ";
import NoticesService from "lib/services/notices"
import { Expense } from "types/Expense";

const controllerStore = {
    controller: new AbortController()
};

const deleteExpense = async (values: {
    expenseId: Expense["_id"],
    workspaceId: string
  }): Promise<any> => {
    controllerStore.controller.abort();
    controllerStore.controller = new AbortController();

    const response = await fetchByQ(`workspace/${values.workspaceId}/expense/${values.expenseId}`, {
        method: 'DELETE',
        signal: controllerStore.controller.signal,
    })
    
    const responseData = await response.json();
    const { 
        message, 
        data 
    } = responseData;
    if (response.status === 500) {
        NoticesService.newMessage(message);
    }
    return data as any
}

export default deleteExpense;
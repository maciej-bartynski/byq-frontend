import fetchByQ from "../fetchByQ";
import NoticesService from "lib/services/notices";
import { Expense } from "types/Expense";

const controllerStore = {
    controller: new AbortController()
};

const postExpense = async (values: {
    workspaceId: string;
    expenseFields: Omit<Expense, "_id" | 'charged'>
  }): Promise<any> => {
    controllerStore.controller.abort();
    controllerStore.controller = new AbortController();

    const response = await fetchByQ(`workspace/${values.workspaceId}/expense`, {
        method: 'POST',
        signal: controllerStore.controller.signal,
        body: JSON.stringify(values.expenseFields)
    })
    
    const creationData = await response.json();
    const { 
        message, 
        data 
    } = creationData;

    if (response.status === 500) {
        NoticesService.newMessage(message);
    }

    return data
}

export default postExpense
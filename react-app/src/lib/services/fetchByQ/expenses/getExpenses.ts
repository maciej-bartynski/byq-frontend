import fetchByQ from "../fetchByQ";
import NoticesService from "lib/services/notices"
import { Expense } from "types/Expense";

const controllerStore = {
    controller: new AbortController()
};

const getExpenses = async (workspaceId: string): Promise<Expense[]> => {
    controllerStore.controller.abort();
    controllerStore.controller = new AbortController();
    const response = await fetchByQ(`workspace/${workspaceId}/expenses`, { signal: controllerStore.controller.signal });
    const expenses = await response.json();
    const { 
        message, 
        data 
    } = expenses;

    if (response.status === 500) {
        NoticesService.newMessage(message);
    }
    
    return data as Expense[]
}

export default getExpenses
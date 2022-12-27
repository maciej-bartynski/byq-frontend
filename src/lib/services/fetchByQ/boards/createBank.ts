import fetchByQ from "../fetchByQ";
import NoticesService from "lib/services/notices"
import { BankType } from "types/Bank";

const controllerStore = {
    controller: new AbortController()
};

const createBank = async (values: {
    workspaceId: string;
    bankFields: Omit<BankType, "_id">
  }): Promise<any> => {
    controllerStore.controller.abort();
    controllerStore.controller = new AbortController();

    const response = await fetchByQ(`workspace/${values.workspaceId}/bank`, {
        method: 'POST',
        signal: controllerStore.controller.signal,
        body: JSON.stringify(values.bankFields)
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

export default createBank
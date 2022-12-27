import fetchByQ from "../fetchByQ";
import NoticesService from "lib/services/notices"
import { BankType } from "types/Bank";

const controllerStore = {
    controller: new AbortController()
};

const editBanks = async (values: {
    workspaceId: string;
    bankFields: BankType
  }): Promise<any> => {
    controllerStore.controller.abort();
    controllerStore.controller = new AbortController();

    const response = await fetchByQ(`workspace/${values.workspaceId}/bank/${values.bankFields._id}`, {
        method: 'PUT',
        signal: controllerStore.controller.signal,
        body: JSON.stringify(values.bankFields)
    })
    
    const board = await response.json();
    const { 
        message, 
        data 
    } = board;
    if (response.status === 500) {
        NoticesService.newMessage(message);
    }
    return data as any
}

export default editBanks

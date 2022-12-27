import fetchByQ from "../fetchByQ";
import NoticesService from "lib/services/notices"
import { BankType } from "types/Bank";

const controllerStore = {
    controller: new AbortController()
};

const deleteBank = async (values: {
    bankId: BankType["_id"],
    workspaceId: string
  }): Promise<any> => {
    controllerStore.controller.abort();
    controllerStore.controller = new AbortController();

    const response = await fetchByQ(`workspace/${values.workspaceId}/bank/${values.bankId}`, {
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

export default deleteBank;
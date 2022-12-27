import fetchByQ from "../fetchByQ";
import NoticesService from "lib/services/notices"
import { BankType } from "types/Bank";

const controllerStore = {
    controller: new AbortController()
};

const markBankAsPocket = async (values: {
    workspaceId: string;
    bankId: BankType['_id']
  }): Promise<any> => {
    controllerStore.controller.abort();
    controllerStore.controller = new AbortController();

    const response = await fetchByQ(`workspace/${values.workspaceId}/bank-pocket/${values.bankId}`, {
        method: 'PUT',
        signal: controllerStore.controller.signal
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

export default markBankAsPocket

import fetchByQ from "../fetchByQ";
import NoticesService from "lib/services/notices"
import { BankType } from "types/Bank";

const controllerStore = {
    controller: new AbortController()
};

const getBanks = async (boardId: string): Promise<BankType[]> => {
    controllerStore.controller.abort();
    controllerStore.controller = new AbortController();
    const response = await fetchByQ(`workspace/${boardId}/banks`, { signal: controllerStore.controller.signal });
    const banks = await response.json();
    const { 
        message, 
        data 
    } = banks;
    if (response.status === 500) {
        NoticesService.newMessage(message);
    }
    return data as BankType[]
}

export default getBanks
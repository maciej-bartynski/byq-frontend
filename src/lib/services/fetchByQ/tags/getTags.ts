import fetchByQ from "../fetchByQ";
import NoticesService from "lib/services/notices"
import { Tag } from "types/Tag";

const controllerStore = {
    controller: new AbortController()
};

const getTags = async (workspaceId: string): Promise<Tag[]> => {
    controllerStore.controller.abort();
    controllerStore.controller = new AbortController();
    const response = await fetchByQ(`workspace/${workspaceId}/tags`, { signal: controllerStore.controller.signal });
    const expenses = await response.json();
    const { 
        message, 
        data 
    } = expenses;

    if (response.status === 500) {
        NoticesService.newMessage(message);
    }
    
    return data as Tag[]
}

export default getTags
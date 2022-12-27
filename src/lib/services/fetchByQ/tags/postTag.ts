import fetchByQ from "../fetchByQ";
import NoticesService from "lib/services/notices";
import { Tag } from "types/Tag";

const controllerStore = {
    controller: new AbortController()
};

const postTag = async (values: {
    workspaceId: string;
    tagFields: Omit<Tag, "_id">
  }): Promise<any> => {
    controllerStore.controller.abort();
    controllerStore.controller = new AbortController();

    const response = await fetchByQ(`workspace/${values.workspaceId}/tag`, {
        method: 'POST',
        signal: controllerStore.controller.signal,
        body: JSON.stringify(values.tagFields)
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

export default postTag
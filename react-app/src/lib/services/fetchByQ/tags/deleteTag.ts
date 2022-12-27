import fetchByQ from "../fetchByQ";
import NoticesService from "lib/services/notices"
import { Tag } from "types/Tag";

const controllerStore = {
    controller: new AbortController()
};

const deleteTag = async (values: {
    tagId: Tag["_id"],
    workspaceId: string
  }): Promise<any> => {
    controllerStore.controller.abort();
    controllerStore.controller = new AbortController();

    const response = await fetchByQ(`workspace/${values.workspaceId}/tag/${values.tagId}`, {
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

export default deleteTag;
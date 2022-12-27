import fetchByQ from "../fetchByQ";
import NoticesService from "lib/services/notices";
import { Tag } from "types/Tag";

const controllerStore = {
    controller: new AbortController()
};

const putTag = async (values: {
    workspaceId: string;
    tagFields: Tag
  }): Promise<any> => {
    controllerStore.controller.abort();
    controllerStore.controller = new AbortController();

    const response = await fetchByQ(`workspace/${values.workspaceId}/tag/${values.tagFields._id}`, {
        method: 'PUT',
        signal: controllerStore.controller.signal,
        body: JSON.stringify(values.tagFields)
    })
    
    const expense = await response.json();
    const { 
        message, 
        data 
    } = expense;
    if (response.status === 500) {
        NoticesService.newMessage(message);
    }
    return data as any
}

export default putTag

import fetchByQ from "../fetchByQ";
import NoticesService from "lib/services/notices"

const controllerStore = {
    controller: new AbortController()
};

const deleteBoard = async (boardId: string): Promise<any> => {
    controllerStore.controller.abort();
    controllerStore.controller = new AbortController();

    const response = await fetchByQ(`boards/remove/${boardId}`, {
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

export default deleteBoard;
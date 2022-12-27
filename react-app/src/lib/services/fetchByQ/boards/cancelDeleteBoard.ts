import fetchByQ from "../fetchByQ";
import NoticesService from "lib/services/notices"

const controllerStore = {
    controller: new AbortController()
};

const cancelDeleteBoard = async (boardId: string): Promise<any> => {
    controllerStore.controller.abort();
    controllerStore.controller = new AbortController();

    const response = await fetchByQ(`boards/cancel-remove/${boardId}`, {
        method: 'PUT',
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

export default cancelDeleteBoard;
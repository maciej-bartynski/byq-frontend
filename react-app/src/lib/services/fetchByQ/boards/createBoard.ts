import BoardType from "types/Board";
import fetchByQ from "../fetchByQ";
import NoticesService from "lib/services/notices"

const controllerStore = {
    controller: new AbortController()
};

const createBoard = async (values: Omit<BoardType, "_id">): Promise<any> => {
    controllerStore.controller.abort();
    controllerStore.controller = new AbortController();

    const response = await fetchByQ('boards/create', {
        method: 'POST',
        signal: controllerStore.controller.signal,
        body: JSON.stringify(values)
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

export default createBoard
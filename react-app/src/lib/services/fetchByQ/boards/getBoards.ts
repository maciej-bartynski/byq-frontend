import BoardType from "types/Board";
import fetchByQ from "../fetchByQ";
import NoticesService from "lib/services/notices"

const controllerStore = {
    controller: new AbortController()
};

const getBoards = async (): Promise<BoardType[]> => {
    controllerStore.controller.abort();
    controllerStore.controller = new AbortController();
    const response = await fetchByQ('boards/read', { signal: controllerStore.controller.signal });
    const boards = await response.json();
    const { 
        message, 
        data 
    } = boards;
    if (response.status === 500) {
        NoticesService.newMessage(message);
    }
    return data as BoardType[]
}

export default getBoards
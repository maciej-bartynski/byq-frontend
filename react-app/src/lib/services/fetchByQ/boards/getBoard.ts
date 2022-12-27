import BoardType from "types/Board";
import fetchByQ from "../fetchByQ";
import NoticesService from "lib/services/notices"

const controllerStore = {
    controller: new AbortController()
};

const getBoard = async (boardId: string): Promise<BoardType> => {
    controllerStore.controller.abort();
    controllerStore.controller = new AbortController();
    const response = await fetchByQ(`boards/read/${boardId}`, { signal: controllerStore.controller.signal });
    const board = await response.json();
    const { 
        message, 
        data 
    } = board;
    if (response.status === 500) {
        NoticesService.newMessage(message);
    }
    return data as BoardType
}

export default getBoard
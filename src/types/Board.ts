type BoardType = {
    _id: string,
    owners: string[],
    contributors: string[],
    deleteRequests?: string[],
    content: {
        name: string,
        desc: string,
    }
}

export default BoardType
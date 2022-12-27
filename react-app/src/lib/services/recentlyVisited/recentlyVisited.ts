import dedupeArr from "lib/tools/arrayDedupe";
import arrayFilterEmptyItem from "lib/tools/arrayFilterEmptyItem";

const recentlyVisited = {
    storageKey: 'RECENTLY_VISITED',
    save(boardId: string) {
        const [recentBoardA, recentBoardB, recentBoardC] = this.read();
        const [nextRecentA, nextRecentB, nextRecentC] = dedupeArr([
            boardId,
            recentBoardA,
            recentBoardB,
            recentBoardC,
        ]);
        const nextRecentlyViewed = arrayFilterEmptyItem([nextRecentA, nextRecentB, nextRecentC]);
        window.localStorage.setItem(this.storageKey, JSON.stringify(nextRecentlyViewed));
        return nextRecentlyViewed
    },
    read(): string[] {
        const recentlyVisitedString = window.localStorage.getItem(this.storageKey) || "[]";
        try {
            const arr = JSON.parse(recentlyVisitedString);
            return arr instanceof Array && arr.every(item => typeof item === 'string')
                ? arr
                : []
        } catch {
            return [];
        }
    }
};

export default recentlyVisited
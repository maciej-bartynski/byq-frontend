import { useAppSelector } from "reduxStorage/hooks";
import { selectTags } from "reduxStorage/tags/tags";

function useTags() {
    const { tags, status } = useAppSelector(selectTags)
    const loading = status === 'loading';
    return {
        tags,
        status,
        loading
    }
}

export default useTags;
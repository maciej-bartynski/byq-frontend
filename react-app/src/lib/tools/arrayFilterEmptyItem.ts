import arrayFilterEmptyString from "./arrayFilterEmptyString";
import arrayFilterNull from "./arrayFilterNull"
import arrayFilterUndef from "./arrayFilterUndef"

const arrayFilterEmptyItem = (arr: Array<any>) => arrayFilterNull(arrayFilterUndef(arrayFilterEmptyString(arr)));
export default arrayFilterEmptyItem
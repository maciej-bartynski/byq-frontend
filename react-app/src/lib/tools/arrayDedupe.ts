const dedupeArr = (arr: Array<any>) => {
    const deduped = [];
    const seen = new Map();

    for (let i = 0; i < arr.length; i++) {
        const currentValue = arr[i];
        const duplicate = seen.get(currentValue);
        if (duplicate) { 
            continue
        } else {
            seen.set(currentValue, true);
            deduped.push(currentValue);
        }
    }

    return deduped
}

export default dedupeArr
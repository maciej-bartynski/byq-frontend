import stringCreateSimilar from "./stringCreateSimilar";

function stringCompareSimilar(a: string, b: string): boolean {
    const similarToA = stringCreateSimilar(a);
    const similarToB = stringCreateSimilar(b);
    const isSimilar = similarToA === similarToB;
    const isContained = similarToB.indexOf(similarToA) !== -1;
    return isSimilar || isContained
}

export default stringCompareSimilar;

const stringsConcatWithSpace = (stringA?: string, stringB?: string): string => {
    const separator = stringA && stringB ? " " : "";
    return `${stringA || ""}${separator}${stringB || ""}`
}

export default stringsConcatWithSpace
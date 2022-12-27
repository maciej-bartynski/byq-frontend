function stringCreateSimilar(text: string): string {
    const similarToText = text.split("").filter(mark => mark !== ' ').join("").toLowerCase();
    return similarToText;
}

export default stringCreateSimilar;
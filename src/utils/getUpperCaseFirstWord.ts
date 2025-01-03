export const getUpperCaseFirstWord = (word: string) => {
    return word[0].toUpperCase() + word.substring(1, word.length);
}
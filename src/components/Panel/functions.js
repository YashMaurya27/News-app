export const checkStringLength = (checkStr, maxLength) => {
    let words = checkStr.split(' ');
    let newStr = checkStr;
    if (words.length > maxLength) {
        words.splice(maxLength);
        newStr = words.join(' ');
    }
    return newStr;
}

export const removeSource = (checkTitle) => {
    const words = checkTitle.split(' ');
    const lastIndex = words.lastIndexOf('-');
    words.splice(lastIndex);
    checkTitle = words.join(' ');
    return checkTitle;
}
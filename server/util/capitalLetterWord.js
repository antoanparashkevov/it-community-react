const capitalLetterWord = (str) => {
    return str.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

module.exports = capitalLetterWord;
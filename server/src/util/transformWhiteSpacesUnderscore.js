const transformWhiteSpacesUnderscore = (str) => {
    return str.toLowerCase().trim().replace(' ','_')
}

module.exports = transformWhiteSpacesUnderscore;
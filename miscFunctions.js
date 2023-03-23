const generateRandomId = (len = 6) => {
    const arr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",]
    let str = ''
    while (str.length < len)
        str = str + arr[Math.round(Math.random() * (arr.length - 1))]
    return str;
}

const copyText = (documentContext, text) => {
    const node = documentContext.createElement("input");
    node.setAttribute('id', 'copyInput')
    node.setAttribute('value', text)
    documentContext.body.appendChild(node);
    const inputBox = documentContext.getElementById('copyInput');
    inputBox.select();
    documentContext.execCommand("copy");
    navigator.clipboard.writeText(inputBox.value)
    documentContext.body.removeChild(node);
}

const nameSort = (a,b) => a.name > b.name ? 1 : -1

const getValue = (val, path) => {
    path = path.split('.')
    if (path.length === 1)
        return val[path[0]] || null
    const key = path.shift()
    if (!val[key])
        return null
    return getValue(val[key], path.join('.'))
}

const keySort = (arr, ...keys) => {
    return  arr.sort((a,b) => {
        for (const key of keys) {
            const aVal = getValue(a, key)
            const bVal = getValue(b, key)
            if (aVal !== bVal)
                return aVal > bVal ? 1 : -1
        }
        return 1
    })
}

module.exports = {
    generateRandomId,
    copyText,
    nameSort,
    getValue,
    keySort,
}
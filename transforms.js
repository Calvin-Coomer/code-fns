const arrSplice = (array, spliceOperator) => {
    for (let i = 0; i < array.length; i++) {
        let res = spliceOperator(array[i]);
        if (typeof res == 'boolean' && res) {
            array.splice(i, 1);
            return arrSplice(array, spliceOperator);
        }
    }
    return array
}

const arrPopulated = (array) => {
    return Array.isArray(array) && array.length > 0;
}

const objectifyArr = (arr, identifier) => {
    return arr.reduce((obj, item) => {
        try {
            obj[item[identifier]] = item
        } catch (e) {
            // eslint-disable-next-line
            console.log(e)
        }
        return obj
    }, {})
}

const arrPushMerge = (arr, vals, compareKey) => {
    vals.forEach(val => {
        let bExists = arr.reduce((exists, obj) => {
            if (!exists) {
                if (!compareKey) {
                    if (val === obj) {return true}
                } else {
                    if (val[compareKey] === obj[compareKey]) {return true}
                }
            }
            return exists
        }, false);
        if (!bExists) {arr.push(val)}
    });
    return arr;
}

const mergeRecursive = (target, src) => {
    for (let p in src) {
        try {
            if ( src[p].constructor==Object ) {
                target[p] = mergeRecursive(target[p], src[p]);
            } else {
                target[p] = src[p];
            }
        } catch(e) {
            target[p] = src[p];
        }
    }
    return target;
}

const boolToInt = (boolVal) => {
    if (boolVal) {
        return 1
    } else {
        return 0
    }
}

module.exports = {
    arrSplice,
    arrPopulated,
    objectifyArr,
    arrPushMerge,
    mergeRecursive,
    boolToInt
}
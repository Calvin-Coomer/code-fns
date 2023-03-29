const vRequired = value => !!value || 'Required Value'
const vNotZero = value => value === '0' || value === '' || value == null ? 'Value can not be zero' : true
const vNotNull = value => value !== null || 'Required Value';
const vMin6Characters = value => value && value.split('').length >= 6 || 'Minimum 6 characters';
const vFourteenCharacters = value => value !== null && value.split('').length === 14 || 'Code has to be 14 characters long';
const vSpecialCharacter = value => value !== null && /[^A-Za-z0-9]/.test(value) || 'Minimum 1 special character (eg. !@#$%)';
const vUpperCase = value => value !== null && /[A-Z]/.test(value) || 'Minimum 1 uppercase character';
const vLowerCase = value => value !== null && /[a-z]/.test(value) || 'Minimum 1 lowercase character';
const vNumeric = value => value !== null && /[0-9]+/.test(value) || 'Minimum 1 numerical character';
const vNumberOnly = value => value !== null && /^[\d\\.]+$/.test(value) || 'Only numbers allowed';
const vWholeNumberOnly = value => value !== null && /^[\d]+$/.test(value) || 'Only whole numbers allowed';
const vEmail = value => {
        if (value && value.length > 0) {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return pattern.test(value) || 'Invalid Email Address';
        } else {
            return 'Please enter a valid email address'
        }
    };
const vCellNo = value => value !== null && /[0-9+ ][^A-Za-z]{9,}/.test(value) || 'Please enter a valid phone number';
const vIpAddress = value => {
        const pattern = /^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/;
        return pattern.test((value || '')) || 'Invalid ip address';
    };
const vPartnerCode = value => {
        if (value && value.length > 0) {
            const pattern = /^[0-9][0-9][0-9][0-9][0-9][0-9]$/;
            return pattern.test((value || '')) || 'Invalid partner code';
        } else {
            return 'Please enter a valid partner code'
        }
    };

const runValidations = (value, ...fns) => {
    for (const fn of fns) {
        try {
            const result = fn(value)
            if (result !== true)
                return result
        } catch (e) {
            return e
        }
    }
    return true
}

const isValidUrl = urlString=> {
    let urlPattern = new RegExp('^(https?:\\/\\/)?'+
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
        '((\\d{1,3}\\.){3}\\d{1,3}))'+
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
        '(\\?[;&a-z\\d%_.~+=-]*)?'+
        '(\\#[-a-z\\d_]*)?$','i');
    return !!urlPattern.test(urlString);
}

const arrPopulated = (arr) => {
    return Array.isArray(arr) && arr.length > 0;
}

module.exports = {
    vRequired,
    vNotZero,
    vNotNull,
    vMin6Characters,
    vFourteenCharacters,
    vSpecialCharacter,
    vUpperCase,
    vLowerCase,
    vNumeric,
    vNumberOnly,
    vWholeNumberOnly,
    vEmail,
    vCellNo,
    vIpAddress,
    vPartnerCode,
    runValidations,
    isValidUrl,
    arrPopulated
}
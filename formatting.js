const {format} = require("date-fns");

const dateFormats = {
    longDate: 'EEE do MMMM yyyy hh:mmaaa',
    longDateOnly: 'EEE do MMMM yyyy',
    medLongDate: 'do MMMM yyyy hh:mmaaa',
    medDate: 'do MMM hh:mmaaa',
    hourOnly: 'haaa'
}

const getFormattedDate = (typeStr, formatStr, date) => {
    try {
        const refDate = typeof date == "object" ? date : new Date(date)
        const dateFnsFormatStr = (() => {
            switch (typeStr + "-" + formatStr) {
                case 'dateTime-long': return 'EEEE do MMMM yyyy h:mm BBBB'
                case 'dateTime-medium': return 'do MMM yyyy HH:mm'
                case 'dateTime-short': return 'yyyy-MM-dd HH:mm'
                case 'date-long': return 'EEEE do MMMM yyyy'
                case 'date-medium': return 'do MMM yyyy'
                case 'date-short': return 'yyyy-MM-dd'
                case 'time-long': return 'h:mm BBBB'
                case 'time-medium': return 'h:mm aaa'
                case 'time-short': return 'HH:mm'
            }
            return null
        })()
        return format(refDate, dateFnsFormatStr)
    } catch (e) {
        console.log(e)
        return "Invalid Date"
    }
}

getFormattedDate.longDate = (date) => new Date(date, dateFormats.longDate);
getFormattedDate.longDateOnly = (date) => new Date(date, dateFormats.longDateOnly);
getFormattedDate.medLongDate = (date) => new Date(date, dateFormats.medLongDate);
getFormattedDate.medDate = (date) => new Date(date, dateFormats.medDate);
getFormattedDate.hourOnly = (date) => new Date(date, dateFormats.hourOnly);

const initialsDisplay = (str) => {
    try {
        let arrNames = str.split(' ');
        return `${arrNames[0].split('').shift()}${arrNames.pop().split('').shift()}`.toUpperCase();
    } catch(e) {
        return 'XX'
    }
}

const mobileNoDisplay = (number) => {
    try {
        return number.replace(
            /(^.{3})(.{3})(.{4}$)|(^\+27)(.{2})(.{3})(.{4}$)|(^27)(.{2})(.{3})(.{4}$)/gm
            , (_, ...args) => args.splice(0, args.length - 2).filter(val => !!val).join(' ')
        )
    } catch (e) {
        return null
    }
}

const uppercaseFirstDisplay = (str) => {
    if (!str)
        return null
    const strArr = str.split('')
    strArr[0] = strArr[0].toUpperCase()
    return strArr.join('')
}

const durationDisplay = (seconds, dense = false) => {
    let caryOver = seconds;
    const days = Math.floor(seconds / 86400);
    if (days)
        return `${days}${dense ? 'd' : (days > 1 ? ' Days' : ' Day')}`
    const hours = Math.floor(seconds / 3600);
    if (hours)
        return `${hours}${dense ? 'h' : (hours > 1 ? ' Hours' : ' Hour')}`
    const min = Math.floor(seconds / 60);
    if (min)
        return `${min}${dense ? 'm' : (min > 1 ? ' Minutes' : ' Minute')}`
    return `${Math.floor(seconds)}${dense ? 's' : (Math.floor(seconds) > 1 ? ' Seconds' : ' Second')}`
}

const hourDisplay = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const min = Math.floor((seconds % 3600) / 60);
    return `${(hours < 0 ? 0 : hours).toString().padStart(2,'0')}:${(min < 0 ? 0 : min).toString().padStart(2,'0')}h`
}

const hourDisplayWithoutUnit = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const min = Math.floor((seconds % 3600) / 60);
    const hoursStr = (hours < 0 ? 0 : hours).toString().padStart(2,'0')
    const minutesStr = (min < 0 ? 0 : min).toString().padStart(2,'0')
    return `${hoursStr}${hoursStr.split('').length >= 3 ? '' : `:${minutesStr}`}`
}

const minuteDisplayWithoutUnit = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60)
    return `${(min < 0 ? 0 : min).toString().padStart(2,'0')}:${(sec < 0 ? 0 : sec).toString().padStart(2,'0')}`
}

const hourDisplayDecimal = (seconds) => {
    const hours = +((seconds / 3600).toFixed(2));
    return hours
}

const percentDisplay = (val) => {
    try {
        return val.toFixed(1) + '%'
    } catch (e) {
        return '0%'
    }
}

const percentDisplayWithoutUnit = (val) => {
    try {
        return +(val.toFixed(1))
    } catch (e) {
        return 0
    }
}

const sizeDisplay = (size) => {
    let kb = size / 1024
    if (kb < 1024)
        return `(${Math.round((kb) * 10) / 10} KB)`
    return `(${Math.round((kb / 1024) * 10) / 10} MB)`
}

module.exports = {
    dateFormats,
    getFormattedDate,
    initialsDisplay,
    mobileNoDisplay,
    uppercaseFirstDisplay,
    durationDisplay,
    hourDisplay,
    hourDisplayWithoutUnit,
    minuteDisplayWithoutUnit,
    hourDisplayDecimal,
    percentDisplay,
    percentDisplayWithoutUnit,
    sizeDisplay,
}
export default function useFormatDate (date, dateFormat) {
    let formattedDate = ''
    
    let year = '';
    let month = '';
    let day = '';
    
    year = date.split('-')[2];
    month = date.split('-')[1];
    day = date.split('-')[0];
    
    let fullDate = new Date(Number(year), Number(month) - 1, Number(day))
    
    let monthName = new Intl.DateTimeFormat( 'en-US', {
        month: dateFormat.includes('MS') ? 'short' : 'long'
    }).format(fullDate)
    
    switch ( dateFormat ) {
        case 'D.MS':
            formattedDate = `${day}.${monthName}`
            break;
        case 'D.M':
            formattedDate = `${day}.${monthName}`
            break;
        case 'YYYY.MM.DD':
            formattedDate = `${year}.${month}.${day}`
            break;
        default:
            formattedDate = `${day}/${month}/${year}`
            
    }
    
    return { formattedDate }
    
}
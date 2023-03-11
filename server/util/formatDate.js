const formatDate = () => {
    
    const currentDate = new Date();
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    
    return `${day}-${month}-${year}`
}

module.exports = formatDate;
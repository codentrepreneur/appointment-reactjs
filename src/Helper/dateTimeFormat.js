class dateTimeFormat{

    static cleanDate = (stringDate) => {
        let formattedDate = stringDate;
        if(formattedDate){
            let d = new Date(formattedDate);
            formattedDate = `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
            //formattedDate = `${d.getTime()}`;
        }
        return formattedDate;
    }
}

export default dateTimeFormat;

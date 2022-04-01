class dateTimeFormat{

    static cleanDateTime = (stringDate) => {
        let formattedDate = stringDate;
        if(formattedDate){
            let d = new Date(formattedDate);
            formattedDate = `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
            //formattedDate = `${d.getTime()}`;
        }
        return formattedDate;
    }

    static cleanDate = (stringDate) => {
        let formattedDate = stringDate;
        if(formattedDate){
            let d = new Date(formattedDate);
            formattedDate = `${d.toLocaleDateString()}`;
            //formattedDate = `${d.getTime()}`;
        }
        return formattedDate;
    }

    static cleanTime = (stringDate) => {
        let formattedDate = stringDate;
        if(formattedDate){
            let d = new Date(formattedDate);
            formattedDate = `${d.toLocaleTimeString()}`;
            //formattedDate = `${d.getTime()}`;
        }
        return formattedDate;
    }

}

export default dateTimeFormat;

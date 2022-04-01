class Helper{
    static getItemById = (data, id) => {
        return data.find(d => d.id === parseInt(id));
    }

    static getCurrentDate = () => {
        const date = new Date();
        const today = date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate();
        return  today;
    }

    static getEndDate = () => {
        const date = new Date();
        const returnDate = date.getFullYear()+'/'+(date.getMonth()+12)+'/'+date.getDate();
        return returnDate;
    }
}

export default Helper;

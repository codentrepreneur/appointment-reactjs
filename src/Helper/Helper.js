class Helper{
    static getItemById = (data, id) => {
        return data.find(d => d.id === parseInt(id));
    }
}

export default Helper;

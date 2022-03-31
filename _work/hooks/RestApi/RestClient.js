import axios from 'axios';

class RestClient{

    /*
    * Rest client templates
    */

    //Get Request
    static GetRequest = (getUrl) => {
        return axios.get(getUrl).then(response=>{
            return response.data
        }).catch(function (error) {
            // handle error
            console.log('Error: ',error);
        });
    }

    //Put Request
    static PutRequest = (getUrl, getData) => {
        return axios.put(getUrl, getData).then( (response) =>{
            return response.data;
        }).catch(function (error) {
            // handle error
            console.log('Error: ',error);
        });
    }

    //Post Request
    static PostRequest = (getUrl, getData) => {
        return axios.post(getUrl, getData).then( (response) =>{
            return response.data;
        }).catch(function (error) {
            // handle error
            console.log('Error: ',error);
        });
    }

    //Delete Request
    static DeleteRequest = (getUrl) => {
        return axios.delete(getUrl).then( (response) =>{
            return response.data;
        }).catch(function (error) {
            // handle error
            console.log('Error: ',error);
        });
    }

}

export default RestClient;

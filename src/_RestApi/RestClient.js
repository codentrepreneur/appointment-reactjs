import axios from 'axios';

class RestClient{

    /*
    * Rest client templates
    */

    //Get Request
    static GetRequest = (getUrl, auth=false) => {

        //if true apply token...
        let headerData = {}
        if(auth){
            headerData = {
                headers:{
                    "x-access-token": localStorage.getItem("token")
                }
            }
        }

        return axios.get(getUrl,headerData).then(response=>{

            console.log('Authenticated: ',response.status); //just to check in the console if authorized.
            return response.data

        }).catch(function (error) {
            // handle error
            console.log(error.response);
            if (error.response) {
                // Check error response...
                 if(auth){
                     if(error.response.status === 401){ // if authorized force logout
                        localStorage.clear();
                     }
                 }else{
                     //console.log("Response: ", error.response.data);
                     //console.log("Response: ", error.response.status);
                     //console.log("Response: ", error.response.headers);
                 }
            } else if (error.request) {
                // Check error request...
                console.log("Request: ",error.request);
            } else {
                // Check error messeage...
                console.log('Message: ', error.message);
            }

        });
    }

    //Put Request
    static PutRequest = (getUrl, getData, auth=false) => {

        //if true apply token...
        let headerData = {}
        if(auth){
            headerData = {
                headers:{
                    "x-access-token": localStorage.getItem("token")
                }
            }
        }

        return axios.put(getUrl, getData, headerData).then( (response) =>{
            return response.data;
        }).catch(function (error) {
            // handle error
            console.log('Error: ',error);
        });
    }

    //Post Request
    static PostRequest = (getUrl, getData, auth=false) => {

        //if true apply token...
        let headerData = {}
        if(auth){
            headerData = {
                headers:{
                    "x-access-token": localStorage.getItem("token"),
                },
            }
        }

        return axios.post(getUrl, getData, headerData).then( (response) =>{
            return response.data;
        }).catch(function (error) {
            // handle error
            console.log('Error: ',error);
        });
    }

    //Delete Request
    static DeleteRequest = (getUrl, auth=false) => {

        //if true apply token...
        let headerData = {}
        if(auth){
            headerData = {
                headers:{
                    "x-access-token": localStorage.getItem("token")
                }
            }
        }

        return axios.delete(getUrl, headerData).then( (response) =>{
            return response.data;
        }).catch(function (error) {
            // handle error
            console.log('Error: ',error);
        });
    }

}

export default RestClient;

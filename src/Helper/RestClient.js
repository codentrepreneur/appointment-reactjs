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
            try{
                if(response.validation.status_code==401){
                    localStorage.clear();
                }else{
                    console.log('Authenticated: ',response.status); //just to check in the console if authorized.
                }
            }catch(error){
                console.log(error);
            }

            return response.data
        }).catch(function (error) {
            // handle error
            //console.log('Error: ',error);
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
            try{
                if(response.validation.status_code==401){
                    localStorage.clear();
                }else{
                    console.log('Authenticated: ',response.status); //just to check in the console if authorized.
                }
            }catch(error){
                //console.log(error);
            }
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
            try{
                if(response.validation.status_code==401){
                    localStorage.clear();
                }
            }catch(error){
                //console.log(error);
            }
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
            try{
                if(response.validation.status_code==401){
                    localStorage.clear();
                }
            }catch(error){
                //console.log(error);
            }
            return response.data;
        }).catch(function (error) {
            // handle error
            console.log('Error: ',error);
        });
    }

}

export default RestClient;

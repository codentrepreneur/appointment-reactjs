class Auth{
    static isLoggedIn = () => {
        return localStorage.getItem('token')?true:false;
    }

    static isScheduler = () => {
        return parseInt(localStorage.getItem('userRole'))===2?true:false;
    }

    static isDoctor = () => {
        return parseInt(localStorage.getItem('userRole'))===3?true:false;
    }
}

export default Auth;

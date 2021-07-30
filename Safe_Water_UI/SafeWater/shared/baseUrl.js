const baseUrl = 'http://localhost:3000/';

class BaseUrl {

    static dynamicBaseUrl = null;

    constructor() {
    }

    static getBaseUrl = () => {
        console.log('BaseUrl', BaseUrl.dynamicBaseUrl);
        if (BaseUrl.dynamicBaseUrl) {
            return BaseUrl.dynamicBaseUrl;
        } else {
            return baseUrl;
        }    
    }
} 
export default BaseUrl;

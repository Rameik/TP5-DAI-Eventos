class ValidacionesHelper {
    getIntegerOrDefault = (value, defaultValue) => {
        let newValue = parseInt(value)
        return Number.isInteger(newValue) ? newValue : defaultValue
    };
    
    getFloatOrDefault = (value, defaultValue) => {
        let regexPattern = /^-?[0-9]+$/;
        let result = regexPattern.test(value);
        return result ? defaultValue : value;
    }
    
    getStringOrDefault = (value, defaultValue) => {
        return value === undefined || value === null ? defaultValue : value
    };
    
    getDateOrDefault = (value, defaultValue) => {
        var fechaf = value.split("/");
        var day = fechaf[0];
        var month = fechaf[1];
        var year = fechaf[2];
        var date = new Date(year,month,'0');
        if((day-0)>(date.getDate()-0)){
            return defaultValue;
        }
        return value;
    };
}

export default new ValidacionesHelper();
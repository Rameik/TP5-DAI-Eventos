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
    
}

export default new ValidacionesHelper();
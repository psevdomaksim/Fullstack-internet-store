class ApiError extends Error{
    constructor(status, message){
        super();
        this.status = status
        this.message = message
    }
    static errorRequest(message){
        return new ApiError (484, message)
    }
    static internal(message){
        return new ApiError (500, message)
    }
    static notFound(message){
        return new ApiError (404, message)
    }
}

module.exports = ApiError
class CustomError extends Error{
    statusCode

    constructor(statusCode, message){
        super(message)
        this.statusCode = statusCode
        Object.setPrototypeOf(this, CustomError.prototype);
    }

    serializeErrors() {
        return [
          {
            statusCode: this.statusCode
          },
        ];
    }
    
}

module.exports = CustomError;

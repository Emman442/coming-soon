const AppError = require("../utils/appError")

 const devErrors = (res, error) =>{
    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message,
        stackTrace: error.stack,
        error: error
    })
 }

const castErrorHandler =(err) =>{
    const msg = `Invalid value for ${err.value} for the field ${err.path}`
    return next(new AppError(msg, 400))
}
const duplicateKeyErrorHandler = (err) =>{
    const name = error.keyValue.name
    const msg = `There's a project name ${name}. please use another name!`
    return next(new AppError(msg, 400))
}
const handleJWTExpiredError = () => {
    return next(new AppError('Your token has expired! Please log in again.', 401))
}
const ValidatonErrorHandler=(err) =>{
    const errors = Object.values(err.errors).map(val => val.message)
    const errorMessages = errors.join('. ')
    const msg = `invalid Input data ${errorMessages}`
    return next(new AppError(msg, 400))
}
const ValidatorErrorHandler=(err) =>{
    const errors = Object.values(err.errors).map(val => val.message)
    const errorMessages = errors.join('. ')
    const msg = `invalid Email ${errorMessages}`
    return next(new AppError(msg, 400))
}
 const prodErrors = (res, error) =>{
    if(error.isOperational){
    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message,
    })
  }else{
    res.status(500).json({
        status: 'error',
        message: 'Something Went Wrong please try again Later!'
    })
  }
 }

module.exports =(error, req, res, next)=>{
    error.statusCode = error.statusCode || 500
    error.status = error.status || 'error'  
    if(process.env.NODE_ENV === 'development'){
        devErrors(res, error)
    }else if(process.env.NODE_ENV === 'production'){
        
        if(error.name === 'CastError'){
            error = castErrorHandler(error)
        }
        if(error.code === '11000'){
            error = duplicateKeyErrorHandler(error)
        }
        if(error.name === 'VallidationError'){
            error = ValidatonErrorHandler(error)
        }
        if (error.name === "TokenExpiredError"){
           error = handleJWTExpiredError();
        }
        if (error.name === "JsonWebTokenError"){
           error = handleJWTError();
        }
        prodErrors(res, error)
    }
     
} 
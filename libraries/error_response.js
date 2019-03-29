'use strict';
require('./../config/err_config');



exports.error = (res,message,context,status)=>{
    res.status(status).send({
        message : message,
        context : context
    });
}
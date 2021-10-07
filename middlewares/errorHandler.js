const errorHendler = (err, req, res, next) => {
    let message = err.message || 'Something get wrong'
   let status = err.status || 500;
}

module.exports = errorHendler;
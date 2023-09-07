const setResponseError = ({
    response,
    code = 500,
    error = 'Failed request'
}) => {
    return response.status(code).json({ error })
}

module.exports = {
    setResponseError
}

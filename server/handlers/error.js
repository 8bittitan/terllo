const errorResponseHandler = ({ res }) => (status, message) => res.status(status).json({ status, message })

export default errorResponseHandler

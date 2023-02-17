const HTTP_CODES: { [key: number]: string } = {
  200: 'OK', // The request was successful
  201: 'CREATED', //The request has been fulfilled, resulting in the creation of a new resource
  204: 'NO_CONTENT', // The server has fulfilled the request, but there is no content to send back
  400: 'BAD_REQUEST', // The request was invalid or could not be understood by the server
  401: 'UNAUTHORIZED', // The client must authenticate themselves to get the requested response
  403: 'FORBIDDEN', // The server understood the request, but is refusing to fulfill it
  404: 'NOT_FOUND', // The server cannot find the requested resource
  405: 'METHOD_NOT_ALLOWED', // The request method (GET, POST, PUT, DELETE, etc.) is not allowed for the requested resource.
  500: 'INTERNAL_SERVER_ERROR', //The server encountered an unexpected condition that prevented it from fulfilling the request.
};

export default HTTP_CODES;

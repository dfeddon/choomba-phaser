// class Server {

	// constructor(event: any, context: any, callback: any) {
	module.exports.hello = (event: any, context: any, callback: any) => {
		const response = {
			statusCode: 200,
			headers: {
				'Access-Control-Allow-Origin': '*'
			},
			body: JSON.stringify({
				message: 'Go Serverless v1.0! Your function executed successfully!',
				input: event,
			}),
		};

		callback(null, response);

		// Use this code if you don't use the http event with the LAMBDA-PROXY integration
		// callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
	}
// }
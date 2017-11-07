class AjaxHelper {

	public static readonly HTTP_METHOD_POST: string = "POST";
	public static readonly HTTP_METHOD_GET: string = "GET";
	public static readonly HTTP_METHOD_OPTIONS: string = "OPTIONS";
	public static readonly HTTP_METHOD_PUT: string = "PUT";
	public static readonly HTTP_METHOD_PATCH: string = "PATCH";
	public static readonly HTTP_METHOD_DELETE: string = "DELETE";

	constructor() {
	}

	ajax(url: string, methodType: string, callback: any) {
		var xhr = new XMLHttpRequest();
		xhr.open(methodType, url, true);
		// xhr.withCredentials = true;
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send();
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				console.log("xhr done successfully");
				var resp = xhr.responseText;
				var respJson = JSON.parse(resp);
				return callback(null, respJson);
			} else {
				console.log("xhr failed", respJson);
				return callback(respJson, null);
			}
			} else {
			console.log("xhr processing going on");
			}
		};
		console.log("request sent succesfully");
	}
}

export { AjaxHelper };
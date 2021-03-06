import {Http2ServerResponse} from "http2";
import {ServerResponse as HttpServerResponse} from "http";
import {Response} from "../../server/i-response";
import {constant} from "../../constant/constant";

/**
 * Responds to the given request with the given response
 *
 * @param rawResponse
 * @param response
 * @returns
 */
export function respondToRequest(rawResponse: HttpServerResponse | Http2ServerResponse, response: Response): void {
	if ("contentType" in response) {
		rawResponse.setHeader("Content-Type", response.contentType);
	}

	if ("body" in response) {
		rawResponse.setHeader("Content-Length", Buffer.byteLength(response.body));
	}

	if ("cacheControl" in response && response.cacheControl != null) {
		rawResponse.setHeader("Cache-Control", response.cacheControl);
	}

	if ("contentEncoding" in response && response.contentEncoding != null) {
		rawResponse.setHeader("Content-Encoding", response.contentEncoding);
	}

	if ("checksum" in response && response.checksum != null) {
		rawResponse.setHeader("ETag", response.checksum);
	}

	if ("polyfillsHeader" in response && response.polyfillsHeader != null) {
		rawResponse.setHeader(constant.header.polyfills, response.polyfillsHeader);
	}

	// Allow any origin
	rawResponse.setHeader("Access-Control-Allow-Origin", "*");

	// Set the status code
	rawResponse.statusCode = response.statusCode;

	// Submit the response
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	(rawResponse as any).end("body" in response ? response.body : undefined);
}

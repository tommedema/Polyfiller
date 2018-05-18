import {IRequestHandler} from "./i-request-handler";
import {Response} from "../i-response";
import {printRequest} from "../../util/request-util/request-util";
import {RequestHandlerOptions} from "./request-handler-options";
import {constants} from "http2";
import {NOT_FOUND} from "http-status-codes";
import {RegisteredControllers} from "../../controller/controller/registered-controllers";

/**
 * A handler that can handle requests
 */
export class RequestHandler implements IRequestHandler {

	constructor (private readonly controllers: RegisteredControllers) {
	}

	/**
	 * Handles the given request
	 * @param {RequestHandlerOptions} options
	 * @returns {Promise<Response>}
	 */
	public async handle (options: RequestHandlerOptions): Promise<Response> {
		// Print the request
		printRequest(options.request);

		switch (options.request.method) {
			case "GET":
				return await this.handleGetRequest(options);
			default:
				return {
					body: `Only GET requests are supported`,
					statusCode: constants.HTTP_STATUS_METHOD_NOT_ALLOWED,
					contentType: "text/plain"
				};
		}
	}

	/**
	 * Handles the given GET request
	 * @param {RequestHandlerOptions} options
	 * @returns {Promise<Response>}
	 */
	private async handleGetRequest (options: RequestHandlerOptions): Promise<Response> {

		// Find the first matched controller
		for (const controller of this.controllers) {
			const match = controller.match(options.request);
			if (match != null) {
				return await match(options.request);
			}
		}

		// Fall back to returning a 404 request
		return {
			body: `No resource exists at '${options.request.url.pathname}'`,
			statusCode: options.request.http2
				? constants.HTTP_STATUS_NOT_FOUND
				: NOT_FOUND,
			contentType: "text/plain"
		};
	}
}
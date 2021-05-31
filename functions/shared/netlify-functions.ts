import { HandlerEvent, HandlerResponse } from '@netlify/functions';
import { EventQueryStringParameters } from '@netlify/functions/src/function/event';

export class HandlerEventQueryString {
    protected event: HandlerEvent | null = null;

    static from(event: HandlerEvent) {
        const result = new this();

        result.event = event;

        return result;
    }

    get(name: string, defaultResult: any | null = null): any | null {
        if (!this.event?.queryStringParameters) {
            return defaultResult;
        }

        if (!Object.keys(<EventQueryStringParameters>this.event.queryStringParameters).includes(name)) {
            return defaultResult;
        }

        return this.event.queryStringParameters[name] || defaultResult;
    }

    getInt(name: string, defaultResult: number | null = null): number | null {
        return Number(this.get(name, defaultResult));
        // return Number(`0${result?.replace(/[^\d]+/g, '') ?? ''}`);
    }
}

export function jsonResponse(data: any, statusCode = 200, headers = {}): HandlerResponse {
    return {
        statusCode,
        headers: Object.assign({ 'content-type': 'application/json' }, headers),
        body: JSON.stringify(data),
    };
}

export function queryString(event: HandlerEvent): HandlerEventQueryString {
    return HandlerEventQueryString.from(event);
}

export interface ServerlessFunctionJsonResponse {
    name: string;
    response: HandlerResponse;
}

export function mergeJsonResponses(responses: ServerlessFunctionJsonResponse[]): HandlerResponse {
    const parsedResponses = responses.flatMap(resp => ({ name: resp.name, response: JSON.parse(<string>resp.response.body) }));
    const result = {};

    parsedResponses.forEach(parsedResponse => {
        result[parsedResponse.name] = parsedResponse.response;
    });

    return jsonResponse(result);
}

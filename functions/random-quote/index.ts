/* eslint-disable no-unused-vars */

import { Handler, HandlerEvent } from '@netlify/functions';
import { quotes } from './quotes';
import { min, randomElement } from './../shared/helpers';
import { jsonResponse, queryString } from '../shared/netlify-functions';

interface Quote {
    quote: string;
    person: string;
}

function getQuotes(count = 1): Quote[] {
    const result: Quote[] = [];

    count = min(count, 100);

    for (let i = 0; i < count; i++) {
        result.push(<Quote>randomElement(quotes));
    }

    return result;
}

const handler: Handler = (event: HandlerEvent, _context) => {
    const count = queryString(event).getInt('count', 1);

    return jsonResponse(getQuotes(count ?? 1));
};

export { handler };

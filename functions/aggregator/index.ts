/* eslint-disable no-unused-vars */

import { Handler, HandlerEvent, HandlerResponse } from '@netlify/functions';
import { mergeJsonResponses, queryString } from '../shared/netlify-functions';
import { handler as quotesHandler } from './../random-quote';
import { handler as stylesHandler } from './../tailwind-random-styles';

const handler: Handler = async (event: HandlerEvent, _context) => {
    const styleCount = queryString(event).getInt('styleCount', 1);
    const quoteCount = queryString(event).getInt('quoteCount', 1);

    // @ts-ignore
    event.queryStringParameters['count'] = quoteCount;
    const quotesResponse = await quotesHandler(event, _context, () => true);

    // @ts-ignore
    event.queryStringParameters['count'] = styleCount;
    const stylesResponse = await stylesHandler(event, _context, () => true);

    return mergeJsonResponses([
        { name: 'quotes', response: <HandlerResponse>quotesResponse },
        { name: 'styles', response: <HandlerResponse>stylesResponse },
    ]);
};

export { handler };

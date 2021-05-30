import { Handler } from "@netlify/functions";
import { quotes } from './quotes';
import { randomElement } from './../shared/helpers';

interface Quote {
    quote: string;
    person: string;
}

function getQuote(count = 1): Quote[] {
    const result = [];

    if (count >= quotes.length) {
        return quotes;
    }

    for(let i = 0; i < count; i++) {
        let quote = randomElement(quotes);

        while(result.find(q => q.quote !== quote.quote)) {
            quote = randomElement(quotes);
        }

        result.push(quote);
    }

    return result;
}

const handler: Handler = async (event, context) => {

    let count = 1;

    if (Object.keys(event.queryStringParameters).includes('count')) {
        count = Number(`0${event.queryStringParameters['count'].replace(/[^\d]+/g, '')}`);
    }

    return {
        statusCode: 200,
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(getQuote(count)),
    };
  };

  export { handler };

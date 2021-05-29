import { Handler } from "@netlify/functions";

const handler: Handler = async (event, context) => {
  return {
    statusCode: 200,
    headers: {
        'content-type': 'application/json',
    },
    body: JSON.stringify({ message: "Hello World" }),
  };
};

export { handler };

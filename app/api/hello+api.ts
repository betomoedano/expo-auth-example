const mySecret = process.env.SECRET_KEY;

const environment = process.env.NODE_ENV;

export function GET(request: Request) {
  return Response.json({ environment, theSecretKeyIs: mySecret });
}

const environment = process.env.NODE_ENV;

export async function GET() {
  const names = ["Alice", "Bob", "Charlie", "Diana"];

  return Response.json({
    names,
    environment,
  });
}

export async function POST(request: Request) {
  const { userId } = await request.json();

  return Response.json({
    data: {
      userId,
      name: "Beto",
      email: "beto@beto.dev",
      environment,
    },
  });
}

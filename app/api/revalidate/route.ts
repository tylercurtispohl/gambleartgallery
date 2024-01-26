import { revalidateTag } from "next/cache";
import type { NextApiRequest } from "next";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

export const runtime = "edge";

const env = process.env.NODE_ENV;

// Mostly copied from this blog post:
// https://www.rudderstack.com/blog/implementing-the-tag-revalidation-caching-strategy-with-nextjs-and-sanity/
export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<
      BodyInit & { _type: string }
    >(req as unknown as NextApiRequest, process.env.SANITY_REVALIDATE_SECRET);

    if (env === "production" && !isValidSignature) {
      const message = "Invalid signature";
      return new Response(JSON.stringify({ message, isValidSignature, body }), {
        status: 401,
      });
    }

    if (!body?._type) {
      return new Response(body, { status: 400 });
    }

    // All `client.fetch` calls with `{next: {tags: [_type]}}` will be revalidated
    revalidateTag(body._type);
    console.log(`Revalidated ${body._type}`);

    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body,
    });
  } catch (err: unknown) {
    console.error(err);
    if (err instanceof Error) {
      return new Response(err.message, { status: 500 });
    }
    return new Response("Error", { status: 500 });
  }
}

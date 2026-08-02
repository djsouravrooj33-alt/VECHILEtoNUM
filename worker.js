export default {
  async fetch(request, env) {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "*",
      "Content-Type": "application/json; charset=UTF-8"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers });
    }

    try {
      const url = new URL(request.url);
      const q = url.searchParams.get("q");

      if (!q) {
        return new Response(
          JSON.stringify({
            status: false,
            message: "Use: ?q=WB01AH1004"
          }, null, 2),
          { status: 400, headers }
        );
      }

      const key = q.trim().toLowerCase();

      const mobile = await env.DB.get(key);

      if (!mobile) {
        return new Response(
          JSON.stringify({
            status: false,
            query: q,
            message: "Vehicle not found"
          }, null, 2),
          { status: 404, headers }
        );
      }

      return new Response(
        JSON.stringify({
          status: true,
          query: q,
          mobile: mobile
        }, null, 2),
        { headers }
      );

    } catch (err) {
      return new Response(
        JSON.stringify({
          status: false,
          error: err.message
        }, null, 2),
        {
          status: 500,
          headers
        }
      );
    }
  }
};

export default {
  async fetch(request) {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json; charset=UTF-8"
    };

    try {
      const url = new URL(request.url);
      const q = url.searchParams.get("q");

      if (!q) {
        return new Response(JSON.stringify({
          status: false,
          message: "Use: ?q=WB01AH1004"
        }, null, 2), { headers });
      }

      const jsonUrl =
        "https://raw.githubusercontent.com/djsouravrooj33-alt/VECHILEtoNUM/main/vechile%202320.json";

      const res = await fetch(jsonUrl);
      const data = await res.json();

      const key = q.trim().toLowerCase();

      let mobile = null;

      for (const k in data) {
        if (k.toLowerCase() === key) {
          mobile = data[k];
          break;
        }
      }

      if (!mobile) {
        return new Response(JSON.stringify({
          status: false,
          query: q,
          message: "Vehicle not found"
        }, null, 2), {
          status: 404,
          headers
        });
      }

      return new Response(JSON.stringify({
        status: true,
        query: q,
        mobile: mobile
      }, null, 2), { headers });

    } catch (e) {
      return new Response(JSON.stringify({
        status: false,
        error: e.message
      }, null, 2), {
        status: 500,
        headers
      });
    }
  }
};
export default {
  async fetch(request) {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json; charset=UTF-8"
    };

    const API_KEYS = [
      "amane001",
      "amane002",
      "amane003",
      "amane004",
      "amane005",
      "amane006"
    ];

    try {
      const url = new URL(request.url);

      const q = url.searchParams.get("q");
      const userKey = url.searchParams.get("apikey");

      if (!API_KEYS.includes(userKey)) {
        return new Response(
          JSON.stringify(
            {
              status: false,
              message: "Invalid API Key",
              developer: "@amane_friends"
            },
            null,
            2
          ),
          {
            status: 401,
            headers
          }
        );
      }

      if (!q) {
        return new Response(
          JSON.stringify(
            {
              status: false,
              message: "Use: ?apikey=amane001&q=WB01AH1004",
              developer: "@amane_friends"
            },
            null,
            2
          ),
          {
            status: 400,
            headers
          }
        );
      }

      const jsonUrl =
        "https://raw.githubusercontent.com/djsouravrooj33-alt/VECHILEtoNUM/main/vechile%202320.json";

      const res = await fetch(jsonUrl);

      if (!res.ok) {
        throw new Error("JSON file not found");
      }

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
        return new Response(
          JSON.stringify(
            {
              status: false,
              query: q,
              message: "Vehicle not found",
              developer: "@amane_friends"
            },
            null,
            2
          ),
          {
            status: 404,
            headers
          }
        );
      }

      return new Response(
        JSON.stringify(
          {
            status: true,
            query: q,
            mobile: mobile,
            api_key: userKey,
            developer: "@amane_friends"
          },
          null,
          2
        ),
        { headers }
      );
    } catch (e) {
      return new Response(
        JSON.stringify(
          {
            status: false,
            error: e.message,
            developer: "@amane_friends"
          },
          null,
          2
        ),
        {
          status: 500,
          headers
        }
      );
    }
  }
};
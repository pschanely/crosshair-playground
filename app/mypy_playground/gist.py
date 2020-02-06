import json
from typing import Dict, Optional

from tornado.httpclient import AsyncHTTPClient
from tornado.options import options


API_ENDPOINT = "https://api.github.com/gists"


async def create_gist(source: str) -> Optional[Dict[str, str]]:
    data = {
      "description": "Shared via CrossHair Playground",
      "public": True,
      "files": {
        "main.py": {
          "content": source
        }
      }
    }
    headers = {
        "Authorization": f"token {options.github_token}",
        "Content-Type": "application/json",
        "User-Agent": "crosshair-playground"  # TODO: Better UA w/ version?
    }

    client = AsyncHTTPClient()
    res = await client.fetch(API_ENDPOINT,
                             method="POST",
                             headers=headers,
                             body=json.dumps(data),
                             raise_error=False)

    if res.code != 201:
        # TODO: better error handling
        return None

    res_data = json.loads(res.body)
    result = {
        "id": res_data["id"],
        "url": res_data["html_url"],
        "source": source  # NOTE: We should obtain from response?
    }

    return result

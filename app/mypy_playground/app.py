import logging
from pathlib import Path
from typing import Any, List

import tornado.ioloop
from tornado.options import define, options
import tornado.web

from . import handlers


logger = logging.getLogger(__name__)
root_dir = Path(__file__).parents[1]
static_dir = root_dir / "static"
templates_dir = root_dir / "static"

define("docker_images",
       default="0.1:pschanely/crosshair-playground-sandbox:0.1",
       help="Docker image used by DockerSandbox")
define("sandbox_concurrency", default=3,
       help="The number of running sandboxes at the same time")
define("ga_tracking_id", default=None, help="Google Analytics tracking ID")
define("github_token", default=None,
       help="GitHub API token for creating gists")
define("mypy_versions",
       default="CrossHair latest:0.1",
       help="List of CrossHair versions used by a sandbox")
define("port", default=8080, help="Port number")
define("debug", default=False, help="Debug mode")


def make_app(**kwargs: Any) -> tornado.web.Application:
    # TODO: We can give more precise type to this variable
    #       But it doesn't work well as of mypy 0.700 / tornado 6.0.2
    routes: List[Any] = [
        (r"/typecheck.json", handlers.TypecheckHandler),
        (r"/gist", handlers.GistHandler),
        (r"/", handlers.IndexHandler),
    ]
    return tornado.web.Application(
        routes,
        static_path=static_dir,
        template_path=templates_dir,
        debug=options.debug,
        **kwargs)

# CrossHair Playground

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/pschanely/crosshair-playground/blob/master/LICENSE)

**The CrossHair playgrund** provides Web UI to run [CrossHair](https://github.com/pschanely/CrossHair) in a sandbox. Try it out here: https://crosshair-web.org

## Features
- Web UI and sandbox for running CrossHair easily and safely
- Simple and nice editor with syntax highlighting and error reporting
- Share snippets with your friends using GitHub Gist

## Development
1. Run `docker-compose up -d` to start an app and Docker for running CrossHair
2. Run `docker-compose exec docker docker build --pull -t pschanely/crosshair-playground-sandbox:0.1 /sandbox/0.1` to build a Docker image
3. Open http://localhost:8080

## Components
- [app](app): Application server
- [app/frontend](app/frontend): Frontend
- [sandbox](sandbox): Docker images for running CrossHair

## Configuration
| Name | Type | Required | Description |
|:-----|:-----|:---------|:------------|
| `DEBUG` | bool | No | Enable debug mode (default: False) |
| `PORT` | int | No | Port number (default: 8080) |
| `DOCKER_IMAGES` | list | No | Docker images used by sandbox |
| `SANDBOX_CONCURRENCY` | int | No | The number of running sandboxes at the same time (default: 3) |
| `GA_TRACKING_ID` | str | No | A tracking id for Google Analytics. If not specified, Google Analytics is disabled. |
| `GITHUB_TOKEN` | str | No | A token used to create gists |
| `MYPY_VERSIONS` | list | No | List of CrossHair versions used by a sandbox |

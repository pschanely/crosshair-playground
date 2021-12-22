FROM python:3.8-slim

RUN apt-get update
RUN apt-get install -y --no-install-recommends gcc libc-dev tk

WORKDIR /tmp

RUN pip install hypothesis icontract numpy  # optional packages
RUN pip install crosshair-tool==0.0.20

USER nobody
CMD ["/usr/local/bin/crosshair", "check"]

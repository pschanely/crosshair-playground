FROM python:3.10-slim

RUN apt-get update
RUN apt-get install -y --no-install-recommends gcc libc-dev tk

WORKDIR /tmp

RUN pip install hypothesis icontract deal numpy  # optional packages
RUN pip install crosshair-tool==0.0.27

USER nobody
CMD ["/usr/local/bin/crosshair", "check"]

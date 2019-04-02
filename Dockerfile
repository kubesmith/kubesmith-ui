FROM scratch

COPY dist /www
COPY webserver /

ENTRYPOINT ["/webserver", "-d", "/www"]

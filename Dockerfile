FROM postgres:15 AS database

RUN apt-get update && \
    apt-get install -y locales && \
    sed -i '/de_DE.UTF-8/s/^# //g' /etc/locale.gen && \
    locale-gen

ENV LANG=de_DE.UTF-8    
ENV LANGUAGE=de_DE:de
ENV LC_ALL=de_DE.UTF-8

EXPOSE 5432
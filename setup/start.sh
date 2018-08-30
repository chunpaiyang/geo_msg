#!/bin/sh
WORKD=`[ -z "$1" ] && echo "../" || "$1"`

echo ${WORKD}

cd ${WORKD} &&

. env/python2.7_env/bin/activate &&
localstack start

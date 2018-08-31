#!/bin/sh

WORKD=`[ -z "$1" ] && echo "../" || "$1"`
echo $WORKD

cd $WORKD

NODE_VER=8.10.0
NODE_ENV="env/node8.10_env"
PYTHON_BIN=/usr/bin/python2.7
PYTHON_ENV="env/python2.7_env"

if [ -d "env" ]; then
    exit 0
fi

mkdir -p env

pip install nodeenv && \
nodeenv ${NODE_ENV} --node=${NODE_VER} && \
virtualenv ${PYTHON_ENV} --python=${PYTHON_BIN} && \
. ${NODE_ENV}/bin/activate && \
npm install --save-dev  && \
npm install --save  && \
deactivate_node && \
. ${PYTHON_ENV}/bin/activate && \
pip install localstack && \
deactivate && \
exit 0;

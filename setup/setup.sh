#!/bin/sh

NODE_VER=8.10.0
NODE_ENV="env/node8.10_env"
PYTHON_BIN=/usr/bin/python2.7
PYTHON_ENV="env/python2.7_env"

mkdir -p env

pip install nodeenv || \
    (echo "install nodeenv failed" && exit 1);
nodeenv ${NODE_ENV} --node=${NODE_VER} || \
    (echo "create node vritualenv failed" && exit 1);
virtualenv ${PYTHON_ENV} --python=${PYTHON_BIN} || \
    (echo "create python2.7 virtualenv failed"  && exit 1);

source ${NODE_ENV}/bin/activate || \
    (echo "failed to activate node virtual env" && exit 1);
npm install --save-dev  || \
    (echo "install package.json devDependencies failed" && exit 1);
npm install --save  || \
    (echo "install package.json Dependencies failed" && exit 1);
deactivate_node || \
    (echo "failed to deactivate_node" && exit 1);

source ${PYTHON_ENV}/bin/activate || \
    (echo "failed ot activate python27 virtual env" && exit 1);

pip install localstack || \
    (echo "failed to install localstack" && exit 1);
deactivate || \
    (echo "failed to deactivate" && exit 1);

exit 0;

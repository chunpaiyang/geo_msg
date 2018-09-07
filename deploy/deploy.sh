#!/bin/sh

aws cloudformation delete-stack --stack-name myfirststack
aws cloudformation package --template upload.template --s3-bucket mybucket.yourname.com --output-template-file upload_output.template
aws cloudformation deploy --template-file upload_output.template --stack-name myfirststack --capabilities CAPABILITY_IAM

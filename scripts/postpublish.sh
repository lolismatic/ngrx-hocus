#!/bin/bash
version=$(cat .version)

git tag -a $version -m "CI bump"
git push origin --tag $version

#!/bin/bash
version=$(cat .version)

git tag -a $version -m "v$version"
git push origin --tag $version

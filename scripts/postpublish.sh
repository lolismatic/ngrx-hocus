#!/bin/bash
version=$(node -p -e "require('./dist/ngrx-hocus/package.json').version")

echo "Tagging '$version'"

git config --global user.email dan.patiu@gmail.com
git config --global user.name lolismatic

git tag -a "$version" -m "bump ci"
git push origin $version -f

version=$(git describe --abbrev=0 --tags)

echo "Tagged version '$version'"


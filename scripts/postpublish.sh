#!/bin/bash
version=$(node -p -e "require('./dist/ngrx-hocus/package.json').version")

echo "Tagging '$version'"

git tag -a "$version" -m "bump ci"
git push origin --tags

version=$(git describe --abbrev=0 --tags)

echo "Version of git $version"


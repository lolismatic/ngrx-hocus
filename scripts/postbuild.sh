#!/bin/bash
version=$(git describe --abbrev=0 --tags)

if [ -n "$version" ];
then
  echo "Sourced version: '$version' from tags..."
fi

branch=$(git symbolic-ref --short HEAD)

case $branch in
  develop)
    version=$(npm run --silent semver -- $version -i prerelease --preid alpha)
    echo "Current development build would be: $version"
    break;;
  release)
    version=$(npm run --silent semver -- $version -i prerelease --preid beta)
    echo "Current release build would be: $version"
    break;;
  master)
    version=$(npm run --silent semver -- $version -i patch)
    echo "Current master build would be: $version"
    break;;
esac

sed -i "s/@@version@@/$version/g" ./dist/ngrx-hocus/package.json

echo "Tagging current build artifacts: $version"

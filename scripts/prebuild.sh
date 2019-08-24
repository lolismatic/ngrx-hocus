#!/bin/bash
version=$(git describe --tags)
branch=$(git symbolic-ref --short HEAD)

case $branch in
  develop)
    version=$(npm run --silent semver -- $version -i prerelease --preid alpha)
    break;;
  release)
    version=$(npm run --silent semver -- $version -i prerelease --preid beta)
    break;;
  master)
    version=$(npm run --silent semver -- $version -i patch)
    break;;
esac

sed -i "s/@@version@@/$version/g" ./projects/ngrx-hocus/package.json
echo $version > .version

echo 'Building version $version'

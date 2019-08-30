#!/bin/bash
version=$(node -p -e "require('./dist/ngrx-hocus/package.json').version")

git tag -a "$version" -m "tagging version"

#!/bin/bash
version=$(node -p -e "require('./dist/ngrx-hocus/package.json').version")

echo "Tagging '$version'"

ghr -t ${GITHUB_TOKEN} -u ${CIRCLE_PROJECT_USERNAME} -r ${CIRCLE_PROJECT_REPONAME} -c ${CIRCLE_SHA1} -delete ${version} ./dist/

echo "Tagged version '$version'"


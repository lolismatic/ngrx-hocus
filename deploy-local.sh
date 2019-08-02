rm -rf ./dist
ng build
npm pack ./dist/ngrx-hocus
PACKAGE=$(npm pack ./dist/ngrx-hocus)
mv ${PACKAGE} ../ngrx-hocus-app
cd ../ngrx-hocus-app && npm install $PACKAGE --save

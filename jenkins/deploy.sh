#!/usr/bin/env sh

set -x
npm run build
npm start &
sleep 1
echo $! > .pidfile
set +x
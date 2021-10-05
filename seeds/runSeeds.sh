#!/bin/bash

export API_URL="http://0.0.0.0:3333/"

echo "creating employees"
bash ./seeds/employee/seed_curl.sh
echo

printf -v manager_credentials \
    '{ "cpf": "%s", "password": "%s" }' \
    "123456" "654321"

export TOKEN=$(\
curl -s http://localhost:3333/login \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d "$manager_credentials" \
  | python3 -c "import sys, json; print(json.load(sys.stdin)['token'])")

echo Generated JWT token: $TOKEN
printf -v auth 'authorization: Bearer %s' "$TOKEN"
export AUTH=$auth

# read scripts that seed the database
readarray -d '' seed_scripts < <(find ./seeds -name *_curl.sh)
echo

# run every script found except employee
while read -ra ADDR; do
    for i in "${ADDR[@]}"; do
        if [ $i != "./seeds/employee/seed_curl.sh" ]; then
            chmod +x $i
            echo running $i
            bash $i
            echo
        fi
    done
done <<< "$seed_scripts"
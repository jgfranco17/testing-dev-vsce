#!/bin/bash

extract_version() {
    local file=$1
    version=$(jq -r .version "${file}")
    echo "${version}"
}

# Get versions in both files
PACKAGE_MAIN=$(extract_version "package.json")
PACKAGE_LOCK=$(extract_version "package-lock.json")

if [ "$PACKAGE_LOCK" == "$PACKAGE_MAIN" ]; then
    echo "Node package JSON files are synced: v${PACKAGE_MAIN}"
else
    # Warning if version mismatch
    echo "package.json (${PACKAGE_MAIN}) | package-lock.json (${PACKAGE_LOCK})"
    exit 1
fi

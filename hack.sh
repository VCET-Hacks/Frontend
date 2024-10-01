#!/bin/bash

# Check if the commit message is passed as a parameter
if [ -z "$1" ]; then
  echo "Error: Commit message is required."
  exit 1
fi

# Store the commit message
message=$1

# Run the git commands
git add .
git commit -m "$message"
git push origin prod

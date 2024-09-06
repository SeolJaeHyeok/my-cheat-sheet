#!/bin/bash

folder_name="$1"
path="$2"

# Check if both folder name and path are provided
if [ -z "$folder_name" ] || [ -z "$path" ]; then
    echo "Usage: $0 <folder_name> <path>"
    exit 1
fi

# Create the folder in path
mkdir -p "$path/$folder_name"

# Create index.ts in path
template_index=$(cat ./template.index.ts)
echo "$template_index" > "$path/$folder_name/index.ts"

# Create .test.ts with template in path
template_content=$(cat ./template.test.ts)
echo "$template_content" > "$path/$folder_name/${folder_name}.test.ts"
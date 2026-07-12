#!/bin/bash
set -e

BRANCHES=(
  "jules-11911018553202008456-c1e94b47"
  "palette/fix-duplicate-dom-ids-navbar-3297582129114553384"
)

git checkout main
git pull origin main

for branch in "${BRANCHES[@]}"; do
  echo "=================================================="
  echo "Processing $branch..."
  
  if ! git checkout "$branch" 2>/dev/null; then
     git checkout -b "$branch" "origin/$branch"
  fi
  git pull origin "$branch"
  
  echo "Merging main into branch to get latest fixes..."
  git merge main --no-edit || {
    echo "FAILED: Merge conflict when merging main into $branch"
    exit 1
  }
  
  # For hugo, we might just build it. Or if it's node based, npm run build
  if [ -f "package.json" ]; then
    npm install
    npm test || exit 1
  elif [ -f "hugo" ]; then
    ./hugo || exit 1
  else
    hugo || exit 1
  fi
  
  git checkout main
  git pull origin main
  
  if ! git merge "$branch" --no-edit; then
    echo "FAILED: Merge conflict when merging $branch into main"
    exit 1
  fi
  
  git push origin main
  echo "SUCCESS: Merged and pushed $branch into main!"
done

echo "=================================================="
echo "Morning sync complete. All branches merged successfully."

#!/usr/bin/env bash
# shellcheck disable=SC1000

# generate by 2.3.2
# link (https://github.com/Template-generator/script-genrating/tree/2.3.2)

# set -x #DEBUG - Display commands and their arguments as they are executed.
# set -v #VERBOSE - Display shell input lines as they are read.
# set -n #EVALUATE - Check syntax of the script but don't execute.

total_step=7

echo "[1/$total_step] validate repository:"
if ! git diff --quiet --ignore-submodules; then
  git status --short --ignore-submodules

  printf "Are you sure, you still has some changes [Y|n]: "
  read -r ans
  if [[ $ans != "Y" ]] && [[ $ans != "y" ]]; then
    echo "exit"
    exit 0
  fi
fi

echo "[2/$total_step] list all tags that already exist:"
git tag --column
echo

version="v$(jq -r .version <package.json)"
valid=false
if [[ "$version" =~ ^v ]]; then # must has prefix v
  if ! git tag | grep -q "^$version$"; then
    printf "[3/%s] Auto valid version (v0.0.0): %s\n" "$total_step" "$version"
    valid=true
  fi
fi

if ! $valid; then
  echo "please update your package.json version first: (current=$version)" >&2
  exit 1
fi

echo "[4/$total_step] create release note"
git-chglog --next-tag "$version" --output _posts/CHANGELOG.md

echo "[5/$total_step] commit changes with release version message"
git add .
git commit --allow-empty -m "chore(release): version $version"

echo "[6/$total_step] create new git tag called '$version'"
git tag "$version"

echo "[7/$total_step] push all changes and tag to Github repository"
git push && git push --tag

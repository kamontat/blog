#!/usr/bin/env bash
# shellcheck disable=SC1000

# generate by 2.3.2
# link (https://github.com/Template-generator/script-genrating/tree/2.3.2)

# set -x #DEBUG - Display commands and their arguments as they are executed.
# set -v #VERBOSE - Display shell input lines as they are read.
# set -n #EVALUATE - Check syntax of the script but don't execute.

total_step=7

echo "[1/$total_step] validate settings and repository:"
if ! git diff --quiet --ignore-submodules; then
  echo "your worktree is not clean"
  git status --short --ignore-submodules

  exit 1
fi

echo "[2/$total_step] list all tags that already exist:"
git tag --column

exit_keyword=""
version="v$(jq -r .version <package.json)"
while true; do
  if [[ "$version" =~ ^v ]]; then # must has prefix v
    if ! git tag | grep -q "^$version$"; then
      printf "            valid version         : %s" "$version"
      break
    fi
  fi

  printf "[3/%s] Enter valid version (v0.0.0): " "$total_step"
  read -r ans
  if [[ $ans == "$exit_keyword" ]]; then
    echo "bye-bye"
    exit 0
  fi

  version="$ans"
done
test -z "$version" && exit 1

echo "[4/$total_step] create release note"
git-chglog --next-tag "$version" --output __posts/CHANGELOG.md

echo "[5/$total_step] commit changes with release version message"
git commit --allow-empty -am "chore(release): version $version"

echo "[6/$total_step] create new git tag called '$version'"
git tag "$version"

echo "[7/$total_step] push all changes and tag to Github repository"
git push && git push --tag

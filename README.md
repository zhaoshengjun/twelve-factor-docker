# Twelve Factor App

Ref: [12factor.net](12factor.net)

## Use GitFlow

* Default is `master` branch, which is the stable version
* Create a `develop` branch for developing purpose. It's the main branch for
  develop. You need to create `feature` branch to create new feature and always
  named as "feature/xxx". Then merge these features to develop branch.
* Create a `release` branch for staging/testing. You can directly update this
  branch if there's anything needs to be fixed right away but do remember to
  merge it back to `develop` branch.
* Update `master` branch when `release` branch is stable. And you can also give
  it a tag. You can also directly create `hotfix` based on master branch, and
  merge it back to `master` branch. But do remember to merge it to `develop`
  branch once it's done.
* Delete all `feature`/`hotfix` branch once it's done.

## Use `Yarn` as package manager

`Yarn` will ensure every computer will use the same version of every package.
You just need to add `yarn.lock` and `package.json` file into source control.

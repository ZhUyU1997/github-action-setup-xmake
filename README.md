# GitHub Action - Setup xmake

[![Build status](https://github.com/xmake-io/github-action-setup-xmake/workflows/test/badge.svg)](https://github.com/xmake-io/github-action-setup-xmake/actions)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/xmake-io/github-action-setup-xmake)](https://github.com/marketplace/actions/setup-xmake)

Set up your GitHub Actions workflow with a specific version of xmake

## Usage

See [action.yml](./action.yml).

## Example

Use latest version:

```yml
uses: xmake-io/github-action-setup-xmake@v1
with:
  xmake-version: latest
```

Use specified version:

```yml
uses: xmake-io/github-action-setup-xmake@v1
with:
  xmake-version: '2.5.3'
```

Use specified branch:

```yml
uses: xmake-io/github-action-setup-xmake@v1
with:
  xmake-version: branch@master
```

Use semver:

```yml
uses: xmake-io/github-action-setup-xmake@v1
with:
  xmake-version: '>=2.2.6 <=2.5.3'
```

## Contributing

### Prepare development environment

```bash
yarn install
```

### Draft a new release

```bash
yarn release
git add .
yarn version

# for a minor version or patch of v1
git tag --delete v1
git tag v1

git push origin master
git push --tags --force
```

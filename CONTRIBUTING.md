# Contribution guidelines

Thank you for considering contributing to our Survivor-Next project!

These guidelines are meant for new contributors, regardless of their level of proficiency; following them allows the maintainers our Survivor-Next project to more effectively evaluate your contribution, and provide prompt feedback to you. Additionally, by following these guidelines you clearly communicate that you respect the time and effort that the people developing Survivor-Next project put into managing the project.

#### Langage: English

All interactions should be in English, to allow everyone to understand and participate.

### Description of the project

To make it simple, it's a React-native portal mobile app with a employees photo gallery and customizable widgets. The app is connected to a back-end server that provides the data. It should be possible to customize the app by an admin panel.

## Table of Contents

- [Documentation](#documentation)
- [How to launch the project](#how-to-launch-the-project)
  - [Dependencies](#dependencies)
  - [Execution](#execution)
- [How to report a bug](#how-to-report-a-bug)
- [How to suggest a feature or enhancement](#how-to-suggest-a-feature-or-enhancement)
- [Where can I ask for help?](#where-can-i-ask-for-help)
- [Coding style](#coding-style)
- [Commit format](#commit-format)
- [Labels](#labels)
- [Branches](#branches)
  - [Namming](#branches-namming)
- [Pull Requests](#pull-requests)
  - [Namming](#pull-requests-namming)
  - [Process](#pull-requests-process)
    - [Code review](#pull-requests-process-code-review)
    - [PR Stability](#pull-requests-process-PR-stability)
    - [Miscellaneous](#pull-requests-process-miscellaneous)
- [Milestone](#milestones)
  - [Namming](#milestones-namming)
- [Testing Policies](#testing-policies)
  - [Unit tests](#testing-policies-unit-tests)
  - [Functional tests](#testing-policies-functional-tests)
  - [CI / CD](#testing-policies-CI-CD)
- [Contributors](#contributors)

## Documentation

There is no documentation for the moment but you can maybe find some documentation in the code.

## How to launch the project

### Dependencies

To launch the project, you need to install this dependencie:
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

To install other dependencies, you need to run the following commands at the root of the repository:
```bash
npm install
```

### Execution

To launch the server, you need to execute the following command:

```bash
npm start
```
and 'a' to launch on android or 'i' to launch on ios.

## How to report a bug

If you find a bug, you can open an issue on the repository. You need to describe the bug and how to reproduce it. You can maybe find a template for the issue.

## How to suggest a feature or enhancement

If you want to suggest a feature or enhancement, you can open an issue on the repository. You need to describe the feature or enhancement. You can maybe find a template for the issue.

## Where can I ask for help?

You can ask for help to [developpers team](#Contributors) or on the issue/PR.

(When interacting with us, please be human being)

## Coding style

We use EsLint as coding style.

You can check it with the following command:
```bash
npm run lint
```

## Commit format

In the project, we use [Angular Commit Convention](https://www.conventionalcommits.org/en/v1.0.0-beta.4/)

## Labels

Each labels must be the type of the Issue.
/!\ It's not the work functional type but the type of the issue. /!\

## Branch

### Namming

Branch should have an automatic namming due to branch creation via issues. But if you create a branch from nothing you must use [Angular Commit Convention](https://www.conventionalcommits.org/en/v1.0.0-beta.4/).

## Pull Requests (PR)

### Namming

If you create a PR, you must use [Angular Commit Convention](https://www.conventionalcommits.org/en/v1.0.0-beta.4/).

(In most of the case, you can reuse issue name)

### Process

#### Code review

For each PR we'll have a code review, the PR must be approved by 2 developper of the [developpers team](#Contributors).

#### PR Stability

Look at the [**Testing Policies**](#testing-policies)

#### Miscellaneous

Don't add to Survivor-Next github project except if the PR doesn't have issue (it shouldn't be the case but why not).

Don't add to any Milestone of the project. If you doubt, ask to [developpers team](#Contributors).

## Milestone

Milestone are used to organize the project. Each milestone must have a description and a due date. A milestone should be linked to an issue or a PR. A milestone should be linked to a set of functionnalities that makes the project works or a set of functionnalities that makes the project coherent.

### Namming

If you create a milestone, you must use [Angular Commit Convention](https://www.conventionalcommits.org/en/v1.0.0-beta.4/).

## Testing Policies

### Unit tests

Please do unit tests if you can. We don't have a coverage goal for the moment.

### Functional tests

We don't force you to do functional tests but if you can do it, it's better. For Admin panel and main App, you can make User Acceptance Tests (UAT).

### CI / CD

We have a really basic CI at the moment.

## Contributors

 - [Alexandre Franquet | Miouzora](https://github.com/Miou-zora)
 - [Lucas Hauzler | Ripel2](https://github.com/ripel2)
 - [Quentin Brejoin | Queng](https://github.com/queng123)
 - [Hugo Guiheneuf](https://github.com/Hugoguiheneuf)
 - [Axel Idoux | Foxaxe](https://github.com/FoxaxeWasTaken)
 - [Eliot Baratte](https://github.com/eliotbaratte)

# Appointment dev team Commit Convention

## Commit messages:

### The seven rules of a great Git commit message

1. Separate subject from body with a blank line
2. Limit the subject line to 50 characters.
3. Capitalize the subject line.
4. Do not end the subject line with a period.
5. Use the imperative mood in the subject line.
6. Wrap the body at 72 characters.
7. Use the body to explain what and why vs. how.

For more, check this out:

- [A note about commit messages](https://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)
- [Commit guidelines](https://www.git-scm.com/book/en/v2/Distributed-Git-Contributing-to-a-Project#_commit_guidelines)
- [Linux kernel contributing guidelines](https://github.com/torvalds/subsurface-for-dirk/blob/master/README.md#contributing)
- [On commit messages](https://who-t.blogspot.com/2009/12/on-commit-messages.html)
- [Erlang writting good commit messages](https://github.com/erlang/otp/wiki/writing-good-commit-messages)
- [Spring framework contributing guidelines](https://github.com/spring-projects/spring-framework/blob/30bce7/CONTRIBUTING.md#format-commit-messages)

### Message structure:

The commit message structure has 3 different parts separated by an empty line: title, body and an optional footer. Example:

```
type: subject

body

footer
```

#### Type:

The type is the title content, and it could be one of the following:

```
feat: When is new feature.

fix: When a bug is fixed.

docs: When documentation changes are made.

style: Formatting like missing commas, dots, semicolons, etc; But without changes in code.

refactor: A code change that neither fixes a bug nor adds a feature.

test: Adding missing tests, correcting or refactoring existing tests; No code changes made.

chore: Changes which doesn't change source code or tests e.g. changes to the build process, auxiliary tools, libraries; No changes in code.
```

#### Subject:

It shouldn't contain more than 50 characters, it should start with a capital letter and not end with a period. Commit must be in imperative and present tense, e.g.: `use change instead of "changed" or "changes"`.

#### Body:

Not all commits are complex enough to require a body, however it is optional and is used in case the commit requires explanation and context. We use the body to explain the What and Why of a commit and not the How? When writing the body, we require a blank line between the title and the body, and we must limit the length of each line to no more than 72 characters.

#### Footer:

Is optional like the body, but it is used to track IDs with occurrences.

## Commit Message example

```
feat: Summarize changes in around 50 characters or less

More detailed explanatory text, if necessary. Wrap it to about 72
characters or so. In some contexts, the first line is treated as the
subject of the commit and the rest of the text as the body.

The blank line separating the summary from the body is
critical (unless you omit the body entirely);
various tools like `log`, `shortlog` and `rebase` can get
confused if you run the two together.

Explain the problem that this commit is solving.
Focus on why you are making this change as oppose
to how (the code explains that).

Are there side effects or other unintuitive consequenses of this change?
Here's the place to explain them.
Further paragraphs come after blank lines.

- Bullet points are okay, too
- Typically a hyphen or asterisk is used for the bullet, preceded by a
single space, with blank lines in between, but conventions vary here

If you use an issue tracker, put references to them at the bottom, like this:

Resolves: #123
See also: #456, #789
```

## Conventional commits

### Quick examples

- `feat: add homepage / feat(scope): add new feature in scope`
- `fix(scope): fixes hydration bug`
- `feat!: breaking change` / `feat(scope)!: rework API`
- `chore(deps): update dependencies`

### Commit types

- `build`: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- `ci`: Changes to CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- **`chore`: Changes which doesn't change source code or tests e.g. changes to the build process, auxiliary tools, libraries**
- `docs`: Documentation only changes
- **`feat`: A new feature**
- **`fix`: A bug fix**
- `perf`: A code change that improves performance
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `revert`: Revert something
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `test`: Adding missing tests or correcting existing tests

---

Help links:

- How to Write a Git Commit Message article in [cbea.ms](https://cbea.ms/git-commit/).
- Buenas Practicas en Commits de Git in [codigofacilito.com](https://codigofacilito.com/articulos/41).
- Conventional commits in [conventionalcommits.org](https://gist.github.com/Zekfad/f51cb06ac76e2457f11c80ed705c95a3).
- Zekfad repositoy's [Conventional commits cheatsheet](https://gist.github.com/Zekfad/f51cb06ac76e2457f11c80ed705c95a3).




Variable .ENV:

- REACT_APP_AUTH0_DOMAIN='domainhere'
- REACT_APP_AUTH0_CLIENT_ID='clientidhere'
# Review notes

This file exists so that a pull request always changes a Markdown file. Several tests
rely on `reviews.path_instructions` scoped to `**/*.md`, which only applies when a
Markdown file is part of the change set.

Baseline: no configuration file is present on this branch.

This pull request adds one ordinary helper function. Its only purpose is to confirm
that reviews run at all on this repository, before any configuration is introduced.

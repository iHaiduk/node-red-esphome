// @ts-check

const preset = 'conventionalcommits';

/**
 * @type {import('semantic-release').Options}
 **/
export default {
  branches: [
    'main',
    {
      name: 'release',
      channel: 'next',
      prerelease: false,
    },
    {
      name: 'beta',
      prerelease: true,
    },
    {
      name: 'alpha',
      prerelease: true,
    },
  ],
  plugins: [
    'semantic-release-pinst',
    ['@semantic-release/commit-analyzer', { preset }],
    ['@semantic-release/release-notes-generator', {
      writerOpts: {
        types: [
          {
            type: 'feat',
            section: 'Features',
          },
          {
            type: 'feature',
            section: 'Features',
          },
          {
            type: 'fix',
            section: 'Bug Fixes',
          },
          {
            type: 'perf',
            section: 'Performance Improvements',
          },
          {
            type: 'revert',
            section: 'Reverts',
          },
          {
            type: 'docs',
            section: 'Documentation',
          },
          {
            type: 'style',
            section: 'Styles',
            hidden: true,
          },
          {
            type: 'chore',
            section: 'Miscellaneous Chores',
            hidden: true,
          },
          {
            type: 'refactor',
            section: 'Code Refactoring',
          },
          {
            type: 'test',
            section: 'Tests',
            hidden: true,
          },
          {
            type: 'build',
            section: 'Build System',
            hidden: true,
          },
          {
            type: 'ci',
            section: 'Continuous Integration',
            hidden: true,
          },
        ],
      },
    }],
    [
      '@semantic-release/changelog',
      { changelogFile: 'docs/CHANGELOG.md' },
    ],
    [
      '@semantic-release/npm',
      { npmPublish: false },
    ],
    ['@semantic-release/git', {
      assets: ['docs', 'package.json'],
      message: 'chore(release): ${nextRelease.version} :tada: [skip ci]\n\n${nextRelease.notes}',
    }],
    {
      path: '@semantic-release/github',
      assets: [
        {
          path: 'release.tar.gz',
          label: 'Release Artifact',
        },
      ],
    },
  ],
  releaseRules: [
    {
      type: 'docs',
      release: 'patch',
    },
    {
      type: 'refactor',
      release: 'patch',
    },
  ],
};

const execa = require('execa')
const semver = require('semver')
const inquirer = require('inquirer')

const currentVersion = require('../lerna.json').version

const release = async () => {
  console.log(`Current version: ${currentVersion}`)

  const bumps = ['patch', 'minor', 'major', 'prerelease', 'premajor']
  const versions = {}
  bumps.forEach(b => {
    versions[b] = semver.inc(currentVersion, b)
  })
  const bumpChoices = bumps.map(b => ({ name: `${b} (${versions[b]})`, value: b}))

  function getVersion (answers) {
    return answers.customVersion || versions[answers.bump]
  }

  function getNpmTags (version) {
    if (isPreRelease(version)) {
      return ['next', 'latest']
    }
    return ['latest', 'next']
  }

  function isPreRelease (version) {
    return !!semver.prerelease(version)
  }

  const { bump, customVersion, npmTag } = await inquirer.prompt([
    {
      name: 'bump',
      message: 'Select release type',
      type: 'list',
      choices: [
        ...bumpChoices,
        {
          name: 'custom',
          value: 'custom'
        }
      ]
    },
    {
      name: 'customVersion',
      message: 'Input version:',
      type: 'input',
      when: answers => answers.bump === 'custom'
    },
    {
      name: 'npmTag',
      message: 'Input npm tag.',
      type: 'list',
      default: answers => getNpmTags(getVersion(answers))[0],
      choices: answers => getNpmTags(getVersion(answers))
    }
  ])

  const version = customVersion || versions[bump]

  const { yes } = await inquirer.prompt([{
    name: 'yes',
    message: `Confirm releaseing ${version} (${npmTag})?`,
    type: 'list',
    choices: ['N', 'Y']
  }])

  if (yes === 'N') {
    console.log('[release] cancelled.')
    return
  }

  const releaseArguments = [
    'publish',
    version,
    '--force-publish',
    '--dist-tag',
    npmTag,
    '--registry',
    'https://registry.npmjs.org/',
    '*'
  ]

  console.log(`lerna ${releaseArguments.join(' ')}`)
  await execa(require.resolve('lerna/cli'), releaseArguments, { stdio: 'inherit' })
}

release().catch(err => {
  console.log(err)
  process.exit(1)
})

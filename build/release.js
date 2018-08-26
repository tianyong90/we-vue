/**
 * 构建并发布
 */

const execa = require('execa')
const inquirer = require('inquirer')
const Listr = require('listr')
const currentBranch = require('git-branch').sync()

const release = function (version) {
  const tasks = new Listr([
    {
      title: 'Check current branch',
      task: () => {
        if (currentBranch !== 'master') {
          throw Error('is not on the master branch')
        }
      }
    },
    {
      title: 'Build release.',
      task: () => execa.shell('npm run build:release')
    },
    {
      title: 'Git',
      task: () => {
        return new Listr([
          {
            title: 'Git add',
            task: () => execa.shell('git add -A')
          },
          {
            title: 'Git commit',
            task: (ctx, task) => execa.shell(`git commit -m \"[build] ${version}\"`).catch(err => {
              task.skip('nothing to commit.')
            })
          }
        ])
      }
    },
    {
      title: 'num version...',
      task: () => execa.shell(`npm version ${version} --message "[release] ${version}"`)
    },
    {
      title: 'Git tags',
      task: () => {
        return new Listr([
          {
            title: 'Git push tag',
            task: () => execa.shell(`git push origin refs/tags/v${version}`)
          },
          {
            title: 'Git push',
            task: () => execa.shell('git push origin master')
          }
        ])
      }
    },
    {
      title: 'npm publish',
      task: () => {
        if (/alpha|beta/.test(version)) {
          execa.shell('npm publish --tag next')
        } else {
          execa.shell('npm publish')
        }
      }
    }
  ])

  tasks.run().catch(err => {
    console.error(err)
  })
}

async function enterAndConfirmVersion () {
  const versionAnswer = await inquirer.prompt({
    type: 'input',
    name: 'version',
    message: '[we-vue] Enter release version:',
    validate: function(value) {
      const pass = value.match(
        /^1|2\.\d\.\d+(\-(alpha|beta)\.\d+)?$/
      )
      if (pass) {
        return true
      }

      return 'Please enter a valid version number'
    }
  })

  const confirmAnswer = await inquirer.prompt({
    type: 'confirm',
    name: 'confirm',
    message: `Releasing ${versionAnswer.version} - are you sure? `
  })

  if (confirmAnswer.confirm) {
    return versionAnswer.version
  }

  return Promise.reject()
}

enterAndConfirmVersion().then((v) => {
  release(v)
}).catch(() => {
  console.warn('Aborted!')
})

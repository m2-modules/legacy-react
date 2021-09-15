const gitUserName = require('git-user-name')
const gitUserEmail = require('git-user-email')
const { execSync } = require('child_process')

function gitUserInfo() {
  let userName = gitUserName()
  if (!userName) {
    userName = execSync('git config user.name').toString().replace(/\n/g, '')
  }

  if (!userName) {
    userName = execSync('git config --global user.name')
      .toString()
      .replace(/\n/g, '')
  }

  let userEmail = gitUserEmail()
  if (!userEmail) {
    userEmail = execSync('git config user.email').toString().replace(/\n/g, '')
  }

  if (!userEmail) {
    userEmail = execSync('git config --global user.email')
      .toString()
      .replace(/\n/g, '')
  }

  return {
    userName,
    userEmail,
  }
}

const { userName, userEmail } = gitUserInfo()

module.exports = (plop) => {
  plop.setGenerator('component', {
    description: 'Generate react component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your component name?',
      },
      {
        type: 'input',
        name: 'authorName',
        message: 'What is your name?',
        default: userName,
        validate: (value) => {
          if (!value) {
            return 'Your name is required to fill up author name of this module.'
          }

          return true
        },
      },
      {
        type: 'input',
        name: 'authorEmail',
        message: 'What is your email?',
        default: userEmail,
        validate: (value) => {
          if (!value) {
            return 'Your email is required to fill up author email of this module.'
          }
          if (!/^[a-zA-Z0-9\.]+@[a-zA-Z]+\.[a-zA-Z]+$/.test(value)) {
            return 'Invalid format of email'
          }

          return true
        },
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: '../packages/{{ kebabCase name }}',
        base: 'templates/component',
        templateFiles: 'templates/component/*',
        globOptions: {
          dot: true,
        },
      },
      {
        type: 'add',
        path:
          '../packages/{{ kebabCase name }}/__tests__/{{ pascalCase name }}.test.ts',
        templateFile: 'templates/component/__tests__/Component.test.ts.hbs',
      },
      {
        type: 'add',
        path: '../packages/{{ kebabCase name }}/src/{{ pascalCase name }}.tsx',
        templateFile: 'templates/component/src/Component.tsx.hbs',
      },
      {
        type: 'add',
        path:
          '../packages/{{ kebabCase name }}/stories/{{ pascalCase name }}.stories.tsx',
        templateFile: 'templates/component/stories/Component.stories.tsx.hbs',
      },
      {
        type: 'add',
        path:
          '../packages/{{ kebabCase name }}/src/index.ts',
        templateFile: 'templates/component/src/index.ts.hbs',
      }
    ],
  })
}

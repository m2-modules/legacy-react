module.exports = (plop) => {
  plop.setGenerator('component', {
    description: 'Generate react component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your component name?',
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
    ],
  })
}

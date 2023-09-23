import config from '..';

it('checks if all envs exist', () => {
  Object.keys(config).forEach((key) => {
    // @ts-ignore
    if (!config[key]) console.error(`Missing env - ${key}`);
    // @ts-ignore
    expect(config[key]).toBeDefined();
  });
});

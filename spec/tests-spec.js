const parse = require('../main');

describe('Test valid parsing', () => {
  it('will parse a simple boolean', () => {
    const result = parse('is:open');
    const expected = { is: ['open'] };
    expect(result).toEqual(expected);
  });

  it('will parse multiple booleans', () => {
    const result = parse('is:open is:pull-request');
    const expected = { is: ['open', 'pull-request'] };
    expect(result).toEqual(expected);
  });

  it('will parse strings with spaces', () => {
    const result = parse('author:"Andreas Kristiansen"');
    const expected = { author: ['Andreas Kristiansen'] };
    expect(result).toEqual(expected);
  });

  it('will parse multiple strings with spaces', () => {
    const result = parse('author:"Andreas Kristiansen" author:"Luke Skywalker" assistant:"Peter Wessel"');
    const expected = {
      author: ['Andreas Kristiansen', 'Luke Skywalker'],
      assistant: ['Peter Wessel']
    };
    expect(result).toEqual(expected);
  });

  it('will parse everything when mixed and matched', () => {
    const result = parse('is-not:open is:pull-request author:"Andreas Kristiansen" author:"Luke Skywalker" assistant:"Peter Wessel"');
    const expected = {
      is: ['pull-request'],
      "is-not": ['open'],
      author: ['Andreas Kristiansen', 'Luke Skywalker'],
      assistant: ['Peter Wessel']
    };
    expect(result).toEqual(expected);
  });
});

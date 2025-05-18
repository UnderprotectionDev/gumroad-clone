import { describe, it, expect, test, afterEach } from '@jest/globals';

describe('validatePayload', () => {
  it('should return true for a valid Payload object', () => {
    const valid = { id: 'abc', data: { foo: 42 } };
    expect(validatePayload(valid)).toBe(true);
  });

  test.each([
    [null, false],
    [{}, false],
    [{ id: 'abc' }, false],
    [{ data: {} }, false],
    [42, false],
  ])('should return false for invalid input %#', (input, expected) => {
    expect(validatePayload(input as any)).toBe(expected);
  });
});

describe('transformPayload', () => {
  it('should mark processed true and preserve id and data', () => {
    const payload = { id: '123', data: { x: 1 } };
    const result = transformPayload(payload);
    expect(result).toEqual({ id: '123', data: { x: 1 }, processed: true });
  });

  it('should throw an error when called with non-Payload', () => {
    expect(() => transformPayload(null as any)).toThrow();
  });
});

describe('parsePayload', () => {
  it('should parse a valid JSON string into a Payload', () => {
    const json = JSON.stringify({ id: 'xyz', data: { foo: 'bar' } });
    expect(parsePayload(json)).toEqual({ id: 'xyz', data: { foo: 'bar' } });
  });

  test.each([
    ['malformed JSON', '{ invalid json }'],
    ['wrong shape, missing fields', JSON.stringify({ foo: 'bar' })],
  ])('should throw an error for %s', (_desc, input) => {
    expect(() => parsePayload(input)).toThrow();
  });
});

afterEach(() => {
  jest.resetAllMocks();
});

it('module loads without crashing', () => {
  expect(() => require('./payload-types')).not.toThrow();
});
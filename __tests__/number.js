import { number } from '../src/lib/number';

test('some2323.234,45 to equal 2323234.45', () => {
  expect(number('some2323.234,45')).toBe('2323234.45');
});

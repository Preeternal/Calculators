import { changeDate } from '../src/lib/changeDate';

test('01.01.1970 to equal 0', () => {
  expect(changeDate('01.01.1970')).toBe(0);
});

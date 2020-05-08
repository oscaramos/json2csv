import json2csv from "./json2csv.component";

it('cases', () => {
  expect(json2csv(null)).toBe('');
  expect(json2csv('{}')).toBe('');
  expect(json2csv('{"a":"A"}')).toBe('a\nA');
  expect(json2csv('{"a":"A","b":"B"}')).toBe('a,b\nA,B');
  expect(json2csv('{"a":"A","b":"B","c":"C"}')).toBe('a,b,c\nA,B,C');
});
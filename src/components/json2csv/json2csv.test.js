import json2csv from "./json2csv.component";

const expectJson2csv = (json, csv) => {
  expect(json2csv(json)).toBe(csv);
}

it('cases', () => {
  expectJson2csv(null, '');
  expectJson2csv('{}', '');
  expectJson2csv('{"a":"A"}', 'a\nA');
  expectJson2csv('{"a":"A","b":"B"}', 'a,b\nA,B');
  expectJson2csv('{"a":"A","b":"B","c":"C"}', 'a,b,c\nA,B,C');
});

it('Invalid JSON', () => {
  expect(() => json2csv('{}{')).toThrow('Invalid JSON');
});
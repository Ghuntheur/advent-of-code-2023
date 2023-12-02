import { input } from './input';

type Colors = 'red' | 'green' | 'blue';

type DictItem = Record<Colors, number>;
type Throws = Record<Colors, number[]>;

type Dict = Record<string, DictItem>;

const calcPossibilities = (input: string[]): DictItem => {
  const throws: Throws = { blue: [], green: [], red: [] };

  const throwsByColors = input.flatMap((item) => item.split(', '));
  throwsByColors.forEach((item) => {
    const [count, color] = item.trim().split(' ') as [string, Colors];
    throws[color].push(+count);
  });

  return {
    blue: Math.max(...throws.blue),
    green: Math.max(...throws.green),
    red: Math.max(...throws.red),
  };
};

const getDict = (input: string): Dict => {
  return input.split('\n').reduce((acc, line) => {
    const [game, bag] = line.split(': ');
    const [_, id] = game.split(' ');
    const throws = bag.split(';');

    acc[id] = calcPossibilities(throws);

    return acc;
  }, {} as Dict);
};

const isPossible = (item: DictItem): boolean => {
  return item.blue <= 14 && item.green <= 13 && item.red <= 12;
};

const calcResult = (dict: Dict): number => {
  return Object.entries(dict).reduce(
    (acc, [id, possibilities]) => (acc += isPossible(possibilities) ? +id : 0),
    0,
  );
};

const dict = getDict(input);
const result = calcResult(dict);

console.log(result);

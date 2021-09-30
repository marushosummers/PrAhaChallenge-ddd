import * as faker from 'faker'
import { Team, Pair } from "../../entities/Team";

describe("Team", () => {
  describe("チーム名の制約", () => {
    describe("OK: 3文字以内の整数", () => {
      test("0", () => {
        expect(new Team({ id: faker.datatype.uuid(), name: 0, pairs: []})).toBeInstanceOf(Team);
      });
      test("1", () => {
        expect(new Team({ id: faker.datatype.uuid(), name: 1, pairs: [] })).toBeInstanceOf(Team);
      });
      test("999", () => {
        expect(new Team({ id: faker.datatype.uuid(), name: 999, pairs: [] })).toBeInstanceOf(Team);
      });
    });
    describe("NG: 小数、負の整数、4文字以上の数字", () => {
      test("0.1", () => {
        expect(() => {
          const _team = new Team({ id: faker.datatype.uuid(), name: 0.1, pairs: [] });
        }).toThrowError();
      });
      test("-1", () => {
        expect(() => {
          const _team = new Team({ id: faker.datatype.uuid(), name: -1, pairs: [] });
        }).toThrowError();
      });
      test("1000", () => {
        expect(() => {
          const _team = new Team({ id: faker.datatype.uuid(), name: 1000, pairs: [] });
        }).toThrowError();
      });
    });
    });
  });

describe("Pair", () => {
  describe("ペア名の制約", () => {
    describe("OK: 1文字の小文字アルファベット", () => {
      test("a", () => {
        expect(new Pair({ id: faker.datatype.uuid(), name: 'a', memberIds: [] })).toBeInstanceOf(Pair);
      });
      test("b", () => {
        expect(new Pair({ id: faker.datatype.uuid(), name: 'b', memberIds: [] })).toBeInstanceOf(Pair);
      });
      test("z", () => {
        expect(new Pair({ id: faker.datatype.uuid(), name: 'z', memberIds: [] })).toBeInstanceOf(Pair);
      });
    });
    describe("NG: 1文字以上、大文字、アルファベット以外", () => {
      test("aa", () => {
        expect(() => {
          const _team = new Pair({ id: faker.datatype.uuid(), name: 'aa', memberIds: [] });
        }).toThrowError();
      });
      test("A", () => {
        expect(() => {
          const _team = new Pair({ id: faker.datatype.uuid(), name: 'A', memberIds: [] });
        }).toThrowError();
      });
      test("あ", () => {
        expect(() => {
          const _team = new Pair({ id: faker.datatype.uuid(), name: 'あ', memberIds: [] });
        }).toThrowError();
      });
    });
  });
});

import * as faker from 'faker'
import { Pair } from "../../entities/Pair";

describe("Pair", () => {
  describe("ペア名の制約", () => {
    describe("OK: 1文字の小文字アルファベット", () => {
      test("a", () => {
        expect(new Pair({ id: faker.datatype.uuid(), name: 'a', members: [] })).toBeInstanceOf(Pair);
      });
      test("b", () => {
        expect(new Pair({ id: faker.datatype.uuid(), name: 'b', members: [] })).toBeInstanceOf(Pair);
      });
      test("z", () => {
        expect(new Pair({ id: faker.datatype.uuid(), name: 'z', members: [] })).toBeInstanceOf(Pair);
      });
    });
    describe("NG: 1文字以上、大文字、アルファベット以外", () => {
      test("aa", () => {
        expect(() => {
          const _team = new Pair({ id: faker.datatype.uuid(), name: 'aa', members: [] });
        }).toThrowError();
      });
      test("A", () => {
        expect(() => {
          const _team = new Pair({ id: faker.datatype.uuid(), name: 'A', members: [] });
        }).toThrowError();
      });
      test("あ", () => {
        expect(() => {
          const _team = new Pair({ id: faker.datatype.uuid(), name: 'あ', members: [] });
        }).toThrowError();
      });
    });
    });
  });


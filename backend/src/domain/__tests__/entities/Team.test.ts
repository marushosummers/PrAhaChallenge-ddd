import * as faker from 'faker'
import { Team } from "../../entities/Team";

describe("Team", () => {
  describe("チーム名の制約", () => {
    describe("OK: 3文字以内の整数", () => {
      test("0", () => {
        expect(new Team({ id: faker.datatype.uuid(), name: 0 })).toBeInstanceOf(Team);
      });
      test("1", () => {
        expect(new Team({ id: faker.datatype.uuid(), name: 1 })).toBeInstanceOf(Team);
      });
      test("999", () => {
        expect(new Team({ id: faker.datatype.uuid(), name: 999 })).toBeInstanceOf(Team);
      });
    });
    describe("NG: 小数、負の整数、4文字以上の数字", () => {
      test("0.1", () => {
        expect(() => {
          const _team = new Team({ id: faker.datatype.uuid(), name: 0.1 });
        }).toThrowError();
      });
      test("-1", () => {
        expect(() => {
          const _team = new Team({ id: faker.datatype.uuid(), name: -1 });
        }).toThrowError();
      });
      test("1000", () => {
        expect(() => {
          const _team = new Team({ id: faker.datatype.uuid(), name: 1000 });
        }).toThrowError();
      });
    });
    });
  });


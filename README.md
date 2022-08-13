#

## 仕様

- チーム
  - [x] 一覧取得
  - [x] 更新（少なくとも所属するペアを変更できること）

- ペア
  - [x] 一覧取得
  - [x] 更新（少なくとも所属する参加者を変更できること）

- 参加者
  - [x] 一覧取得
  - [x] 新規追加
  - [x] 更新（少なくとも在籍ステータスを変更できること）
  - [x] 削除

- 課題
  - [x] 新規追加
    - [x] 作成時に、参加者全員にNOT YETのステータスで課題が作成される
  - [x] 更新（少なくとも進捗ステータスを変更できること）
    - [x] NOTYET -> REQUESTREVIEW -> DONE
    - [x] 存在しないステータスには変更できない
    - [x] DONEになった課題はステータスを変更できない
  - [x] 削除

- 検索
  - [x] 「特定の課題（複数可能）」が「特定の進捗ステータス」になっている参加者の一覧を、10人単位でページングして取得する => 10件ずつ取得は実装済み。10人ごとにページングする方法を追加実装する。

## 仕様詳細

### チーム

- [x] 名前がある（1,2,3,4のような数字でなければいけない。重複不可）
- [x] 名前は3文字以下でなければいけない（チーム1031は存在できない。999まで）
- [x] 最低でも参加者が3名いなければならない。3名以下になった時の挙動については以下の「チームやペア移動に関する仕様」を参照してください

### ペア

- [x] 名前がある（a,b,c,d,eのような英文字でなければいけない）
- [x] ペア名は1文字でなければいけない
- [x] 参加者は2名〜3名まで。1名のペアや、4名のペアは存在できない
- [x] ペアは必ず同じチームの参加者から選ばれます（チーム1とチーム2の参加者がペアを組むことはありません）

### 参加者

- [x] 名前とメールアドレスを持つ
- [x] メールアドレスの重複は許容されない
- [x] 在籍ステータスを持つ。取りうる値は「在籍中」「休会中」「退会済」の3つ
- [x] ステータスが「在籍中」以外の場合、どのチームにもペアにも所属してはいけない

### 課題

- [x] 全ての参加者は複数の課題（80個ぐらい）を所有（割り当てられて）いる
- [x] 課題には、参加者ごとに進捗ステータスがある
- [x] 進捗ステータスは「未着手、レビュー待ち、完了」いずれかの値を持つ
- [x] 進捗ステータスはいつでも変更可能
- [x] ただし一度「完了」にした進捗ステータスを「レビュー待ち」「未着手」に戻すことはできない

## Dockerによる環境構築

```bash
cd .docker
docker compose up -d
docker compose exec backend /bin/bash
```

## Installation

```bash
yarn
```

## Running the app

```bash
# develop mode localhost:3000
# Swagger localhost:3000/api
yarn dev

# production mode
yarn start
```

## Running prisma studio

```bash
yarn studio:dev
```

## Test

```bash
# unit tests
$ yarn test:unit

# test all
$ yarn test
```

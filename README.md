## 仕様

- 参加者
  - [x] 一覧取得
  ```
  curl localhost:3000/member | jq
  ```
  - [ ] 新規追加
  ```
  curl -X POST -H "Content-Type: application/json" -d '{"name":"Sample Name", "email": "sample@example.com"}' localhost:3000/member
  ```
  - [ ] 更新（少なくとも在籍ステータスを変更できること）
  - [ ] 削除


- チーム
  - [x] 一覧取得
  ```
  curl localhost:3000/team | jq
  ```

  - [ ] 更新（少なくとも所属するペアを変更できること）

- ペア
  - [x] 一覧取得
  ```
  curl localhost:3000/pair | jq
  ```
  - [ ] 更新（少なくとも所属する参加者を変更できること）

- 課題
  - [x] 新規追加
    - [x] 作成時に、参加者全員にNotyetのステータスで課題が作成される
    ```
      curl -X POST -H "Content-Type: application/json" -d '{"content":"データベースを触ってみよ う"}' localhost:3000/task

      {"id":"b9758669-96e0-411c-9e21-630543f39d57","content":"データベースを触ってみよう"}
    ```
  - [x] 更新（少なくとも進捗ステータスを変更できること）
    - [x] NOTYET -> REQUESTREVIEW -> DONE
      ```curl
      curl -X PATCH -H "Content-Type: application/json" -d '{"taskProgressStatus":"DONE"}' localhost:3000/member/445dd3bc-25dc-4585-a7f4-bc6c82dc445b/task/fe8bba18-b508-4258-981e-4a3c9ab1605b | jq
      ```
    - [x] 存在しないステータスには変更できない
      ```curl
      curl -X PATCH -H "Content-Type: application/json" -d '{"taskProgressStatus":"INPROGRESS"}' localhost:3000/member/445dd3bc-25dc-4585-a7f4-bc6c82dc445b/task/fe8bba18-b508-4258-981e-4a3c9ab1605b | jq

      {
        "statusCode": 400,
        "message": [
          "taskProgressStatus must be a valid enum value"
        ],
        "error": "Bad Request"
      }
      ```
    - [x] DONEになった課題はステータスを変更できない
    ```
    curl -X PATCH -H "Content-Type: application/json" -d '{"taskProgressStatus":"REQUESTREVIEW"}' localhost:3000/member/445dd3bc-25dc-4585-a7f4-bc6c82dc445b/task/fe8bba18-b508-4258-981e-4a3c9ab1605b | jq

    {
      "status": 500,
      "error": "Task is already done."
    }
    ```

  - [x] 削除
    ```
    curl -X DELETE localhost:3000/task/0d4e0f90-6ec3-4772-aa59-16c46bc8450d | jq

    {
      "id": "0d4e0f90-6ec3-4772-aa59-16c46bc8450d",
      "content": "データベースを触ってみよう"
    }
    ```

- 検索
  - [x] 「特定の課題（複数可能）」が「特定の進捗ステータス」になっている参加者の一覧を、10人単位でページングして取得する => 10件ずつ取得は実装済み。10人ごとにページングする方法を追加実装する。

## 仕様詳細

### チーム
- [x] 名前がある（1,2,3,4のような数字でなければいけない。重複不可）
- [x] 名前は3文字以下でなければいけない（チーム1031は存在できない。999まで）
- [ ] 最低でも参加者が3名いなければならない。3名以下になった時の挙動については以下の「チームやペア移動に関する仕様」を参照してください

### ペア
- [x] 名前がある（a,b,c,d,eのような英文字でなければいけない）
- [x] ペア名は1文字でなければいけない
- [ ] 参加者は2名〜3名まで。1名のペアや、4名のペアは存在できない
- [x] ペアは必ず同じチームの参加者から選ばれます（チーム1とチーム2の参加者がペアを組むことはありません）

### 参加者
- [x] 名前とメールアドレスを持つ
- [x] メールアドレスの重複は許容されない
- [x] 在籍ステータスを持つ。取りうる値は「在籍中」「休会中」「退会済」の3つ
- [ ] ステータスが「在籍中」以外の場合、どのチームにもペアにも所属してはいけない

### 課題
- [x] 全ての参加者は複数の課題（80個ぐらい）を所有（割り当てられて）いる
- [x] 課題には、参加者ごとに進捗ステータスがある
- [x] 進捗ステータスは「未着手、レビュー待ち、完了」いずれかの値を持つ
- [x] 進捗ステータスはいつでも変更可能
- [x] ただし一度「完了」にした進捗ステータスを「レビュー待ち」「未着手」に戻すことはできない

## Dockerによる環境構築

```
cd .docker
docker compose up -d
docker compose exec backend /bin/bash
```

## Installation

```bash
$ yarn
```

## Running the app

```bash
$ yarn dev

# production mode
$ yarn start
```

## Running prisma studio

```bash
$ yarn studio:dev
```


## Test

```bash
# unit tests
$ yarn test:unit

# test all
$ yarn test
```


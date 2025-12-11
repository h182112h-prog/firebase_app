# ①課題名
キャンプ場の位置情報&画像保存アプリ

## ②課題内容（どんな作品か）
- 過去に自分が訪れたキャンプ場の位置情報とお気に入りの写真を一枚保存することができる

## ③アプリのデプロイURL
https://h182112h-prog.github.io/firebase_app/

## ④アプリのログイン用IDまたはPassword（ある場合）
なし

## ⑤工夫した点・こだわった点
- FireBaseのRealtime Databaseだけでなく、Storage機能も使用した
- LocalStorageでは写真のアップロード・保存はできなかったが、firebaseを使用することで可能とした
- Storageに格納した画像をHTML上でどう表示させるかを工夫した

## ⑥難しかった点・次回トライしたいこと（又は機能）
- Storageに保存した画像のURLを取得し、そのURLをRealtime Databaseへ一旦保存し、それを表示させた
- 削除ボタンでFirebase側のデータ削除はできたが、HTML上の削除ができなかった点を工夫した
- （次回）個々で削除できる仕組みを取り入れたい
- （次回）日付や都道府県などでフィルターする仕組み

## ⑦フリー項目（感想、シェアしたいこと等なんでも）
- 前回のLocalStorageの課題では画像をアップできず歯痒かったが、Firebaseにより実現できた
- [参考記事]
  - 1. [https://firebase.google.com/docs/storage/web/start?hl=ja]
  - 2. [https://firebase.google.com/docs/firestore/client/libraries?hl=ja]
  - 3. [https://www.yururiwork.net/archives/1372]
  - 4. [https://www.sejuku.net/blog/57841]
  - 5. [https://www.sejuku.net/blog/49377]

//Firebaseへの接続
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getDatabase, ref, push, set, onChildAdded, remove, onChildRemoved }
    from "https://www.gstatic.com/firebasejs/11.0.0/firebase-database.js";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-storage.js";



// Your web app's Firebase configuration
//ここにAPIキー
//ここはマスク

const app = initializeApp(firebaseConfig); //Fire databaseにログイン
const db = getDatabase(app); //RealtimeDBに接続
const campRef = ref(db, "camp"); //RealtimeDB内の"camp"を使う
const storage = getStorage(app); //Storageを作成




// 1. 登録イベント


$("#save").on("click", async function(){
    const date = $("#date").val();
    const camp_name = $("#name").val();
    const prefectures = $("#prefectures").val();
    const url = `https://www.google.com/maps/search/?api=1&query=${camp_name}+${prefectures}`;
    const image = $("#image_input").prop("files")[0]; //ファイルのアップロード

    //Firebase Storage のパス
    const storagePathRef = storageRef(storage, "images/" + Date.now() + "_"+image.name);

    //画像のアップロード
    await uploadBytes(storagePathRef, image);

    //画像のURL取得
    const imageUrl = await getDownloadURL(storagePathRef);

    //画像のURLを表示
    console.log("画像URL:", imageUrl);


    // Firebase内にオブジェクトを作成
    const camp = {
      date: date,
      name: camp_name,
      prefectures: prefectures,
      url: url,
      imageUrl: imageUrl, 
    }
    console.log(camp.date)

    const newPostRef = push(campRef);
    set(newPostRef, camp)
        .then(() => {
            console.log("データの保存に成功しました！");
            alert("登録しました！");
            //空欄にするテクニック
            $("#date").val("");
            $("#name").val("");
            $("#prefectures").val("");
            $("#image_input").val("");
        })
        .catch((error) => {
            console.error("エラーが発生しました:", error);
            alert("登録に失敗しました: " + error.message);
        });

})

//最初にデータ取得＆onSnapshotでリアルタイムにデータを取得
onChildAdded(campRef, function(data){
    const camp = data.val();
    const key = data.key;

    let html = `
        <tr align="center">
            <td style="vertical-align: middle;">${camp.date}</td>
            <td style="vertical-align: middle;">${camp.name}</td>
            <td style="vertical-align: middle;">${camp.prefectures}</td>
            <td style="vertical-align: middle;"><a href="${camp.url}">Click</a></td>
            <td><img src="${camp.imageUrl}" style="max-width: 300px; height: auto;"></td>
        </tr>
    `
    //jQueryを使って画面上に表示したいので、appendというおおまじないを使い、埋め込みます
    $("#output").append(html)
    //この下は消さない
})


// 以下、localStorage　ver.
//     const html =`
//       <tr>
//         <td>${date}</td>
//         <td><a href="${url}" target="_blank">${camp_name}</a></td>
//         <td>${prefectures}</td>
//       </tr>
      
//     `;
//     $("#list").append(html);
// }
// )

// // 2. clearイベント
$("#clear").on("click", function(){
    remove(campRef)
    .then(() => {
            console.log("全消し！");
            alert("全部消えました！");
            
        })
        .catch((error) => {
            console.error("エラーが発生しました:", error);
            alert("削除に失敗しました: " + error.message);
        });

       $("#output").empty()
    
})

// // ページ読み込み：保存データ取得表示
// for(let i = 0; i < localStorage.length; i++){
//     const key = localStorage.key(i);
//     const value = JSON.parse(localStorage.getItem(key));
//     const html = `
//       <tr>
//         <td>${value[0]}</td>
//         <td><a href="${value[3]}" target="_blank">${value[1]}</a></td>
//         <td>${value[2]}</td>
//       </tr>
//     `;
//     $("#list").append(html);
// }
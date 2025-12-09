
//Firebaseへの接続
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getDatabase, ref, push, set, onChildAdded, remove, onChildRemoved }
    from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";
// Your web app's Firebase configuration
const firebaseConfig = 
const app = initializeApp(firebaseConfig); //Fire databaseにログイン
const db = getDatabase(app); //RealtimeDBに接続
const dbRef = ref(db, "camp"); //RealtimeDB内の"camp"を使う




// 1. 登録イベント


$("#save").on("click", function(){
    const date = $("#date").val();
    const camp_name = $("#name").val();
    const prefectures = $("#prefectures").val();
    const url = `https://www.google.com/maps/search/?api=1&query=${camp_name}+${prefectures}`;
    const image = $("#image_input").val();

    // Firebase内にオブジェクトを作成
    const camp = {
      date: date,
      name: camp_name,
      prefectures: prefectures,
      url: url,
      image: image, 

    }
    console.log(camp.date)

    const newPostRef = push(dbRef);
            set(newPostRef, camp);
        
            //空欄にするテクニック
            $("#date").val("");
            $("#name").val("");
            $("#prefectures").val("");
            $("#image_input").val("");
})

//最初にデータ取得＆onSnapshotでリアルタイムにデータを取得
onChildAdded(dbRef, function(data){
    const camp = data.val();
    const key = data.key;

    let html = `
        <div>
            <p>${camp.date}</p>
            <p>${camp.name}</p>
            <p>${camp.prefectures}</p>
            <p>${camp.url}</p>
            <p>${camp.image}</p>
        </div>

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
// $("#clear").on("click", function(){
//     localStorage.clear();
//     $("#list").empty();
// })

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
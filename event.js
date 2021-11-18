////そのまま使えるイベントリスト////

//messageEvent([],[],100,"red")
//メッセージの表示。続けて文章を表示していく。
//第1引数に表示する文章を文字列の配列で指定。文字列中に@@で改行できる。
//第2引数に同時に表示する顔グラを相対パスの配列で指定。顔グラ不要の場合は""と書いておく。
//第3引数に文字の表示速度を数値で指定。デフォルトは25。小さいと速く、大きいとゆっくりになる。
//第4引数に文字色を文字列で指定。デフォルトは"white"。全ての文字色が変わるので使いどころに注意。
//全てのメッセージの終了後にeventNumberが加算（次のイベントへ）
//第1引数と第2引数の数が違うと何も表示されないので必ず合わせること。
//第3引数と第4引数は省略可能


//backgroundEvent(0,0.5)
//背景を瞬間的に切り替える。
//第1引数は初期設定の背景番号を指定。（img_backgroundの配列番号）
//第2引数は透明度を指定。デフォルトは1。
//eventNumberはそのまま（イベントは進まない）

//backTransEvent(2, 10, 600)
//背景のトランジション。右から黒い帯が流れてきて背景が切り替わる。
//第1引数は初期設定の背景番号を指定。
//第2引数は帯のスピードを指定。デフォルトは10、大きいほど加速。
//第3引数は帯幅を指定。デフォルトは600、小さいと棒状に。
//処理後にeventNumberが加算（次のイベントへ）

//backFade(1, 10)
//背景のフェードイン・アウト。画面全体を一括で徐々に切り替える。
//第1引数は初期設定の背景番号or文字列で色を指定。
//第2引数は切替スピードを指定。デフォルトは10、大きいほど加速。
//第1引数で色を指定するとその色にフェードアウトする（例えば"black"を指定すると黒色にフェードアウト）
//処理後にeventNumberが加算（次のイベントへ）

//itemEvent(2,0,"center",0)
//人・物の瞬間表示。いわゆる立ち絵を表示させる。
//第1引数は初期設定のキャラ番号を指定。（img_allの配列番号）
//第2引数は初期設定の立ち絵番号を指定。（各キャラ配列の配列番号）
//第3引数は文字列か数字で横軸の位置を指定。立ち絵の中心のx座標を指定する。デフォルトは中央。
//第4引数は文字列か数字で縦軸の位置を指定。画面下からのピクセル数を指定する。デフォルトは0（接地状態）
//第3引数は"left","right","center"でおおよその各位置を自動調整。
//第4引数は"top","center"で同様に自動調整。
//eventNumberはそのまま（イベントは進まない）

//itemEventFadeIn(1,0,"center",0,25);
//人・物のフェードイン。立ち絵を徐々に表示させる。
//第1～第4引数はitemEventと同様。
//第5引数は切替スピードを指定。デフォルトは25、小さいほど加速。
//処理後にeventNumberが加算（次のイベントへ）




//メッセージウィンドウに文字列を表示。現在のtextを持ってくる。
//顔グラありだと1行28文字まで。顔グラなしだと1行34文字まで。@@で改行。現状は@@を使用した状態で4行目文字数超えるとバグが発生するので注意。
const displayText = () => {
    document.getElementById("message").removeEventListener("click", displayText);
    if (!text_clear) {
        document.getElementById("one").innerText = "";
        document.getElementById("two").innerText = "";
        document.getElementById("three").innerText = "";
        document.getElementById("four").innerText = "";
        text_clear = true;
    }
    let gyo = "one";
    if (text_gyo == 2) {
        gyo = "two";
    } else if (text_gyo == 3) {
        gyo = "three";
    } else if (text_gyo == 4) {
        gyo = "four";
    }
    if (text_face === "") {
        document.getElementById("kaogura").style.borderWidth = "0px";
        document.getElementById("kaogura").style.width = "0px";
        displayTextInner(gyo, 34);
    } else {
        document.getElementById("kaogura").style.borderWidth = "5px";
        document.getElementById("kaogura").style.width = "160px";
        document.getElementById("kaogura").setAttribute("src", text_face);
        displayTextInner(gyo, 28);
    }
}

//メッセージウィンドウの内部処理
const displayTextInner = (gyo, mojisu) => {
    if (text.length < mojisu + 1 && text.indexOf("@@") === -1) {
        document.getElementById(gyo).innerText = text.substr(0, text_i++);
        if (text_i <= text.length) {
            setTimeout("displayText()", text_speed)
        } else {
            text_i = 0;
            text_gyo = 1;
            text_clear = false;
            if (text_next.length !== 0) {
                text = text_next[0];
                text_face = text_facenext[0]
                text_next.shift();
                text_facenext.shift();
                document.getElementById("message").addEventListener("click", displayText);
            } else {
                eventState = true;
                eventNumber++;
            }
        }
    } else if (text.length < mojisu * 4 + 1 && text.indexOf("@@") === -1) {
        text2 = text.substr(0, mojisu - 1);
        document.getElementById(gyo).innerText = text.substr(0, text_i++);
        if (text_i <= mojisu) {
            setTimeout("displayText()", text_speed)
        } else {
            text_i = 0;
            text_gyo++;
            text = text.substr(mojisu);
            displayText();
        }
    } else if (text.indexOf("@@") !== -1) {
        text2 = text.substr(0, text.indexOf("@@") - 1);
        document.getElementById(gyo).innerText = text.substr(0, text_i++);
        if (text_i <= text.indexOf("@@")) {
            setTimeout("displayText()", text_speed)
        } else {
            text_i = 0;
            text_gyo++;
            text = text.substr(text.indexOf("@@") + 2);
            if (text_gyo < 5) {
                displayText();
            } else {
                text_i = 0;
                text_gyo = 1;
                text_clear = false;
                if (text_next.length !== 0) {
                    text = text_next[0];
                    text_face = text_facenext[0]
                    text_next.shift();
                    text_facenext.shift();
                    document.getElementById("message").addEventListener("click", displayText);
                }
            }
        }
    } else {
        text = text.substr(0, mojisu * 4);
        displayText();
    }
}

//メッセージイベント前の初期化
const messageEventStart = () => {
    text = "　";
    text_face = "";
    text_speed = 25;
    displayText()
}

//メッセージを連続表示するイベント。
//第1引数に連続表示するメッセージを配列で指定、第2引数に対応する顔グラを配列で指定、第3引数に表示速度を指定。デフォルト25
//イベントは終了する。
const messageEvent = (print, face, speed = 25, mojiColor = "white") => {
    messageEventStart();
    if (print.length === face.length) {
        messageColorChange(mojiColor);
        text_next.length = 0;
        text_facenext.length = 0;
        text = print[0];
        text_face = face[0];
        for (i = 1; i < print.length; i++) {
            text_next[i - 1] = print[i]
            text_facenext[i - 1] = face[i]
        }
        text_speed = speed;
        document.getElementById("message").addEventListener("click", displayText);
    }
}

//文字色変更
const messageColorChange = (mojiColor) =>{
    const m = document.getElementsByClassName("moji");
    for(i=0;i<m.length;i++){
        m[i].style.color = mojiColor;
    }
}


//背景の瞬間表示
//イベントの途中に挟むのでイベント終了しないことに注意
const backgroundEvent = (backnum , alpha=1) => {
    ctx.globalAlpha=alpha;
    ctx.drawImage(imageLoad[0][backnum], 0, 0);
    ctx.globalAlpha=1;
}

//背景のトランジション。背景画像番号とスピードと帯幅を指定。スピードのデフォルトは10、帯幅のデフォルトは600
//イベントは終了する。
const backTransEvent = (backnum, speed, width) => {
    trans_img = backnum;
    trans_speed = speed;
    trans_width = width;
    trans_ID.push(setInterval(backTransInner, 30 / 1000))
}

//トランジション内部処理
const backTransInner = () => {
    if (trans_count <= 1600 + trans_width) {
        trans_count += trans_speed;
        ctx.drawImage(imageLoad[0][trans_img], 800 - trans_count + trans_width / 2, 0, trans_count, 600, 800 - trans_count + trans_width / 2, 0, trans_count, 600);
        for (i = 1; i < 15; i++) {
            ctx.fillStyle = "rgba(0,0,0," + i * 0.1 + ")";
            ctx.fillRect(800 - trans_count - 55 + i * 5 + trans_width / 2, 0, 110 - i * 10 + trans_width, 600);
        }
    } else {
        backgroundEvent(trans_img);
        while (trans_ID.length !== 0) {
            clearInterval(trans_ID[0]);
            trans_ID.shift();
        }
        trans_count = 0;
        eventNumber++;
        eventState = true;
    }
}

//背景のフェード。背景画像番号とスピードを指定。画像番号を文字列で色を指定すると画面をその一色にフェードする。スピードのデフォルトは10
//イベントは終了する。
const backFade = (backnum,speed) =>{
    trans_img = backnum;
    trans_speed = speed;
    trans_fade = 0;
    imageCopy = ctx.getImageData(0, 0, 800, 600);
    trans_ID.push(setInterval(backFadeInner, 30 / 1000))
}

//背景フェードの内部処理
const backFadeInner = () =>{
    if(trans_fade<=1){
        ctx.globalAlpha=1;
        ctx.putImageData(imageCopy,0,0);        
        ctx.globalAlpha=trans_fade;
        if(isNaN(trans_img)){
            ctx.fillStyle = trans_img;
            ctx.fillRect(0,0,800,600);
        }else{
            backgroundEvent(trans_img);
        }
        trans_fade += trans_speed/10000;
    }else{
        while (trans_ID.length !== 0) {
            clearInterval(trans_ID[0]);
            trans_ID.shift();
        }
        trans_fade = 1;
        eventNumber++;
        eventState = true;
    }
}


//人・物の瞬間表示。第3引数はleft,right,centerか数値で中央位置を指定。第4引数はtop,centerか数値で下からの位置を指定。
//イベントの途中に挟むのでイベント終了しないことに注意
const itemEvent = (charanum, imgnum, place = "center", bottom = 0) => {

    const w = imageLoad[charanum][imgnum].width;
    const h = imageLoad[charanum][imgnum].height;
    if (!isNaN(bottom)) {
        if (place === "left") {
            ctx.drawImage(imageLoad[charanum][imgnum], Math.max(100 - w / 2, 0), 600 - h - bottom);
        } else if (place === "right") {
            ctx.drawImage(imageLoad[charanum][imgnum], Math.min(700 - w / 2, 800 - w), 600 - h - bottom);
        } else if (!isNaN(place)) {
            ctx.drawImage(imageLoad[charanum][imgnum], place - w / 2, 600 - h - bottom);
        } else {
            ctx.drawImage(imageLoad[charanum][imgnum], 400 - w / 2, 600 - h - bottom);
        }
    } else if (bottom === "center") {
        if (place === "left") {
            ctx.drawImage(imageLoad[charanum][imgnum], Math.max(100 - w / 2, 0), 300 - h / 2);
        } else if (place === "right") {
            ctx.drawImage(imageLoad[charanum][imgnum], Math.min(700 - w / 2, 800 - w), 300 - h / 2);
        } else if (!isNaN(place)) {
            ctx.drawImage(imageLoad[charanum][imgnum], place - w / 2, 300 - h / 2);
        } else {
            ctx.drawImage(imageLoad[charanum][imgnum], 400 - w / 2, 300 - h / 2);
        }
    } else if (bottom === "top") {
        if (place === "left") {
            ctx.drawImage(imageLoad[charanum][imgnum], Math.max(100 - w / 2, 0), 0);
        } else if (place === "right") {
            ctx.drawImage(imageLoad[charanum][imgnum], Math.min(700 - w / 2, 800 - w), 0);
        } else if (!isNaN(place)) {
            ctx.drawImage(imageLoad[charanum][imgnum], place - w / 2, 0);
        } else {
            ctx.drawImage(imageLoad[charanum][imgnum], 400 - w / 2, 0);
        }
    }
}

//人・物のフェード。第3引数はleft,right,centerか数値で中央位置を指定。第4引数はtop,centerか数値で下からの位置を指定。第5引数がスピード。
//イベントは終了する。
const itemEventFadeIn = (charanum, imgnum, place = "center", bottom = 0 ,speed = 25) => {
    trans_item[0]=charanum
    trans_item[1]=imgnum;
    trans_item[2]=speed;
    trans_item[3]=place;
    trans_item[4]=bottom;
    trans_fade = 0;
    imageCopy = ctx.getImageData(0, 0, 800, 600);
    trans_ID.push(setInterval(itemEventFadeInInner, 30 / 1000))
}

//フェードの内部処理
const itemEventFadeInInner = () =>{
    if(trans_fade<=1){
        ctx.globalAlpha=1;
        ctx.putImageData(imageCopy,0,0);        
        ctx.globalAlpha=trans_fade;
        itemEvent(trans_item[0],trans_item[1],trans_item[3],trans_item[4]);
        trans_fade += trans_item[2]/10000;
    }else{
        while (trans_ID.length !== 0) {
            clearInterval(trans_ID[0]);
            trans_ID.shift();
        }
        trans_item.length = 0;
        eventNumber++;
        eventState = true;
    }
}
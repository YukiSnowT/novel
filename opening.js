//オープニング画面のテスト
const openingMenu = () =>{
    if(clickX > 10 && clickX < 200){
        if(clickY > 170 && clickY < 220){
            menuNum = 1;
        }else if(clickY > 250 && clickY < 300){
            menuNum = 2;
        }else if(clickY > 330 && clickY < 380){
            menuNum = 3;
        }else if(clickY > 410 && clickY < 460){
            menuNum = 4;
        }else{
            menuNum = 0;
        }
    }else{
        menuNum = 0;
    }
}

//オープニングメニュー画面の描画
const openingDisplay = () =>{
    document.getElementById("one").innerText = "";
    document.getElementById("two").innerText = "";
    document.getElementById("three").innerText = "";
    document.getElementById("four").innerText = "";
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#5558";
    for(i=0;i<4;i++){
        ctx.fillStyle = "#5558";
        ctx.beginPath();
        ctx.moveTo(28,178+i*80);
        ctx.lineTo(228,178+i*80);
        ctx.lineTo(218,228+i*80);
        ctx.lineTo(18,228+i*80);
        ctx.fill();
        ctx.closePath();
        if(i+1 === menuNum){
            ctx.fillStyle = "orange"
            if(menuNum === 1){
                document.getElementById("one").innerText = "第１話：コーヒー";
                document.getElementById("two").innerText = "会社員がコーヒーを飲むだけの話";
                document.getElementById("three").innerText = "";
                document.getElementById("four").innerText = "";
            }else if(menuNum === 2){
                document.getElementById("one").innerText = "第２話：テスト";
                document.getElementById("two").innerText = "テストテストテストテストテストストテストテストテストテスト";
                document.getElementById("three").innerText = "";
                document.getElementById("four").innerText = "";    
            }else if(menuNum === 3){
                document.getElementById("one").innerText = "第３話：テスト";
                document.getElementById("two").innerText = "テストテストテストテストテストストテストテストテストテスト";
                document.getElementById("three").innerText = "";
                document.getElementById("four").innerText = "";    
            }else if(menuNum === 4){
                document.getElementById("one").innerText = "第４話：テスト";
                document.getElementById("two").innerText = "テストテストテストテストテストストテストテストテストテスト";
                document.getElementById("three").innerText = "";
                document.getElementById("four").innerText = "";    
            }
        }else{
            ctx.fillStyle = "#fff";
        }
        ctx.beginPath();
        ctx.moveTo(20,170+i*80);
        ctx.lineTo(220,170+i*80);
        ctx.lineTo(210,220+i*80);
        ctx.lineTo(10,220+i*80);
        ctx.fill();
        ctx.closePath();
        if(i===0){
            ctx.fillStyle = "#09f"
        }else if(i===1){
            ctx.fillStyle = "#0af"
        }else if(i===2){
            ctx.fillStyle = "#0bf"
        }else if(i===3){
            ctx.fillStyle = "#0cf"
        }
        ctx.beginPath();
        ctx.moveTo(22,172+i*80);
        ctx.lineTo(218,172+i*80);
        ctx.lineTo(208,218+i*80);
        ctx.lineTo(12,218+i*80);
        ctx.fill();
        ctx.closePath();
    }
    for(i=0;i<4;i++){
        if(i+1 === menuNum){
            ctx.font = "35px cursive";
            ctx.fillStyle = "orange"
        }else{
            ctx.font = "35px cursive";
            ctx.fillStyle = "white"
        }
        if(i===0){
            ctx.fillText("Episode 1",40,207)
        }else if(i===1){
            ctx.fillText("Episode 2",40,287)
        }else if(i===2){
            ctx.fillText("Episode 3",40,367)
        }else if(i===3){
            ctx.fillText("Episode 4",40,447)
        }
    }
}

//スタート画面の描画
const startDisplay = () =>{
    title.onload = () => {
        ctx.drawImage(title, 0, 0);
        ctx.globalAlpha=0
        opInterval = setInterval(startRepeat,10);
    };
    
}

//スタート画面の内部処理
const startRepeat = () =>{
    ctx.drawImage(title, 0, 0);
    ctx.fillStyle = "white"
    ctx.strokeStyle = "black"
    ctx.lineWidth = 2
    ctx.font = "bold 50px serif";
    if(trans_fade > 0.9){
        ctx.globalAlpha += 0.01;
    }else{
        ctx.globalAlpha -= 0.01;
    }
    if(ctx.globalAlpha >= 0.99){
        trans_fade = 0;
    }else if(ctx.globalAlpha <= 0.01){
        trans_fade = 1;
    }
    ctx.fillText("PRESS START",230,550)
    ctx.strokeText("PRESS START",230,550)
}

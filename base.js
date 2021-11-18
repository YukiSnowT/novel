
let eventNumber = 0;
let eventState = true;

let text = "" // 28文字まで
let text2 = "";
let text_i = 0;
let text_speed = 25;
let text_gyo = 1;
let text_clear = true;
let text_next = [];
let text_face = "";
let text_facenext = [];

const cv = document.getElementById("map");
const ctx = cv.getContext("2d");

let trans_count = 0;
let trans_speed = 100;
let trans_img = "";
let trans_width = 60;
let trans_fade = 1;
let trans_ID = [];
let img_ID = [];
let trans_item = [];

let imageLoad = [];
let imageCopy = null;

let clickX = 0;
let clickY = 0;
let gamestate = false;
let menuNum = 0;
let opInterval = null;
const title = new Image();
    title.src = "img/title.jpg";

const img_background = ["img/back1.png", "img/back2.png", "img/back3.png","img/officeD.jpg","img/out1.jpg","img/bridge.jpg"]
const img_charaA = ["img/chara1.png"]
const img_charatestA = ["img/testchara1.png", "img/testchara2.png"];
const img_charatestB = ["img/testchara2-1.png", "img/testchara2-2.png"];


const img_all = [img_background,img_charaA,img_charatestA,img_charatestB];

//画像ファイルの読み込み
const imgLoad = (imgArrey) => {
    let images = [];
    for (i = 0; i < imgArrey.length; i++) {
        images[i] = new Image();
        images[i].src = imgArrey[i];
    }
    imageLoad.push(images);
}

// 全てをロードしてからメインの処理
const allLoad = () =>{
    let imgCount = 0;
    for(k=0;k<img_all.length;k++){
        imgLoad(img_all[k]);
        imgCount += img_all[k].length;
    }
    let loadCount = 0;
    for(k=0;k<img_all.length;k++){
        for(j=0;j<img_all[k].length;j++){
            imageLoad[k][j].addEventListener("load",function(){
                if(loadCount == imgCount){
                    ctx.drawImage(imageLoad[k][j],0,0);
                    console.log(imageLoad[k][i])
                }
                loadCount++;
            },false);
        }
    }
    document.getElementById("main").addEventListener("click", mainEvent);
}

//クリック位置の取得
const clickState = () =>{
    cv.addEventListener("mousemove",e=>{
        const rect = e.target.getBoundingClientRect();
        const viewX = e.clientX - rect.left;
        const viewY = e.clientY - rect.top;
        clickX = Math.floor( viewX / cv.clientWidth*800);
        clickY = Math.floor( viewY / cv.clientHeight*600 );
        if(!gamestate){
            openingMenu()
            openingDisplay()
        }
    })
}

//メインの処理
const mainEvent = () => {
    if (eventState) {
        eventState = false;
        document.getElementById("kaogura").style.borderWidth = "0px";
        document.getElementById("kaogura").style.width = "0px";
        document.getElementById("one").innerText = "";
        document.getElementById("two").innerText = "";
        document.getElementById("three").innerText = "";
        document.getElementById("four").innerText = "";
        text_clear = true;
        if (eventNumber === 0) {
            clearInterval(opInterval);
            ctx.globalAlpha = 1;
            ctx.drawImage(title, 0, 0);
            clickState();
            openingDisplay();
            eventNumber++;
            eventState = true;
        } else if (eventNumber === 1) {
            if(menuNum >0){
                eventNumber = menuNum*100;
                // eventNumber = 109; //テストプレイ時はここを変更、終わったら消す
                gamestate = true;
                backFade("black",30);
            }else{
                eventState = true;
            }
        } else if (eventNumber === 2) {

        } else if (eventNumber === 3) {

        } else if (eventNumber === 10) {

        } else if (eventNumber === 11) {
            backgroundEvent(1)
            itemEvent(1,0)
            messageEvent([
                "イベント追加テスト：@@第２イベントテスト@@ついでに背景変更もテスト",
                "イベント追加テスト２：@@第１イベントとは切り離して作成@@間にcanvasのイベントを挟める@@背景切り替え以外にキャラ移動とか",
                "イベント追加テスト：@@次は背景トランジションテスト"
            ], [
                "img/testface.png",
                "img/testface2.png",
                "img/testface.png"
            ], 25)
        } else if (eventNumber === 12) {
            backTransEvent(2, 10, 600)
        } else if (eventNumber === 13) {
            itemEvent(2,0)
            messageEvent([
                "トランジションテスト：@@切り替わった後にクリックでこのメッセージを表示",
                "トランジションテスト２：@@OK？"
            ], [
                "img/testface.png",
                "img/testface2.png"
            ], 25)
        } else if (eventNumber === 14) {

        } else if (eventNumber === 15) {

        } else if (eventNumber === 16) {

        }else if (eventNumber === 101) {
            messageEvent([
                "印象的な出来事の記憶は忘れがたい。",
                "例えば好きな人への告白が成功したとか、就職がうまくいったとか、@@怪我をして入院したとか、試験に不合格だったとか。",
                "良い事でも悪い事でも、印象的な出来事は、@@それをまるでさっき起きた事のように思い出すことができる。@@心理学ではそれを「長期記憶」といい、@@長い年月が経っても忘れることはないという。",
                "成程確かに人生に一石を投じ感情を揺るがした出来事を@@長期間覚えておくというのは人間の成長として道理にかなっている。",
                "しかしあの時私が経験した出来事は、@@決して記憶に残るほどのものではなかったはずだ。@@少なくとも私はそう確信している。",
                "何故ならば、私にその日行った事実を単純にまとめると@@「喫茶店でコーヒーを飲んだ」@@ということだけなのだ。",
                "コーヒーが特別美味だったわけではない。@@もちろん不味かったわけでもない。@@強いて言うならば、自分の口には合わなかったが。",
                "その日良い知らせがあったわけでも、@@身内に不幸があったわけでもない。",
                "以降その喫茶店の常連になったわけでもないし、@@そもそも以降その喫茶店には行っていない。",
                "なのにあの日の出来事は私の心の中で、@@焦片のように狂える影を落としている。",
                "もう４年前になる。@@春の日のことであった。"
            ],[
                "","","","","","","","","","",""
            ])
        }else if (eventNumber === 102) {
            backFade(3,30);
        }else if (eventNumber === 103) {
            messageEvent([
                "四月も終わりの晴れた日。@@ついひと月前は暖房を出していたのに、気づけば半袖の出番である。@@大型連休を控えた街は慌ただしく回転していた。",
                "斯く言う私も同じなもので、@@つい先日研修を終えた新入社員の面倒を見ながら@@自身の仕事に追われる日々を過ごしていた。",
                "＊：@@「御先に失礼します。お疲れ様です」",
                "男：@@「ん、お疲れ」",
                "そんな新人とのやり取りを終えて、@@私は自身の残った仕事を始めたのが３時間前。@@それが漸く片付いたのが今というわけである。",
                "生真面目な性格が幸か不幸か、@@周囲の評価は高くも仕事を押し付けられる毎日。@@今日もまた最後に事務所から出る。",
                "戸締りを終え、防犯装置をセットする。@@最後に事務所を出る人がやるのがここでの規則だが、@@最近は専ら私が行っている。",
                "要領が悪いとよく言われるが、@@それしかやり方を知らないのだから仕様がない。"
            ],[
                "","","img/testface2.png","img/testface.png","","","",""
            ])
        }else if (eventNumber === 104) {
            backTransEvent(4, 10, 60)
        }else if (eventNumber === 105) {
            messageEvent([
                "心地良いビル風が髪を揺らす。@@時計の短針が二桁の文字盤を過ぎた頃。",
                "電車の乗り換えアプリを起動し、自分が乗れる電車を調べる。@@走ればぎりぎり間に合うだろう時刻の電車があったが、@@常温で放置した生卵のような今の私にそんな気力はなかった。",
                "このまま次の電車を待って帰ってもいいが、@@独り身で寝る以外にやることもない。",
                "こういう時、他の人なら誰かを誘って楽しく酒を飲むのだろうか。@@それとも優雅なバーで一人の時間を過ごすのだろうか。@@いずれにせよ下戸である私には関係のない事である。",
                "ならばと思い、駅への道を右に逸れてみる。@@学生の頃に誰もがやったことのある遠回り。",
                "昼休みも、コンビニの味が濃いおにぎりで済ませる私にとって@@会社の周囲は、知らぬわけではないにしろ、@@ほとんど通らぬ場所だった。",
                "こんな時間に開いているのは@@居酒屋かコンビニが格安ホテルくらいなものだが、@@それでもこの重油のような気分に対して、@@少しばかり反抗したいと思ったのも事実だった。"
            ],["","","","","","",""])
        }else if (eventNumber === 106) {
            backTransEvent(5, 10, 60)
        }else if (eventNumber === 107) {
            messageEvent([
                "薄汚れたビルの合間を抜けて、藻に覆われた溝川を渡る。@@纏わりついてきた蚊柱を、右手を大きく振って払い除けた。",
                "通りがかったラーメン屋の前には準備中の札。@@店内が真っ暗なのに、@@準備中も何もあったものではないと一人で目を細めた。",
                "本来駅までは五分足らずの道である。@@当然遠回りをしたからと言って何十分も暇をつぶすことは不可能だ。@@気が付けば駅のすぐ前の、@@毎日見ている焼き鳥屋の提灯が見えてきていた。",
                "スマートフォンを取り出して時刻を確認する。@@結局十分も経ってはいなかった。",
                "最後の抵抗とばかりに足を路地に向ける。@@往復を数えても二分と変わらないだろう。",
                "だがそれが、結論から言えば僥倖であった。"
            ],["","","","","",""],25)
        }else if (eventNumber === 108) {
            backTransEvent(0,10,60)
        }else if (eventNumber === 109) {
            messageEvent([
                "路地の奥に黄色い明かりが見えた。",
                "居酒屋のような大衆的な光ではなく、@@バーのような暗い光でもない。",
                "周囲は暗く、別段その明かりが眩しかったわけでもない。@@だがそこにだけ、周囲の夜の中のそこにだけ昼があった。",
                "出来の悪いネット・コラージュのような常識はずれの違和感に、@@私は逆に興味が湧いて、一先ず店の前まで行ってみることにした。",
                "近付くにつれてその店の外観が顕わになる。",
                "洋風建築のレンガ造りの外壁。@@木目をそのまま活かした木製の扉。@@その上に取り付けられた電球色のランプと、@@静かな光を放つ看板がこの店が営業中であることを示す。",
                "カーペットに落ちた染みのように違和感の中に溶け佇んでいたそれは、@@テンプレートのような喫茶店であった。",
                "右隣はガラス張りで入居募集の張り紙。@@左隣はシャッターが下り何の店かもわからない。",
                "そんな中に、時間に置き去りにされたような@@平成初頭の喫茶店があった。",
                "駅前とは言えこの遅い夜に、場違いな喫茶店が営業している事。@@自身の持つ常識という名のコンピュータはエラーの文字を返していた。",
                "右手に触れる冷たい感覚。@@無意識の内に私は鉄のノブを引いていた。"
            ],["","","","","","","","","","",""])
        }else if (eventNumber === 110) {
            backTransEvent(1,10,60)
        }else if (eventNumber === 111) {
            messageEvent([
                "扉の奥は、外の電球と同じ、黄色い光に満ちていた。@@同時に苦いとも甘いとも表現できる匂いが鼻を刺した。",
                "店内は駅前だからか見かけよりも狭いが奥行きがあり、@@そこにカウンターとテーブル席を詰め込んでいるものだから、@@秩序と無秩序の混在と言える風体だった。",
                "店内に他の客がいないことが却ってその雑然さを後押しし、@@伽藍の中に騒がしささえ体感した。",
                "しかし冷房が効いた店内は肌寒く、@@私は無言の喧噪の中で、@@奇妙なズレを覚えていた。",
                "＊：「いらっしゃいませ」",
                "不意に声がかかる。",
                "カウンターに目を遣ると、そこには一人の女性がいた。"
            ],["","","","","img/testface2.png","",""])
        }else if (eventNumber === 112) {
            itemEventFadeIn(1,0);
        }else if (eventNumber === 113) {
            messageEvent([
                "アニメの中でしか見たことがないような長い黒髪。@@折り目のついたスーツ姿の人物。",
                "私は戸惑った。",
                "障子戸の隙間から吹き込んだ風のように、@@その女性の声が滑りを帯びて私の心臓を侵した。",
                "幸福でも嫌悪でも高揚でも悄然でもない。@@同情でも憐憫でも萎縮でも感動でもない。",
                "その時の心地は、これまでに感じた感情のいずれでもなかった。",
                "それを表す言葉を私は持っていなかった。",
                "その声も、姿も、その一切に対して同じ感情を抱いたというのに！",
                "一瞬で体温が下がったような気がした。@@だが息を吸うよりも早く彼女は次の言葉を紡いだ。",
                "女：@@「お一人様でしょうか」",
                "その瞬間、浮遊していた心が徐に着地したのを感じた。@@何が疑問だったのかもわからないのに、腑に落ちたという表現が合致した。",
                "私は無言で右手の人差し指を掲げた。無礼な振舞いを躊躇したが、言葉を発するにはまだ数秒の時間が必要だった。",
                "だが女性は気にした様子もなく、@@掌で自身の前、即ちカウンターを指した。",
                "女：@@「こちらお好きなお席へどうぞ」",
                "その頃には平静を取り戻し、否、取り戻すほどではなかったが、@@適当な席に着き、足元に仕事鞄を置き、文字通りに一息ついて、@@会話するだけの余裕が生まれた。",
                "目の前に態々銀皿に乗せたおしぼりが提供される。@@冷えた室内とは対照的に、熱い風呂のように温まった濡布は、@@なんとか私の心を私のものであると自覚させる一助となった。",
                "女：@@「お疲れですか」",
                "不意にあの声がする。@@心の中に入り込んでくるような粘りを帯びた声。",
                "改めて彼女を見据えた。",
                "男：@@「ええ、仕事で」",
                "女：@@「こんな時間まで。お疲れ様です」",
                "彼女は驚いたように、しかしこちらを心配する素振りで返した。@@たった一言だけの会話だったが、この奇妙な感覚は続いていた。",
                "男：@@「ゴールデンウィーク前でしょう。それで忙しくて」",
                "女：@@「ええ、でしたら是非ごゆっくりなさってください」",
                "もはやこの感覚にも慣れ、私はまともに会話ができていた。@@そんな状態が傍から見てまともと呼べていたのかはさておき、@@私は目の前に立てかけられたメニューを手に取った。"
            ],["","","","","","","","","img/testface2.png","","","","img/testface2.png","","","img/testface2.png","","","img/testface.png","img/testface2.png","","img/testface.png","img/testface2.png",""])

        }else if (eventNumber === 114) {
            
        }else if (eventNumber === 115) {
            
        }else if (eventNumber === 116) {
            
        }else if (eventNumber === 117) {
            
        }else if (eventNumber === 118) {
            
        }else if (eventNumber === 119) {
            
        }else if (eventNumber === 120) {
            
        }
    }
}

allLoad();
startDisplay();
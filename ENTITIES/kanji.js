class Tango {

    static list = [];

    constructor(pWord, pReading, pFr) {
        this.word = pWord;
        this.reading = pReading;
        this.fr = pFr;
        Tango.list.push(this);
    }

    static init() {
        let tango_竹 = new Tango("竹","たけ","bambou");
        let tango_林 = new Tango("林","はやし","bois");
        let tango_村 = new Tango("村","むら","village");
        let tango_左 = new Tango("左","ひだり","gauche");
        let tango_右 = new Tango("右","みぎ","droite");
        let tango_石 = new Tango("石","いし","pierre");
        let tango_王様 = new Tango("王様","おうさま","roi");
        let tango_玉 = new Tango("玉","たま","balle / boule");
        let tango_生 = new Tango("生","い(きる)","vivre");
        let tango_糸 = new Tango("糸","いと","fil");
        let tango_夕 = new Tango("夕","ゆう","soir");
        let tango_先 = new Tango("先","さき　ま(ず)","d'abord");
        let tango_未来 = new Tango("未来","みらい","futur");
        let tango_未定 = new Tango("未定","みてい","pas décidé, pas fixé");
        let tango_未成年 = new Tango("未成年","みせいねん","mineur");
        let tango_青年 = new Tango("青年","せいねん","adolescent");
        let tango_未知 = new Tango("未知","みち","pas encore savoir, inconnu");
        let tango_未婚 = new Tango("未婚","みこん","célibataire (adm)");
        let tango_婚約 = new Tango("婚約","こんやく","fiançailles");
        let tango_約束 = new Tango("約束","やくそく","promesse");
        let tango_結婚 = new Tango("結婚","けっこん","mariage");
        let tango_週末 = new Tango("週末","しゅうまつ","weekend");
        let tango_期末 = new Tango("期末","きまつ","fin du semestre");
        let tango_期間 = new Tango("期間","きかん","période");
        let tango_学期 = new Tango("学期","がっき","semestre");
        let tango_時期 = new Tango("時期","じき","période de temps");
        let tango_同期 = new Tango("同期","どうき","même promo");
        let tango_限る = new Tango("限る","かぎる","limiter");
        let tango_期限 = new Tango("期限","きげん","période limitée");
        let tango_期間限定 = new Tango("期間限定","きかんげんてい","période fixe de tps limitée");
        let tango_賞味期限 = new Tango("賞味期限","しょうみきげん","expiration (goût)");
        let tango_消費期限 = new Tango("消費期限","しょうひきげん","expiration (consommation)");
        let tango_消す = new Tango("消す","けす","effacer");
        let tango_費やす = new Tango("費やす","ついやす","consommer");
        let tango_消費量 = new Tango("消費量","しょうひりょう","quantité consommée");
        let tango_料理 = new Tango("料理","りょうり","cuisine");
        let tango_有料 = new Tango("有料","ゆうりょう","payant");
        let tango_無料 = new Tango("無料","むりょう","gratuit");
        let tango_給料 = new Tango("給料","きゅうりょう","salaire");
        let tango_時給 = new Tango("時給","じきゅう","salaire de l'heure");
        let tango_年収 = new Tango("年収","ねんしゅう","salaire annuel");
        let tango_料金 = new Tango("料金","りょうきん","frais, prix");
        let tango_銀 = new Tango("銀","ぎん","argent (metal)");
        let tango_銅 = new Tango("銅","どう","bronze");
        let tango_最も = new Tango("最も","もっとも","le plus");
        let tango_最近 = new Tango("最近","さいきん","récemment");
        let tango_最高 = new Tango("最高","さいこう","meilleur, le plus haut");
        let tango_最悪 = new Tango("最悪","さいあく","pire");
        let tango_最初 = new Tango("最初","さいしょ","en premier");
        let tango_最後 = new Tango("最後","さいご","en dernier");
        let tango_最強 = new Tango("最強","さいきょう","le plus fort");
        let tango_研究 = new Tango("研究","けんきゅう","recherche");
        let tango_階段 = new Tango("階段","かいだん","escalier");
        let tango_段階 = new Tango("段階","だんかい","étapes");
        let tango_通る = new Tango("通る","とお(る)","traverser");
        let tango_普通 = new Tango("普通","ふつう","normal");
        let tango_普段 = new Tango("普段","ふだん","d'habitude");
        let tango_共通 = new Tango("共通","きょうつう","ensemble, commun");
        let tango_共通点 = new Tango("共通点","きょうつうてん","point commun");
        let tango_共同 = new Tango("共同","きょうどう","union/commun");
        let tango_共同研究 = new Tango("共同研究","きょうどうけんきゅう","recherche commune");
        let tango_同僚 = new Tango("同僚","どうりょう","collègue");
        let tango_共感 = new Tango("共感","きょうかん","sympathie");
        let tango_集める = new Tango("集める","あつめる","assembler");
        let tango_集中 = new Tango("集中","しゅうちゅう","concentration");
        let tango_写真集 = new Tango("写真集","しゃしんしゅう","album photo");
        let tango_決める = new Tango("決める","きめる","décider");
        let tango_定める = new Tango("定める","さだめる","fixer");
        let tango_決定 = new Tango("決定","けってい","décidé");
        let tango_動詞 = new Tango("動詞","どうし","verbe");
        let tango_他 = new Tango("他","ほか","autre");
        let tango_理由 = new Tango("理由","りゆう","origine");
        let tango_文化 = new Tango("文化","ぶんか","culture");
        let tango_探す = new Tango("探す","さがす","chercher");
        let tango_神 = new Tango("神","かみ","dieu");
        let tango_有名 = new Tango("有名","ゆうめい","connu");
        let tango_売る = new Tango("売る","うる","vendre");
        let tango_特に = new Tango("特に","とくに","en plus, surtout");
        let tango_特別 = new Tango("特別","とくべつ","spécial");
        let tango_描く = new Tango("描く","かく","dessiner");
        let tango_漫画 = new Tango("漫画","まんが","manga");
        let tango_画面 = new Tango("画面","がめん","écran");
        let tango_面白い = new Tango("面白い","おもしろい","drôle");
        let tango_映画 = new Tango("映画","えいが","film (cinéma)");
        let tango_勉強 = new Tango("勉強","べんきょう","étudier");
        let tango_顔 = new Tango("顔","かお","visage");
        let tango_地震 = new Tango("地震","じしん","tremblement de terre");
        let tango_自身 = new Tango("自身","じしん","soi même");
        let tango_自信 = new Tango("自信","じしん","confiance en soi");
    }
}

class Kanji {

    static list = [];
    static tangoList = [];

    constructor(pKanji, pReading) {
        this.kanji = pKanji;
        this.reading = pReading;
        this.fanti = "";
        this.examples = "";
        this.exList = [];
        this.insertTango();
        Kanji.list.push(this);
    }

    insertTango() {
        Tango.list.forEach(t => {
            if (t.word.includes(this.kanji)) {
                this.exList.push(t.word + ": " + t.reading + " " + t.fr);
                this.examples += t.word + " : " + t.reading + " : " + t.fr + " || ";
            }
        });
    }

    static init() {
        let kanji_竹 = new Kanji("竹",	"たけ");
        let kanji_林 = new Kanji("林",	"はやし");
        let kanji_村 = new Kanji("村",	"むら");
        let kanji_左 = new Kanji("左",	"ひだり");
        let kanji_右 = new Kanji("右",	"みぎ");
        let kanji_石 = new Kanji("石",	"いし");
        let kanji_王 = new Kanji("王",	"おう");
        let kanji_様 = new Kanji("様",	"さま");
        let kanji_玉 = new Kanji("玉",	"たま");
        let kanji_生 = new Kanji("生",	"い(きる)");
        let kanji_糸 = new Kanji("糸",	"いと");
        let kanji_夕 = new Kanji("夕",	"ゆう");
        let kanji_先 = new Kanji("先",	"さき、ま(ず)");
        let kanji_未 = new Kanji("未",	"み");
        let kanji_来 = new Kanji("来",	"らい");
        let kanji_定 = new Kanji("定",	"てい、さだ(める)");
        let kanji_成 = new Kanji("成",	"せい");
        let kanji_年 = new Kanji("年",	"ねん");
        let kanji_青 = new Kanji("青",	"せい");
        let kanji_知 = new Kanji("知",	"ち");
        let kanji_婚 = new Kanji("婚",	"こん");
        let kanji_約 = new Kanji("約",	"やく");
        let kanji_束 = new Kanji("束",	"そく");
        let kanji_結 = new Kanji("結",	"けつ");
        let kanji_週 = new Kanji("週",	"しゅう");
        let kanji_末 = new Kanji("末",	"まつ");
        let kanji_期 = new Kanji("期",	"き");
        let kanji_間 = new Kanji("間",	"かん");
        let kanji_学 = new Kanji("学",	"がく");
        let kanji_時 = new Kanji("時",	"じ");
        let kanji_同 = new Kanji("同",	"どう、おな(じ)");
        let kanji_限 = new Kanji("限",	"かぎ(る)、げん");
        let kanji_賞 = new Kanji("賞",	"しょう");
        let kanji_味 = new Kanji("味",	"み");
        let kanji_消 = new Kanji("消",	"しょう、け(す)");
        let kanji_費 = new Kanji("費",	"ひ、つい(やす)");
        let kanji_量 = new Kanji("量",	"りょう");
        let kanji_料 = new Kanji("料",	"りょう");
        let kanji_理 = new Kanji("理",	"り");
        let kanji_有 = new Kanji("有",	"ゆう");
        let kanji_無 = new Kanji("無",	"む");
        let kanji_給 = new Kanji("給",	"きゅう");
        let kanji_収 = new Kanji("収",	"しゅう");
        let kanji_金 = new Kanji("金",	"きん、(お)かね");
        let kanji_銀 = new Kanji("銀",	"ぎん");
        let kanji_銅 = new Kanji("銅",	"どう");
        let kanji_最 = new Kanji("最",	"さい、もっと(も)");
        let kanji_近 = new Kanji("近",	"きん、ちか(い)");
        let kanji_高 = new Kanji("高",	"こう、たか(い)");
        let kanji_悪 = new Kanji("悪",	"あく、わる(い)");
        let kanji_初 = new Kanji("初",	"しょ、はじ(めて)");
        let kanji_後 = new Kanji("後",	"ご、うし(ろ)");
        let kanji_強 = new Kanji("強",	"きょう、つよ(い)");
        let kanji_研 = new Kanji("研",	"けん");
        let kanji_究 = new Kanji("究",	"きゅう");
        let kanji_階 = new Kanji("階",	"かい");
        let kanji_段 = new Kanji("段",	"だん");
        let kanji_通 = new Kanji("通",	"つう、とお(る)");
        let kanji_普 = new Kanji("普",	"ふ");
        let kanji_共 = new Kanji("共",	"きょう");
        let kanji_点 = new Kanji("点",	"てん");
        let kanji_僚 = new Kanji("僚",	"りょう");
        let kanji_感 = new Kanji("感",	"かん");
        let kanji_集 = new Kanji("集",	"しゅう、あつ(める)");
        let kanji_中 = new Kanji("中",	"ちゅう、なか");
        let kanji_写 = new Kanji("写",	"しゃ");
        let kanji_真 = new Kanji("真",	"しん");
        let kanji_決 = new Kanji("決",	"けつ、き(める)");
        let kanji_動 = new Kanji("動",	"どう");
        let kanji_詞 = new Kanji("詞",	"し");
        let kanji_他 = new Kanji("他",	"ほか、た");
        let kanji_由 = new Kanji("由",	"ゆう");
        let kanji_文 = new Kanji("文",	"ぶん");
        let kanji_化 = new Kanji("化",	"か");
        let kanji_探 = new Kanji("探",	"さが(す)");
        let kanji_神 = new Kanji("神",	"かみ");
        let kanji_名 = new Kanji("名",	"めい、な");
        let kanji_売 = new Kanji("売",	"う(る)");
        let kanji_特 = new Kanji("特",	"とく");
        let kanji_別 = new Kanji("別",	"べつ");
        let kanji_描 = new Kanji("描",	"か(く)");
        let kanji_漫 = new Kanji("漫",	"まん");
        let kanji_画 = new Kanji("画",	"が");
        let kanji_面 = new Kanji("面",	"めん、おも");
        let kanji_白 = new Kanji("白",	"しろ(い)");
        let kanji_映 = new Kanji("映",	"えい");
        let kanji_勉 = new Kanji("勉",	"べん");
        let kanji_顔 = new Kanji("顔",	"かお");
        let kanji_地 = new Kanji("地",	"じ");
        let kanji_震 = new Kanji("震",	"しん");
        let kanji_自 = new Kanji("自",	"じ");
        let kanji_身 = new Kanji("身",	"しん");
        let kanji_信 = new Kanji("信",	"しん");
    }

}

class Z_word {

    static list = [];
    static rawList = [];

    constructor(pWord, pReading, pFr) {
        this.word = pWord;
        this.reading = pReading;
        this.fr = pFr;
        Z_word.list.push(this);
    }
}

class Hanzi {

    static list = [];
    static tangoList = [];
    static fuxiList = [];
    //? 295:
    // static fuxiraw = "醋衬烧拐刚戴假助陪舒净舍厅厕害咱玉糕刮预枫涂糊楚撞领融炼拆搬装傅爬拳戏懒剧懂转护糟垃圾透府霉栽砍灯染掉严原脾巴岂毕确咸橙裔俄榄饮橄猪矮臂胶针扮肩膀帅督乳曲踢遛颐卷捡及责摄蛇景阳译收扬彩圆摘捧泼巧夸伙萝聪鹅卜帖贺申邯篇魁郸奇娱联绝播偶续李膏坛根直殊牌拾括兜显碰积赚挤棋顾虽峰富余响计般泽坚稀邓据划埋编端按伯压坟杭蝴墓劝梁仙郑货忍居摆逛搭帛载印赢奖输丝岗技犹疯脆培吊烈豫怜适庄瞒妆挣虑仅即贷拢诞瑰玫宵挚唆啰嗦挥锁鱿聘择讶革靓掌撕置握孤碎巢孙讨荡柔妙临捐县侨悬猜指详惹莫缺歉派承吉购创斗挽晨浦跨映埃艾筑辉菲坦络欲慌率槐须怨废劳充煎瓢崛贤湿漉悄磨寂沈乏鼎轮寞聚维娩厢偏窗抚彻勤祸氓继尊摇欣矶拖晃辩颁";
    //? 156: 
    static fuxiraw = "舒糕刮涂糊撞领融拆搬装傅拳戏懒剧懂转糟透霉栽染脾确榄橄猪矮臂胶扮督捡及摄扬彩摘捧泼巧夸帖申邯魁郸娱李膏坛殊牌拾括兜碰积赚挤顾峰富余响邓据埋编伯压坟杭墓劝梁郑忍摆逛搭帛载赢输丝岗技犹脆培吊豫适庄瞒妆挣即拢瑰玫宵挚唆啰嗦挥聘讶靓掌撕握碎临捐县侨悬惹莫缺歉承挽埃艾慌槐怨煎瓢崛贤悄磨沈鼎轮寞聚娩厢偏抚彻勤氓摇欣矶拖晃辩";

    constructor(pKanji, pReading, pFanti, pFuxi) {
        this.kanji = pKanji;
        this.reading = pReading;
        this.fanti = pFanti;
        this.bFuxi = (pFuxi != "");
        if (this.bFuxi) {
            Hanzi.fuxiList.push(this);
            // if (!Hanzi.fuxiraw.includes(this.kanji)) {
            //     log("LA : " + this.kanji)
            // }
        }
        
        this.examples = "";
        this.exList = [];
        this.insertZword();
        Hanzi.list.push(this);
    }

    insertZword() {
        Z_word.list.forEach(t => {
            if (t.word.includes(this.kanji)) {
                this.exList.push(t.word + ": " + t.reading + " " + t.fr);
                this.examples += t.word + " : " + t.reading + " : " + t.fr + " || ";
            }
        });
    }

    static last52() {
        let last52List = [];
        let count = 0;
        for (let i = Hanzi.list.length -1; i >= Hanzi.list.length - 52; i--) {
            count++;
            last52List.push(Hanzi.list[i]);
        }
        return last52List;
    }
}

function readFile(pFile, pType) {
    let rawFile = new XMLHttpRequest();
    rawFile.open("GET", pFile, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                tsvFile = rawFile.responseText;
                switch(pType) {
                    case "hanzi":
                        createHanzi(tsvFile);
                        break;
                    case "word":
                        createZ_WORD(tsvFile);
                        break;
                }
            }
        }
    }
    rawFile.send(null); 
}

function createHanzi(pFile) {
    let row = pFile.split(/\r\n|\n/);
    let test;
    for (let i = 1; i < row.length; i++) {
        row[i] = row[i].split('\t');
        //?              汉字，      拼音，     繁体，      复习
        test = new Hanzi(row[i][0], row[i][1], row[i][4], row[i][6]);
    }

    // readFile("./tsv/NZH - 当代中文 课本.tsv", "word");
}

function createZ_WORD(pFile, pType) {
    // console.log("4) Create Z_WORD");
    let row = pFile.split(/\r\n|\n/);
    let test;
    let id = 1;
    for (let i = 1; i < row.length; i++) {
        row[i] = row[i].split('\t');
        //?               word,      pinyin,    yisi
        test = new Z_word(row[i][0], row[i][1], row[i][2]);
        id++;
    }

    readFile("./tsv/NZH - 当代中文 汉字.tsv", "hanzi");
    // insertVocRefIntoHanzi();
}
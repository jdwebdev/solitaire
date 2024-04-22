class PixelMode {

    static STATE = Object.freeze({
        Main: 0,
        Ending: 1
    });

    static currentState = PixelMode.STATE.Main;
    static list = [];

    static menuList = [];
    
    static cardList = [];
    static lists = [];
    static DECK = null;
    static DECK2 = null;

    static DECK_TYPE = 0;
    static DECK2_TYPE = 1;
    static HEART_TYPE = 2;
    static SPADE_TYPE = 3;
    static DIAMOND_TYPE = 4;
    static CLUB_TYPE = 5;

    static HSDC_LIST = [];

    static bDeckHover = false;
    static bDeck2Hover = false;
    static hover = null;
    static bDisplayOkPanel = false;
    static listToGoTo = ""; 

    //? Ending
    static currentPosition = "";
    static timer = null;
    static timerBeforeEnd = null;
    static bStopDrawMouse = false;
    static bRestartPanelAlready = false;

    static movingList = [];
    static endingList = [];

    constructor() {
    }

    static init() {
        canvas.style.backgroundColor = CANVAS_ORIGIN_COLOR;
        Card.list = [];
        Card.randomList = [];
        PixelMode.movingList = [];
        PixelMode.endingList = [];
        Card.inTransitionList = [];
        PixelMode.list = [];
        PixelMode.bRestartPanelAlready = false;

        PixelMode.currentState = PixelMode.STATE.Main;
        PixelMode.bStopDrawMouse = false;
        canvas2.style.display = "none";
        Button.list = [];
        Button.currentList = [];
        Panel.list = [];
        Panel.currentList = [];

        PixelMode.lists["deck"] = [];
        PixelMode.lists["deck2"] = [];
        PixelMode.lists["♥"] = [];
        PixelMode.lists["♠"] = [];
        PixelMode.lists["♦"] = [];
        PixelMode.lists["♣"] = [];
        PixelMode.lists["c1"] = [];
        PixelMode.lists["c2"] = [];
        PixelMode.lists["c3"] = [];
        PixelMode.lists["c4"] = [];
        PixelMode.lists["c5"] = [];
        PixelMode.lists["c6"] = [];
        PixelMode.lists["c7"] = [];

        PixelMode.currentPosition = "";
        PixelMode.timer = null;
        PixelMode.timerBeforeEnd = null;

        // let startBtn = new Button({ w: 46, h: 24, v: 7}, 140, 180, null, { cb: PixelMode.init, arg: ""}, "PixelMode", PixelMode.STATE.Main, "START", 1); //? 1 : btn style CARD
        // startBtn.setFreeLabel();
        // startBtn.setFontColor(CARD_BTN_SDW_COLOR, BLACK_COLOR, CARD_BTN_SDW_COLOR);
        // startBtn.setTextCenterY();
        // PixelMode.list.push(startBtn.getSprite());

        // let changeModeBtn = new Button({ w: 46, h: 24, v: 7}, 140, 210, null, { cb: changeMode, arg: ""}, "PixelMode", PixelMode.STATE.Main, "MODE", 1); //? 1 : btn style CARD
        // changeModeBtn.setFreeLabel();
        // changeModeBtn.setFontColor(CARD_BTN_SDW_COLOR, BLACK_COLOR, CARD_BTN_SDW_COLOR);
        // changeModeBtn.setTextCenterY();
        // PixelMode.list.push(changeModeBtn.getSprite());

        let openMenuBtn = new Button({ w: 46, h: 24, v: 7}, 140, 2, null, { cb: PixelMode.openMenu, arg: ""}, "PixelMode", PixelMode.STATE.Main, "MENU", 1); //? 1 : btn style CARD
        openMenuBtn.setFreeLabel();
        openMenuBtn.setFontColor(CARD_BTN_SDW_COLOR, BLACK_COLOR, CARD_BTN_SDW_COLOR);
        openMenuBtn.setTextCenterY();
        PixelMode.list.push(openMenuBtn.getSprite());

        // let endingBtn = new Button({ w: 46, h: 24, v: 7}, 140, 210, null, { cb: PixelMode.end, arg: ""}, "PixelMode", PixelMode.STATE.Main, "END", 1); //? 1 : btn style CARD
        // endingBtn.setFreeLabel();
        // endingBtn.setFontColor(CARD_BTN_SDW_COLOR, BLACK_COLOR, CARD_BTN_SDW_COLOR);
        // endingBtn.setTextCenterY();
        // PixelMode.list.push(endingBtn.getSprite());

        PixelMode.DECK = new Sprite({ w: 24, h: 37 }, Card.POSITIONS["deck"].x, Card.POSITIONS["deck"].y, null, "card");
        PixelMode.DECK.addAnimation("normal", { x: 24, y: 384 });
        PixelMode.DECK.addAnimation("void", { x: 48, y: 384 });
        PixelMode.DECK.changeAnimation("normal");
        PixelMode.list.push(PixelMode.DECK);

        PixelMode.DECK2 = new Sprite({ w: 24, h: 37 }, Card.POSITIONS["deck2"].x, Card.POSITIONS["deck2"].y, null, "card");
        PixelMode.DECK2.addAnimation("normal", { x: 192, y: 384 });
        PixelMode.DECK2.changeAnimation("normal");
        PixelMode.list.push(PixelMode.DECK2);

        // hearts (♥), spades (♠), diamonds (♦), clubs (♣).
        PixelMode.DECK_HEART = new Sprite({ w: 24, h: 37 }, Card.POSITIONS["♥"].x, Card.POSITIONS["♥"].y, null, "card");
        PixelMode.DECK_HEART.addAnimation("normal", { x: 72, y: 384 });
        PixelMode.DECK_HEART.changeAnimation("normal");
        PixelMode.list.push(PixelMode.DECK_HEART);

        PixelMode.DECK_SPADE = new Sprite({ w: 24, h: 37 }, Card.POSITIONS["♠"].x, Card.POSITIONS["♠"].y, null, "card");
        PixelMode.DECK_SPADE.addAnimation("normal", { x: 96, y: 384 });
        PixelMode.DECK_SPADE.changeAnimation("normal");
        PixelMode.list.push(PixelMode.DECK_SPADE);

        PixelMode.DECK_DIAMOND = new Sprite({ w: 24, h: 37 }, Card.POSITIONS["♦"].x, Card.POSITIONS["♦"].y, null, "card");
        PixelMode.DECK_DIAMOND.addAnimation("normal", { x: 120, y: 384 });
        PixelMode.DECK_DIAMOND.changeAnimation("normal");
        PixelMode.list.push(PixelMode.DECK_DIAMOND);

        PixelMode.DECK_CLUB = new Sprite({ w: 24, h: 37 }, Card.POSITIONS["♣"].x, Card.POSITIONS["♣"].y, null, "card");
        PixelMode.DECK_CLUB.addAnimation("normal", { x: 144, y: 384 });
        PixelMode.DECK_CLUB.changeAnimation("normal");
        PixelMode.list.push(PixelMode.DECK_CLUB);

        PixelMode.HSDC_LIST = [
            {x: PixelMode.DECK_HEART.x,   y: PixelMode.DECK_HEART.y,   w: PixelMode.DECK_HEART.width,   h: PixelMode.DECK_HEART.height,   type: "♥"},
            {x: PixelMode.DECK_SPADE.x,   y: PixelMode.DECK_SPADE.y,   w: PixelMode.DECK_SPADE.width,   h: PixelMode.DECK_SPADE.height,   type: "♠"},
            {x: PixelMode.DECK_DIAMOND.x, y: PixelMode.DECK_DIAMOND.y, w: PixelMode.DECK_DIAMOND.width, h: PixelMode.DECK_DIAMOND.height, type: "♦"},
            {x: PixelMode.DECK_CLUB.x,    y: PixelMode.DECK_CLUB.y,    w: PixelMode.DECK_CLUB.width,    h: PixelMode.DECK_CLUB.height,    type: "♣"}
        ]

        PixelMode.POS_1 = new Sprite({ w: 24, h: 37 }, Card.POSITIONS["c1"].x, Card.POSITIONS["c1"].y, null, "card");
        PixelMode.POS_1.addAnimation("normal", { x: 192, y: 384 });
        PixelMode.POS_1.changeAnimation("normal");
        PixelMode.list.push(PixelMode.POS_1);

        PixelMode.POS_2 = new Sprite({ w: 24, h: 37 }, Card.POSITIONS["c2"].x, Card.POSITIONS["c2"].y, null, "card");
        PixelMode.POS_2.addAnimation("normal", { x: 192, y: 384 });
        PixelMode.POS_2.changeAnimation("normal");
        PixelMode.list.push(PixelMode.POS_2);

        PixelMode.POS_3 = new Sprite({ w: 24, h: 37 }, Card.POSITIONS["c3"].x, Card.POSITIONS["c3"].y, null, "card");
        PixelMode.POS_3.addAnimation("normal", { x: 192, y: 384 });
        PixelMode.POS_3.changeAnimation("normal");
        PixelMode.list.push(PixelMode.POS_3);

        PixelMode.POS_4 = new Sprite({ w: 24, h: 37 }, Card.POSITIONS["c4"].x, Card.POSITIONS["c4"].y, null, "card");
        PixelMode.POS_4.addAnimation("normal", { x: 192, y: 384 });
        PixelMode.POS_4.changeAnimation("normal");
        PixelMode.list.push(PixelMode.POS_4);

        PixelMode.POS_5 = new Sprite({ w: 24, h: 37 }, Card.POSITIONS["c5"].x, Card.POSITIONS["c5"].y, null, "card");
        PixelMode.POS_5.addAnimation("normal", { x: 192, y: 384 });
        PixelMode.POS_5.changeAnimation("normal");
        PixelMode.list.push(PixelMode.POS_5);

        PixelMode.POS_6 = new Sprite({ w: 24, h: 37 }, Card.POSITIONS["c6"].x, Card.POSITIONS["c6"].y, null, "card");
        PixelMode.POS_6.addAnimation("normal", { x: 192, y: 384 });
        PixelMode.POS_6.changeAnimation("normal");
        PixelMode.list.push(PixelMode.POS_6);

        PixelMode.POS_7 = new Sprite({ w: 24, h: 37 }, Card.POSITIONS["c7"].x, Card.POSITIONS["c7"].y, null, "card");
        PixelMode.POS_7.addAnimation("normal", { x: 192, y: 384 });
        PixelMode.POS_7.changeAnimation("normal");
        PixelMode.list.push(PixelMode.POS_7);

        PixelMode.POS_LIST = [
            {x: PixelMode.POS_1.x, y: PixelMode.POS_1.y, w: PixelMode.POS_1.width, h: PixelMode.POS_1.height, list: "c1"},
            {x: PixelMode.POS_2.x, y: PixelMode.POS_2.y, w: PixelMode.POS_2.width, h: PixelMode.POS_2.height, list: "c2"},
            {x: PixelMode.POS_3.x, y: PixelMode.POS_3.y, w: PixelMode.POS_3.width, h: PixelMode.POS_3.height, list: "c3"},
            {x: PixelMode.POS_4.x, y: PixelMode.POS_4.y, w: PixelMode.POS_4.width, h: PixelMode.POS_4.height, list: "c4"},
            {x: PixelMode.POS_5.x, y: PixelMode.POS_5.y, w: PixelMode.POS_5.width, h: PixelMode.POS_5.height, list: "c5"},
            {x: PixelMode.POS_6.x, y: PixelMode.POS_6.y, w: PixelMode.POS_6.width, h: PixelMode.POS_6.height, list: "c6"},
            {x: PixelMode.POS_7.x, y: PixelMode.POS_7.y, w: PixelMode.POS_7.width, h: PixelMode.POS_7.height, list: "c7"}
        ]

        PixelMode.hover =  new Sprite({ w: 48, h: 64 }, 0, 0, null, "card");
        PixelMode.hover.addAnimation("active", { x: 336, y: 64 });
        PixelMode.hover.changeAnimation("active");

        PixelMode.hoverPanel = new Panel({ w: 24, h: 37, v: 3 }, 10, 200, null, "PixelMode", PixelMode.STATE.Main, "", 3);
        PixelMode.selectPanel = new Sprite({ w: 24, h: 37 }, 0, 0, null, "card");
        PixelMode.selectPanel.addAnimation("normal", {x: 240, y: 384 });
        PixelMode.selectPanel.changeAnimation("normal");

        PixelMode.OK_PANEL = new Sprite({ w: 24, h: 37 }, 0, 0, null, "card");
        PixelMode.OK_PANEL.addAnimation("normal", { x: 168, y: 384 });
        PixelMode.OK_PANEL.changeAnimation("normal");

        // PixelMode.menuPanel = new Panel({ w: 170, h: 70, v: 7 }, centerX(170), -10, null, "PixelMode", PixelMode.STATE.Main, "", 5);
        // PixelMode.menuPanel.setIdTest("menu PANEL");
        // Panel.currentList.push(PixelMode.menuPanel);
        // PixelMode.menuList.push(PixelMode.menuPanel.getSprite());


        PixelMode.bDisplayOkPanel = false;

        let count = 1;
        let originX = Card.POSITIONS["deck"].x;
        let originY = Card.POSITIONS["deck"].y;
        let yOffset = 70;
        for (let card in Card.CARD_LIST) {
            let c = Card.CARD_LIST[card];
            count++
            let newCard = new Card("", c.name, c.type, c.x, c.y);
            newCard.getSprite().setParent(newCard);
            newCard.getSprite().setIdTest(count)
        }
        
        let testArr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51];
        let newRndArr = Card.randomizer(testArr, testArr.length);

        //! TESTING ---------
        //? Test A 2 3 DIAMOND
        // let testArr = [0,1,2,3,4,5,6,7,8,9,10,11,12,  13,14,15,16,17,18,19,20,21,22,23,26,25,   24,29,33,27,30,31,32,28,34,35, 44 ,37,38,   39,40,41,42,43,36,45,51,47,48,49,50,46];
        // let newRndArr = testArr;
        //? 
        // let testArr = [0,1,2,3,4,5,6,7,8,9,10,11,12,  13,14,15,16,17,18,19,20,21,22,23,24,25,   26,29,33,27,30,31,32,28,34,35,36,37,38,   39,40,41,42,43,44,45,46,47,48,49,50,51];
        // let newRndArr = testArr;
        //! -----------------

        for (let i = 0; i < 52; i++) {
            Card.randomList.push(Card.list[newRndArr[i]]);
        }
        
        let countCard = 1;
        Card.randomList.forEach(c => {

            c.state = Card.STATE.FaceDown;
            c.sp.changeAnimation("faceDown");

            if (countCard <= 24) {
                c.position = "deck";
            } else if (countCard == 25) {
                c.position = "c1";
                c.state = Card.STATE.Normal;
                c.sp.changeAnimation("normal");
            } else if (countCard <= 27) {
                c.position = "c2";
                if (countCard == 27) {
                    c.sp.changeAnimation("normal");
                    c.state = Card.STATE.Normal;
                }
            } else if (countCard <= 30) {
                c.position = "c3";
                if (countCard == 30) {
                    c.sp.changeAnimation("normal");
                    c.state = Card.STATE.Normal;
                }
            } else if (countCard <= 34) {
                c.position = "c4";
                if (countCard == 34) {
                    c.sp.changeAnimation("normal");
                    c.state = Card.STATE.Normal;
                }
            } else if (countCard <= 39) {
                c.position = "c5";
                if (countCard == 39) {
                    c.sp.changeAnimation("normal");
                    c.state = Card.STATE.Normal;
                }
            } else if (countCard <= 45) {
                c.position = "c6";
                if (countCard == 45) {
                    c.sp.changeAnimation("normal");
                    c.state = Card.STATE.Normal;
                }
            } else if (countCard <= 52) {
                c.position = "c7";
                if (countCard == 52) {
                    c.sp.changeAnimation("normal");
                    c.state = Card.STATE.Normal;
                }
            }
            PixelMode.lists[c.position].push(c.sp);
            countCard++;
        });
        console.log(Card.randomList);

        
        //! TESTING ---------
        // PixelMode.DECK.changeAnimation("void");
        // for (const pos in PixelMode.lists) {
        //     PixelMode.lists[pos] = [];
        // }
        // Card.list.forEach(c => {
        //     c.state = Card.STATE.Normal;
        //     c.getSprite().changeAnimation("normal");
        //     c.position = c.type;
        //     PixelMode.lists[c.position].push(c.getSprite()); 
        // });
        // PixelMode.lists["c4"].push(PixelMode.lists["♥"].pop());
        // PixelMode.lists["c4"][0].parent.position = "c4";
        //! -----------------

        Button.resetTypeState("PixelMode", PixelMode.STATE.Main);
        Panel.resetTypeState("PixelMode", PixelMode.STATE.Main);
    }

    static openMenu() {

        MENU = true;

        PixelMode.BG = new Sprite({ w: 1, h: 1 }, 0, 0, null, "MENU", { x: CANVAS_WIDTH, y: CANVAS_HEIGHT });
        PixelMode.BG.addAnimation("normal", { x: 160, y: 0 });
        PixelMode.BG.changeAnimation("normal");
        PixelMode.BG.setAlpha(0);
        PixelMode.BG.fade(0.01);
        PixelMode.menuList.push(PixelMode.BG);

        //?{ w: 170, h: 70, v: 7 }, centerX(170), -10
        PixelMode.menuPanel = new Panel({ w: 170, h: 70, v: 7 }, centerX(170), -70, null, "MENU", PixelMode.STATE.Main, "", 5);
        PixelMode.menuPanel.setIdTest("menu PANEL");

        PixelMode.menuPanel.setDestination({ x: centerX(170), y: -10});
        PixelMode.menuPanel.setCanMove(true);
        PixelMode.menuPanel.setMovingSpeed(0.3);
        PixelMode.menuPanel.setMoving(true);

        Panel.currentList.push(PixelMode.menuPanel);
        PixelMode.menuList.push(PixelMode.menuPanel.getSprite());


        PixelMode.NormalModeBtn = new Button({ w: 60, h: 24, v: 7}, 19, 14, PixelMode.menuPanel, { cb: PixelMode.menuCB, arg: 1}, "MENU", PixelMode.STATE.Main, "NORMAL", 1); //? 1 : btn style CARD
        PixelMode.NormalModeBtn.setIdTest("Normal");
        PixelMode.NormalModeBtn.setFreeLabel();
        PixelMode.NormalModeBtn.setFontColor(CARD_BTN_SDW_COLOR, BLACK_COLOR, CARD_BTN_SDW_COLOR);
        PixelMode.NormalModeBtn.setTextCenterY();
        Button.currentList.push(PixelMode.NormalModeBtn);
        PixelMode.menuList.push(PixelMode.NormalModeBtn.getSprite());

        PixelMode.PixelModeBtn = new Button({ w: 60, h: 24, v: 7}, 89, 14, PixelMode.menuPanel, { cb: PixelMode.menuCB, arg: 2}, "MENU", PixelMode.STATE.Main, "PIXEL", 1); //? 1 : btn style CARD
        PixelMode.PixelModeBtn.setIdTest("Pixel");
        PixelMode.PixelModeBtn.setFreeLabel();
        PixelMode.PixelModeBtn.setFontColor(CARD_BTN_SDW_COLOR, BLACK_COLOR, CARD_BTN_SDW_COLOR);
        PixelMode.PixelModeBtn.setTextCenterY();
        Button.currentList.push(PixelMode.PixelModeBtn);
        PixelMode.menuList.push(PixelMode.PixelModeBtn.getSprite());

        PixelMode.KanjiModeBtn = new Button({ w: 60, h: 24, v: 7}, 19, 39, PixelMode.menuPanel, { cb: PixelMode.menuCB, arg: 3}, "MENU", PixelMode.STATE.Main, "漢字", 1); //? 1 : btn style CARD
        PixelMode.KanjiModeBtn.setIdTest("漢字");
        PixelMode.KanjiModeBtn.setFreeLabel();
        PixelMode.KanjiModeBtn.setFontColor(CARD_BTN_SDW_COLOR, BLACK_COLOR, CARD_BTN_SDW_COLOR);
        PixelMode.KanjiModeBtn.setTextCenterY();
        Button.currentList.push(PixelMode.KanjiModeBtn);
        PixelMode.menuList.push(PixelMode.KanjiModeBtn.getSprite());

        PixelMode.HanziModeBtn = new Button({ w: 60, h: 24, v: 7}, 89, 39, PixelMode.menuPanel, { cb: PixelMode.menuCB, arg: 4}, "MENU", PixelMode.STATE.Main, "中文", 1); //? 1 : btn style CARD
        PixelMode.HanziModeBtn.setIdTest("中文");
        PixelMode.HanziModeBtn.setFreeLabel();
        PixelMode.HanziModeBtn.setFontColor(CARD_BTN_SDW_COLOR, BLACK_COLOR, CARD_BTN_SDW_COLOR);
        PixelMode.HanziModeBtn.setTextCenterY();
        Button.currentList.push(PixelMode.HanziModeBtn);
        PixelMode.menuList.push(PixelMode.HanziModeBtn.getSprite());

        Button.currentList.forEach(b => {
            if (b.type != "MENU") {
                b.setState(Button.STATE.Inactive);
            }
        });

    }

    static closeMenu() {
        MENU = false;
        PixelMode.menuPanel.setMoveCB(PixelMode.menuPanel.delete.bind(PixelMode.menuPanel), "");
        PixelMode.menuPanel.setStartPos({x: centerX(170), y: -10});
        PixelMode.menuPanel.setDestination({x: centerX(170), y: -70}); //? centerX(300), -100
        PixelMode.menuPanel.setCanMove(true);
        PixelMode.menuPanel.setMoving(true);

        PixelMode.BG.delete = true;
        Button.currentList.forEach(b => {
            b.setState(Button.STATE.Normal);
        });
    }

    static menuCB(nBtn) {
        MENU = false;
        PixelMode.menuPanel.delete();
        PixelMode.BG.delete = true;
        Button.currentList.forEach(b => {
            b.setState(Button.STATE.Normal);
        });

        switch(nBtn) {
            case 1:
                Game.currentGameType = Game.GAME_TYPE.Normal;
                changeMode();
                break;
            case 2:
                PixelMode.init();
                break;
            case 3:
                Game.currentGameType = Game.GAME_TYPE.Kanji;
                changeMode();
                break;
            case 4:
                Game.currentGameType = Game.GAME_TYPE.Hanzi;
                changeMode();
                break;

        }
    }

    static checkEnd() {
        if (PixelMode.lists["♥"].length === 13 && 
            PixelMode.lists["♠"].length === 13 && 
            PixelMode.lists["♦"].length === 13 &&
            PixelMode.lists["♣"].length === 13) {
                PixelMode.end();
        }
    }

    static end() {     
        PixelMode.bStopDrawMouse = true;
        // ♣♥♦♠
        PixelMode.DECK.changeAnimation("void");
        for (const pos in PixelMode.lists) {
            PixelMode.lists[pos] = [];
        }

        Button.currentList = [];
        PixelMode.list = [];

        Card.list.forEach(c => {
            c.state = Card.STATE.Normal;
            c.getSprite().changeAnimation("normal");
            c.position = c.type;
            PixelMode.lists[c.position].push(c.getSprite()); 
        });

        PixelMode.timer = new Timer(0.5, PixelMode.throwCard.bind(PixelMode));
        PixelMode.timerBeforeEnd = new Timer(0.1, PixelMode.stopTimerBeforeEnd.bind(PixelMode));
        // PixelMode.currentState = PixelMode.STATE.Ending;
    }

    static stopTimerBeforeEnd() {

        PixelMode.currentState = PixelMode.STATE.Ending;
        PixelMode.timerBeforeEnd = null;

        canvas2.style.display = "block";
    }

    static throwCard() {

        if (PixelMode.lists["♥"].length === 0 &&
        PixelMode.lists["♠"].length === 0 &&
        PixelMode.lists["♦"].length === 0 &&
        PixelMode.lists["♣"].length === 0) {
            PixelMode.timer = null;
            return;
        }

        if (PixelMode.currentPosition !== "") {
            switch(PixelMode.currentPosition) {
                case "♥": PixelMode.currentPosition = "♠"; break;
                case "♠": PixelMode.currentPosition = "♦"; break;
                case "♦": PixelMode.currentPosition = "♣"; break;
                case "♣": PixelMode.currentPosition = "♥"; break;
            }
        } else {
            PixelMode.currentPosition = "♥";
        }

        let card = PixelMode.lists[PixelMode.currentPosition][PixelMode.lists[PixelMode.currentPosition].length-1].parent;

        let newSprite = new Sprite({ w: 24, h: 37 }, card.x, card.y, null, "end"); //? Moving Card
        newSprite.addAnimation("normal", { x: card.sp.getAnimation("normal").origin.x, y: card.sp.getAnimation("normal").origin.y});
        newSprite.changeAnimation("normal");
        newSprite.sx = rnd(3, 26) / 10; //! sx = (-0.5 => -2.5 || 0.5 => 2.5)
        if (isPair(rnd(1,101))) newSprite.sx *= -1;
        newSprite.sy = (rnd(10, 41) / 10) *-1; //! sy = (-1.0 => -4.0)
        PixelMode.endingList.push(newSprite);

        PixelMode.lists[PixelMode.currentPosition].pop();

        if (!PixelMode.bRestartPanelAlready) {
            PixelMode.bRestartPanelAlready = true;
            PixelMode.restartPanel = new Panel({ w: 90, h: 44 }, centerX(90), CANVAS_HEIGHT + 44, null, "all", 0, "", 0, true);
            PixelMode.restartPanel.setIdTest("RESTART PANEL");
            PixelMode.restartPanel.getSprite().addAnimation("normal", {x: 144, y: 16});
            PixelMode.restartPanel.getSprite().changeAnimation("normal");
            PixelMode.restartPanel.setDestination({ x: centerX(90), y: 170});
            PixelMode.restartPanel.setCanMove(true);
            PixelMode.restartPanel.setMovingSpeed(0.5);
            PixelMode.restartPanel.setMoving(true);
            Panel.currentList.push(PixelMode.restartPanel);

            PixelMode.restartBtn = new Button({ w: 60, h: 24, v: 7}, 14, 9, PixelMode.restartPanel, { cb: PixelMode.init, arg: ""}, "PixelMode", PixelMode.STATE.Main, "RESTART", 1); //? 1 : btn style CARD
            PixelMode.restartBtn.setFreeLabel();
            PixelMode.restartBtn.setFontColor(CARD_BTN_SDW_COLOR, BLACK_COLOR, CARD_BTN_SDW_COLOR);
            PixelMode.restartBtn.setTextCenterY();
            Button.currentList.push(PixelMode.restartBtn);
            // PixelMode.restartBtn.setState(Button.STATE.Inactive);
        }
    }

    static getLastOf(pList) {
        if (PixelMode.lists[pList] === undefined) return null;
        if (PixelMode.lists[pList].length > 0) {
            return PixelMode.lists[pList][PixelMode.lists[pList].length-1].getParent();
        } else {
            return null;
        }
        // if (PixelMode.lists[pList].length > 1 ) {
        //     return PixelMode.lists[pList][PixelMode.lists[pList].length-1].getParent();
        // } else {
        //     return null;
        // }
    }

    static update(dt) {

        if (PixelMode.timer !== null && PixelMode.currentState === PixelMode.STATE.Ending) PixelMode.timer.update(dt);
        if (PixelMode.timerBeforeEnd !== null) PixelMode.timerBeforeEnd.update(dt);

        Sprite.manageBeforeUpdating(PixelMode.cardList, dt);
        Sprite.manageBeforeUpdating(PixelMode.list, dt);
        Sprite.manageBeforeUpdating(PixelMode.movingList, dt);
        Sprite.manageBeforeUpdating(PixelMode.endingList, dt);
        Sprite.manageBeforeUpdating(PixelMode.menuList, dt);

        Panel.currentList.forEach(p => {
            p.update(dt)
        });

        PixelMode.cardList = PixelMode.cardList.filter(sp => {
            return !sp.delete;
        });
        PixelMode.list = PixelMode.list.filter(sp => {
            return !sp.delete;
        });
        PixelMode.movingList = PixelMode.movingList.filter(sp => {
            return !sp.delete;
        });
        PixelMode.endingList = PixelMode.endingList.filter(sp => {
            return !sp.delete;
        });
        PixelMode.menuList = PixelMode.menuList.filter(sp => {
            return !sp.delete;
        });
    }

    static draw(ctx) {
        Sprite.manageBeforeDrawing(PixelMode.list);

        // Panel.currentList.forEach(p => {
        //     p.update(dt)
        // });
        
        for (const cardList in PixelMode.lists) {
            Sprite.manageCardBeforeDrawing(PixelMode.lists[cardList], Card.POSITIONS[cardList]);
        }

        Sprite.manageBeforeDrawing(PixelMode.movingList);

        if (PixelMode.bDeckHover) {
            PixelMode.hoverPanel.x = PixelMode.DECK.x;
            PixelMode.hoverPanel.y = PixelMode.DECK.y;
            // PixelMode.hoverPanel.draw(ctx);
            let sp = PixelMode.hoverPanel.getSprite();
            if (sp != null) {
                for (const s in sp) {
                    if (sp[s] instanceof Sprite) {
                        sp[s].draw(ctx);
                    } else if (s == "parent") {
                        if (sp[s].label != "") {
                            sp[s].drawLabel(ctx);
                        }
                    }
                }
            }
        }
        if (PixelMode.bDeck2Hover) {
            PixelMode.hoverPanel.x = PixelMode.DECK2.x;
            PixelMode.hoverPanel.y = PixelMode.DECK2.y-1;
            // PixelMode.hoverPanel.draw(ctx);
            let sp = PixelMode.hoverPanel.getSprite();
            if (sp != null) {
                for (const s in sp) {
                    if (sp[s] instanceof Sprite) {
                        sp[s].draw(ctx);
                    } else if (s == "parent") {
                        if (sp[s].label != "") {
                            sp[s].drawLabel(ctx);
                        }
                    }
                }
            }
        }

        Sprite.manageBeforeDrawing(PixelMode.endingList);

        Sprite.manageBeforeDrawing(PixelMode.menuList);

        if (PixelMode.bRestartPanelAlready) {
            PixelMode.restartPanel.drawCtx2();
            PixelMode.restartBtn.drawCtx2();
        }

        if (PixelMode.bDisplayOkPanel) {
            PixelMode.OK_PANEL.draw(ctx);
        }
    }

}
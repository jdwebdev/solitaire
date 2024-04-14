class Game {

    static STATE = Object.freeze({
        Main: 0,
        Ending: 1
    });

    static currentState = Game.STATE.Main;
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
        Game.movingList = [];
        Game.endingList = [];
        Card.inTransitionList = [];
        Game.list = [];
        Game.bRestartPanelAlready = false;
        
        Game.currentState = Game.STATE.Main;
        Game.bStopDrawMouse = false;
        canvas2.style.display = "none";
        Button.list = [];
        Button.currentList = [];
        Panel.list = [];
        Panel.currentList = [];
        
        Game.lists["deck"] = [];
        Game.lists["deck2"] = [];
        Game.lists["♥"] = [];
        Game.lists["♠"] = [];
        Game.lists["♦"] = [];
        Game.lists["♣"] = [];
        Game.lists["c1"] = [];
        Game.lists["c2"] = [];
        Game.lists["c3"] = [];
        Game.lists["c4"] = [];
        Game.lists["c5"] = [];
        Game.lists["c6"] = [];
        Game.lists["c7"] = [];

        Game.currentPosition = "";
        Game.timer = null;
        Game.timerBeforeEnd = null;
        
        let startBtn = new Button({ w: 60, h: 24, v: 7}, 300, 410, null, { cb: Game.init, arg: ""}, "Game", Game.STATE.Main, "START", 1); //? 1 : btn style CARD
        startBtn.setFreeLabel();
        startBtn.setFontColor(CARD_BTN_SDW_COLOR, BLACK_COLOR, CARD_BTN_SDW_COLOR);
        startBtn.setTextCenterY();
        Game.list.push(startBtn.getSprite());
        
        let changeModeBtn = new Button({ w: 60, h: 24, v: 7}, 300, 440, null, { cb: changeMode, arg: ""}, "Game", Game.STATE.Main, "MODE", 1); //? 1 : btn style CARD
        changeModeBtn.setFreeLabel();
        changeModeBtn.setFontColor(CARD_BTN_SDW_COLOR, BLACK_COLOR, CARD_BTN_SDW_COLOR);
        changeModeBtn.setTextCenterY();
        Game.list.push(changeModeBtn.getSprite());

        let openMenuBtn = new Button({ w: 60, h: 24, v: 7}, 310, 2, null, { cb: Game.openMenu, arg: ""}, "Game", Game.STATE.Main, "MENU", 1); //? 1 : btn style CARD
        openMenuBtn.setFreeLabel();
        openMenuBtn.setFontColor(CARD_BTN_SDW_COLOR, BLACK_COLOR, CARD_BTN_SDW_COLOR);
        openMenuBtn.setTextCenterY();
        Game.list.push(openMenuBtn.getSprite());

        // let endingBtn = new Button({ w: 60, h: 24, v: 7}, 300, 420, null, { cb: Game.end, arg: ""}, "Game", Game.STATE.Main, "END", 1); //? 1 : btn style CARD
        // endingBtn.setFreeLabel();
        // endingBtn.setFontColor(CARD_BTN_SDW_COLOR, BLACK_COLOR, CARD_BTN_SDW_COLOR);
        // endingBtn.setTextCenterY();
        // Game.list.push(endingBtn.getSprite());

        Game.DECK = new Sprite({ w: 48, h: 64 }, Card.POSITIONS["deck"].x, Card.POSITIONS["deck"].y, null, "card");
        Game.DECK.addAnimation("normal", { x: 48, y: 64 });
        Game.DECK.addAnimation("void", { x: 48, y: 0 });
        Game.DECK.changeAnimation("normal");
        Game.list.push(Game.DECK);

        Game.DECK2 = new Sprite({ w: 48, h: 64 }, Card.POSITIONS["deck2"].x, Card.POSITIONS["deck2"].y, null, "card");
        Game.DECK2.addAnimation("normal", { x: 288, y: 64 });
        Game.DECK2.changeAnimation("normal");
        Game.list.push(Game.DECK2);

        // hearts (♥), spades (♠), diamonds (♦), clubs (♣).
        Game.DECK_HEART = new Sprite({ w: 48, h: 64 }, Card.POSITIONS["♥"].x, Card.POSITIONS["♥"].y, null, "card");
        Game.DECK_HEART.addAnimation("normal", { x: 96, y: 64 });
        Game.DECK_HEART.changeAnimation("normal");
        Game.list.push(Game.DECK_HEART);

        Game.DECK_SPADE = new Sprite({ w: 48, h: 64 }, Card.POSITIONS["♠"].x, Card.POSITIONS["♠"].y, null, "card");
        Game.DECK_SPADE.addAnimation("normal", { x: 144, y: 64 });
        Game.DECK_SPADE.changeAnimation("normal");
        Game.list.push(Game.DECK_SPADE);

        Game.DECK_DIAMOND = new Sprite({ w: 48, h: 64 }, Card.POSITIONS["♦"].x, Card.POSITIONS["♦"].y, null, "card");
        Game.DECK_DIAMOND.addAnimation("normal", { x: 192, y: 64 });
        Game.DECK_DIAMOND.changeAnimation("normal");
        Game.list.push(Game.DECK_DIAMOND);

        Game.DECK_CLUB = new Sprite({ w: 48, h: 64 }, Card.POSITIONS["♣"].x, Card.POSITIONS["♣"].y, null, "card");
        Game.DECK_CLUB.addAnimation("normal", { x: 240, y: 64 });
        Game.DECK_CLUB.changeAnimation("normal");
        Game.list.push(Game.DECK_CLUB);

        Game.HSDC_LIST = [
            {x: Game.DECK_HEART.x,   y: Game.DECK_HEART.y,   w: Game.DECK_HEART.width,   h: Game.DECK_HEART.height,   type: "♥"},
            {x: Game.DECK_SPADE.x,   y: Game.DECK_SPADE.y,   w: Game.DECK_SPADE.width,   h: Game.DECK_SPADE.height,   type: "♠"},
            {x: Game.DECK_DIAMOND.x, y: Game.DECK_DIAMOND.y, w: Game.DECK_DIAMOND.width, h: Game.DECK_DIAMOND.height, type: "♦"},
            {x: Game.DECK_CLUB.x,    y: Game.DECK_CLUB.y,    w: Game.DECK_CLUB.width,    h: Game.DECK_CLUB.height,    type: "♣"}
        ]

        Game.POS_1 = new Sprite({ w: 48, h: 64 }, Card.POSITIONS["c1"].x, Card.POSITIONS["c1"].y, null, "card");
        Game.POS_1.addAnimation("normal", { x: 288, y: 64 });
        Game.POS_1.changeAnimation("normal");
        Game.list.push(Game.POS_1);

        Game.POS_2 = new Sprite({ w: 48, h: 64 }, Card.POSITIONS["c2"].x, Card.POSITIONS["c2"].y, null, "card");
        Game.POS_2.addAnimation("normal", { x: 288, y: 64 });
        Game.POS_2.changeAnimation("normal");
        Game.list.push(Game.POS_2);

        Game.POS_3 = new Sprite({ w: 48, h: 64 }, Card.POSITIONS["c3"].x, Card.POSITIONS["c3"].y, null, "card");
        Game.POS_3.addAnimation("normal", { x: 288, y: 64 });
        Game.POS_3.changeAnimation("normal");
        Game.list.push(Game.POS_3);

        Game.POS_4 = new Sprite({ w: 48, h: 64 }, Card.POSITIONS["c4"].x, Card.POSITIONS["c4"].y, null, "card");
        Game.POS_4.addAnimation("normal", { x: 288, y: 64 });
        Game.POS_4.changeAnimation("normal");
        Game.list.push(Game.POS_4);

        Game.POS_5 = new Sprite({ w: 48, h: 64 }, Card.POSITIONS["c5"].x, Card.POSITIONS["c5"].y, null, "card");
        Game.POS_5.addAnimation("normal", { x: 288, y: 64 });
        Game.POS_5.changeAnimation("normal");
        Game.list.push(Game.POS_5);

        Game.POS_6 = new Sprite({ w: 48, h: 64 }, Card.POSITIONS["c6"].x, Card.POSITIONS["c6"].y, null, "card");
        Game.POS_6.addAnimation("normal", { x: 288, y: 64 });
        Game.POS_6.changeAnimation("normal");
        Game.list.push(Game.POS_6);

        Game.POS_7 = new Sprite({ w: 48, h: 64 }, Card.POSITIONS["c7"].x, Card.POSITIONS["c7"].y, null, "card");
        Game.POS_7.addAnimation("normal", { x: 288, y: 64 });
        Game.POS_7.changeAnimation("normal");
        Game.list.push(Game.POS_7);

        Game.POS_LIST = [
            {x: Game.POS_1.x, y: Game.POS_1.y, w: Game.POS_1.width, h: Game.POS_1.height, list: "c1"},
            {x: Game.POS_2.x, y: Game.POS_2.y, w: Game.POS_2.width, h: Game.POS_2.height, list: "c2"},
            {x: Game.POS_3.x, y: Game.POS_3.y, w: Game.POS_3.width, h: Game.POS_3.height, list: "c3"},
            {x: Game.POS_4.x, y: Game.POS_4.y, w: Game.POS_4.width, h: Game.POS_4.height, list: "c4"},
            {x: Game.POS_5.x, y: Game.POS_5.y, w: Game.POS_5.width, h: Game.POS_5.height, list: "c5"},
            {x: Game.POS_6.x, y: Game.POS_6.y, w: Game.POS_6.width, h: Game.POS_6.height, list: "c6"},
            {x: Game.POS_7.x, y: Game.POS_7.y, w: Game.POS_7.width, h: Game.POS_7.height, list: "c7"}
        ]

        Game.kanjiBG = new Sprite({ w: 46, h: 38 }, 0, 0, null, "card");
        Game.kanjiBG.addAnimation("normal", { x: 336, y: 16});
        Game.kanjiBG.changeAnimation("normal");
        // Game.list.push(Game.kanjiBG);
        //? 336 16 46 38

        Game.hover = new Sprite({ w: 48, h: 64 }, 0, 0, null, "card");
        Game.hover.addAnimation("active", { x: 336, y: 64 });
        Game.hover.changeAnimation("active");

        Game.hoverPanel = new Panel({ w: 48, h: 64, v: 3 }, 10, 200, null, "Game", Game.STATE.Main, "", 1);
        // Game.selectPanel = new Panel({ w: 48, h: 64, v: 11 }, 10, 200, null, "Game", Game.STATE.Main, "", 2);
        Game.selectPanel = new Sprite({ w: 48, h: 64 }, 0, 0, null, "card");
        Game.selectPanel.addAnimation("normal", {x: 336, y: 64 });
        Game.selectPanel.changeAnimation("normal");

        Game.OK_PANEL = new Sprite({ w: 48, h: 64 }, 0, 0, null, "card");
        Game.OK_PANEL.addAnimation("normal", { x: 384, y: 64 });
        Game.OK_PANEL.changeAnimation("normal");

        Game.bDisplayOkPanel = false;

        let randomKanjiList = randomizer(Kanji.list, Kanji.list.length);

        let count = 0;
        let originX = Card.POSITIONS["deck"].x;
        let originY = Card.POSITIONS["deck"].y;
        let yOffset = 70;
        for (let card in Card.CARD_LIST) {
            let c = Card.CARD_LIST[card];
            let newCard = new Card("", c.name, c.type, c.x, c.y, randomKanjiList[count]);
            newCard.getSprite().setParent(newCard);
            count++;
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
            Game.lists[c.position].push(c.sp);
            countCard++;
        });
        console.log(Card.randomList);

        //! TESTING ---------
        // Game.DECK.changeAnimation("void");
        // for (const pos in Game.lists) {
        //     Game.lists[pos] = [];
        // }
        // // Game.list = [];
        // Card.list.forEach(c => {
        //     c.state = Card.STATE.Normal;
        //     c.getSprite().changeAnimation("normal");
        //     c.position = c.type;
        //     Game.lists[c.position].push(c.getSprite()); 
        // });
        // Game.lists["c4"].push(Game.lists["♥"].pop());
        // Game.lists["c4"][0].parent.position = "c4";
        //! -----------------

        Button.resetTypeState("Game", Game.STATE.Main);
        Panel.resetTypeState("Game", Game.STATE.Main);
    }

    static openMenu() {

        MENU = true;

        Game.BG = new Sprite({ w: 1, h: 1 }, 0, 0, null, "MENU", { x: CANVAS_WIDTH, y: CANVAS_HEIGHT });
        Game.BG.addAnimation("normal", { x: 160, y: 0 });
        Game.BG.changeAnimation("normal");
        Game.BG.setAlpha(0);
        Game.BG.fade(0.01);
        Game.menuList.push(Game.BG);

        Game.menuPanel = new Panel({ w: 300, h: 50, v: 7 }, centerX(300), -100, null, "MENU", Game.STATE.Main, "", 5);
        Game.menuPanel.setIdTest("menu PANEL");

        Game.menuPanel.setDestination({ x: centerX(300), y: -10});
        Game.menuPanel.setCanMove(true);
        Game.menuPanel.setMovingSpeed(0.5);
        Game.menuPanel.setMoving(true);

        Panel.currentList.push(Game.menuPanel);
        Game.menuList.push(Game.menuPanel.getSprite());


        Game.NormalModeBtn = new Button({ w: 60, h: 24, v: 7}, 15, 15, Game.menuPanel, { cb: Game.menuCB, arg: 1}, "MENU", Game.STATE.Main, "NORMAL", 1); //? 1 : btn style CARD
        Game.NormalModeBtn.setIdTest("Normal");
        Game.NormalModeBtn.setFreeLabel();
        Game.NormalModeBtn.setFontColor(CARD_BTN_SDW_COLOR, BLACK_COLOR, CARD_BTN_SDW_COLOR);
        Game.NormalModeBtn.setTextCenterY();
        Button.currentList.push(Game.NormalModeBtn);
        Game.menuList.push(Game.NormalModeBtn.getSprite());

        Game.PixelModeBtn = new Button({ w: 60, h: 24, v: 7}, 85, 15, Game.menuPanel, { cb: Game.menuCB, arg: 2}, "MENU", Game.STATE.Main, "PIXEL", 1); //? 1 : btn style CARD
        Game.PixelModeBtn.setIdTest("Pixel");
        Game.PixelModeBtn.setFreeLabel();
        Game.PixelModeBtn.setFontColor(CARD_BTN_SDW_COLOR, BLACK_COLOR, CARD_BTN_SDW_COLOR);
        Game.PixelModeBtn.setTextCenterY();
        Button.currentList.push(Game.PixelModeBtn);
        Game.menuList.push(Game.PixelModeBtn.getSprite());

        Game.KanjiModeBtn = new Button({ w: 60, h: 24, v: 7}, 155, 15, Game.menuPanel, { cb: Game.menuCB, arg: 3}, "MENU", Game.STATE.Main, "漢字", 1); //? 1 : btn style CARD
        Game.KanjiModeBtn.setIdTest("漢字");
        Game.KanjiModeBtn.setFreeLabel();
        Game.KanjiModeBtn.setFontColor(CARD_BTN_SDW_COLOR, BLACK_COLOR, CARD_BTN_SDW_COLOR);
        Game.KanjiModeBtn.setTextCenterY();
        Button.currentList.push(Game.KanjiModeBtn);
        Game.menuList.push(Game.KanjiModeBtn.getSprite());

        Game.HanziModeBtn = new Button({ w: 60, h: 24, v: 7}, 225, 15, Game.menuPanel, { cb: Game.menuCB, arg: 4}, "MENU", Game.STATE.Main, "中文", 1); //? 1 : btn style CARD
        Game.HanziModeBtn.setIdTest("中文");
        Game.HanziModeBtn.setFreeLabel();
        Game.HanziModeBtn.setFontColor(CARD_BTN_SDW_COLOR, BLACK_COLOR, CARD_BTN_SDW_COLOR);
        Game.HanziModeBtn.setTextCenterY();
        Button.currentList.push(Game.HanziModeBtn);
        Game.menuList.push(Game.HanziModeBtn.getSprite());

        Button.currentList.forEach(b => {
            if (b.type != "MENU") {
                b.setState(Button.STATE.Inactive);
            }
        });

    }

    static closeMenu() {
        MENU = false;
        Game.menuPanel.setMoveCB(Game.menuPanel.delete.bind(Game.menuPanel), "");
        Game.menuPanel.setStartPos({x: centerX(300), y: -10});
        Game.menuPanel.setDestination({x: centerX(300), y: -100}); //? centerX(300), -100
        Game.menuPanel.setCanMove(true);
        Game.menuPanel.setMoving(true);

        Game.BG.delete = true;
        Button.currentList.forEach(b => {
            b.setState(Button.STATE.Normal);
        });
    }

    static menuCB(nBtn) {
        switch(nBtn) {
            case 1:
                log("normal");
                break;
            case 2:
                log("pixel");
                break;
            case 3:
                log("kanji");
                break;
            case 4:
                log("hanzi");
                break;

        }
    }

    static checkEnd() {
        if (Game.lists["♥"].length === 13 && 
            Game.lists["♠"].length === 13 && 
            Game.lists["♦"].length === 13 &&
            Game.lists["♣"].length === 13) {
                Game.end();
        }
    }

    static end() {     
        Game.bStopDrawMouse = true;
        // ♣♥♦♠
        Game.DECK.changeAnimation("void");
        for (const pos in Game.lists) {
            Game.lists[pos] = [];
        }

        Button.currentList = [];
        Game.list = [];

        Card.list.forEach(c => {
            c.state = Card.STATE.Normal;
            c.getSprite().changeAnimation("normal");
            c.position = c.type;
            Game.lists[c.position].push(c.getSprite()); 
        });

        Game.timer = new Timer(0.5, Game.throwCard.bind(Game));
        Game.timerBeforeEnd = new Timer(0.1, Game.stopTimerBeforeEnd.bind(Game));        
        // Game.currentState = Game.STATE.Ending;
    }

    static stopTimerBeforeEnd() {

        Game.currentState = Game.STATE.Ending;
        Game.timerBeforeEnd = null;

        canvas2.style.display = "block";
    }

    static throwCard() {
        if (Game.lists["♥"].length === 0 &&
            Game.lists["♠"].length === 0 &&
            Game.lists["♦"].length === 0 &&
            Game.lists["♣"].length === 0) {
                Game.timer = null;
                return;
            }

        if (Game.currentPosition !== "") {
            switch(Game.currentPosition) {
                case "♥": Game.currentPosition = "♠"; break;
                case "♠": Game.currentPosition = "♦"; break;
                case "♦": Game.currentPosition = "♣"; break;
                case "♣": Game.currentPosition = "♥"; break;
            }
        } else {
            Game.currentPosition = "♥";
        }

        let card = Game.lists[Game.currentPosition][Game.lists[Game.currentPosition].length-1].parent;

        let newSprite = new Sprite({ w: 48, h: 64 }, card.x, card.y, null, "end"); //? Moving Card
        newSprite.addAnimation("normal", { x: card.sp.getAnimation("normal").origin.x, y: card.sp.getAnimation("normal").origin.y});
        newSprite.changeAnimation("normal");
        newSprite.sx = rnd(5, 26) / 10; //! sx = (-0.5 => -2.5 || 0.5 => 2.5)
        if (isPair(rnd(1,101))) newSprite.sx *= -1;
        newSprite.sy = (rnd(10, 41) / 10) *-1; //! sy = (-1.0 => -4.0)
        Game.endingList.push(newSprite);

        let kanjiSprite = new Sprite({ w: 46, h: 38 }, 1, 13, newSprite, "endc"); //? Moving Card Child
        kanjiSprite.addAnimation("normal", { x: 336, y: 16});
        kanjiSprite.changeAnimation("normal");
        kanjiSprite.parentCard = card;
        Game.endingList.push(kanjiSprite);

        Game.lists[Game.currentPosition].pop();


        if (!Game.bRestartPanelAlready) {
            Game.bRestartPanelAlready = true;
            Game.restartPanel = new Panel({ w: 90, h: 44 }, centerX(90), CANVAS_HEIGHT + 44, null, "GameEnding", 0, "", 0, true);
            Game.restartPanel.setIdTest("RESTART PANEL");
            Game.restartPanel.getSprite().addAnimation("normal", {x: 144, y: 16});
            Game.restartPanel.getSprite().changeAnimation("normal");
            Game.restartPanel.setDestination({ x: centerX(90), y: 400});
            Game.restartPanel.setCanMove(true);
            Game.restartPanel.setMovingSpeed(0.5);
            Game.restartPanel.setMoving(true);
            Panel.currentList.push(Game.restartPanel);
            // MAIN_SPRITE_LIST.push(Game.restartPanel.getSprite());
        
            Game.restartBtn = new Button({ w: 60, h: 23, v: 7}, 14, 9, Game.restartPanel, { cb: Game.init, arg: ""}, "GameEnding", Game.STATE.Main, "RESTART", 1); //? 1 : btn style CARD
            Game.restartBtn.setFreeLabel();
            Game.restartBtn.setFontColor(CARD_BTN_SDW_COLOR, BLACK_COLOR, CARD_BTN_SDW_COLOR);
            Game.restartBtn.setTextCenterY();
            Button.currentList.push(Game.restartBtn);
            // Game.restartBtn.setState(Button.STATE.Normal);
        }


    }

    static getLastOf(pList) {
        return Game.lists[pList][Game.lists[pList].length-1].getParent();
    }

    static update(dt) {

        if (Game.timer !== null && Game.currentState === Game.STATE.Ending) Game.timer.update(dt);
        if (Game.timerBeforeEnd !== null) Game.timerBeforeEnd.update(dt);

        Sprite.manageBeforeUpdating(Game.cardList, dt);
        Sprite.manageBeforeUpdating(Game.list, dt);
        Sprite.manageBeforeUpdating(Game.movingList, dt);
        Sprite.manageBeforeUpdating(Game.endingList, dt);
        Sprite.manageBeforeUpdating(Game.menuList, dt);

        Panel.currentList.forEach(p => {
            p.update(dt);
        });

        Game.cardList = Game.cardList.filter(sp => {
            return !sp.delete;
        });
        Game.list = Game.list.filter(sp => {
            return !sp.delete;
        });
        Game.movingList = Game.movingList.filter(sp => {
            return !sp.delete;
        });
        Game.endingList = Game.endingList.filter(sp => {
            return !sp.delete;
        });
        Game.menuList = Game.menuList.filter(sp => {
            return !sp.delete;
        });
    }

    static draw(ctx) {
        Sprite.manageBeforeDrawing(Game.list);
        
        // Panel.currentList.forEach(p => {
        //     p.update(dt)
        // });
        
        for (const cardList in Game.lists) {
            Sprite.manageCardBeforeDrawing(Game.lists[cardList], Card.POSITIONS[cardList]);
        }

        Sprite.manageBeforeDrawing(Game.movingList);

        if (Game.bDeckHover) {
            Game.hoverPanel.x = Game.DECK.x;
            Game.hoverPanel.y = Game.DECK.y;
            // Game.hoverPanel.draw(ctx);
            let sp = Game.hoverPanel.getSprite();
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
        if (Game.bDeck2Hover) {
            Game.hoverPanel.x = Game.DECK2.x;
            Game.hoverPanel.y = Game.DECK2.y-1;
            // Game.hoverPanel.draw(ctx);

            let card = Game.getLastOf("deck2");
            if (!MOBILE) {
                let innerHTML = card.kanji.yomi + "<br/>";
                card.kanji.exList.forEach(t => {
                    innerHTML += t + "<br/>"
                });
                yomiText.element.innerHTML = innerHTML;
            }

            let sp = Game.hoverPanel.getSprite();
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

        Sprite.manageBeforeDrawing(Game.endingList);

        Sprite.manageBeforeDrawing(Game.menuList);

        if (Game.bRestartPanelAlready) {
            Game.restartPanel.drawCtx2();
            Game.restartBtn.drawCtx2();
        }

        if (Game.bDisplayOkPanel) {
            Game.OK_PANEL.draw(ctx);
        }
    }

}
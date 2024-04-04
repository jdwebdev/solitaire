class Game2 {

    static STATE = Object.freeze({
        Main: 0,
    });

    static currentState = Game2.STATE.Main;
    static list = [];
    
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

    constructor() {
    }

    static init() {

        log("game2 init")
        canvas.style.backgroundColor = CANVAS_ORIGIN_COLOR;
        Card.list = [];
        Card.randomList = [];

        Game2.lists["deck"] = [];
        Game2.lists["deck2"] = [];
        Game2.lists["♥"] = [];
        Game2.lists["♠"] = [];
        Game2.lists["♦"] = [];
        Game2.lists["♣"] = [];
        Game2.lists["c1"] = [];
        Game2.lists["c2"] = [];
        Game2.lists["c3"] = [];
        Game2.lists["c4"] = [];
        Game2.lists["c5"] = [];
        Game2.lists["c6"] = [];
        Game2.lists["c7"] = [];


        let cadre = new Sprite({ w: 375, h: 600 }, 0, 0, null, "card");
        cadre.addAnimation("normal", { x: 0, y: 544 });
        cadre.changeAnimation("normal");
        Game2.list.push(cadre);

        // let JS_ENGINE = new Sprite({ w: 144, h: 16 }, centerX(144), 30, null, "card");
        // JS_ENGINE.addAnimation("normal", { x: 64, y: 0 });
        // JS_ENGINE.changeAnimation("normal");
        // Game2.list.push(JS_ENGINE);

        let testBtn = new Button({ w: 46, h: 22, v: 6}, 0, 200, null, { cb: Game2.init, arg: ""}, "Game2", Game2.STATE.Main, "START", 0); //? 0 : btn style par défaut
        testBtn.setFreeLabel();
        testBtn.setFontColor(RED_BTN_SDW_COLOR);
        Game2.list.push(testBtn.getSprite());

        Game2.DECK = new Sprite({ w: 24, h: 32 }, Card.POSITIONS["deck"].x, Card.POSITIONS["deck"].y, null, "card");
        Game2.DECK.addAnimation("normal", { x: 0, y: 384 });
        Game2.DECK.addAnimation("void", { x: 464, y: 0 });
        Game2.DECK.changeAnimation("normal");
        Game2.list.push(Game2.DECK);

        Game2.DECK2 = new Sprite({ w: 24, h: 32 }, Card.POSITIONS["deck2"].x, Card.POSITIONS["deck2"].y, null, "card");
        Game2.DECK2.addAnimation("normal", { x: 192, y: 384 });
        Game2.DECK2.changeAnimation("normal");
        Game2.list.push(Game2.DECK2);

        // hearts (♥), spades (♠), diamonds (♦), clubs (♣).
        Game2.DECK_HEART = new Sprite({ w: 24, h: 32 }, Card.POSITIONS["♥"].x, Card.POSITIONS["♥"].y, null, "card");
        Game2.DECK_HEART.addAnimation("normal", { x: 72, y: 384 });
        Game2.DECK_HEART.changeAnimation("normal");
        Game2.list.push(Game2.DECK_HEART);

        Game2.DECK_SPADE = new Sprite({ w: 24, h: 32 }, Card.POSITIONS["♠"].x, Card.POSITIONS["♠"].y, null, "card");
        Game2.DECK_SPADE.addAnimation("normal", { x: 96, y: 384 });
        Game2.DECK_SPADE.changeAnimation("normal");
        Game2.list.push(Game2.DECK_SPADE);

        Game2.DECK_DIAMOND = new Sprite({ w: 24, h: 32 }, Card.POSITIONS["♦"].x, Card.POSITIONS["♦"].y, null, "card");
        Game2.DECK_DIAMOND.addAnimation("normal", { x: 120, y: 384 });
        Game2.DECK_DIAMOND.changeAnimation("normal");
        Game2.list.push(Game2.DECK_DIAMOND);

        Game2.DECK_CLUB = new Sprite({ w: 24, h: 32 }, Card.POSITIONS["♣"].x, Card.POSITIONS["♣"].y, null, "card");
        Game2.DECK_CLUB.addAnimation("normal", { x: 144, y: 384 });
        Game2.DECK_CLUB.changeAnimation("normal");
        Game2.list.push(Game2.DECK_CLUB);

        Game2.HSDC_LIST = [
            {x: Game2.DECK_HEART.x,   y: Game2.DECK_HEART.y,   w: Game2.DECK_HEART.width,   h: Game2.DECK_HEART.height,   type: "♥"},
            {x: Game2.DECK_SPADE.x,   y: Game2.DECK_SPADE.y,   w: Game2.DECK_SPADE.width,   h: Game2.DECK_SPADE.height,   type: "♠"},
            {x: Game2.DECK_DIAMOND.x, y: Game2.DECK_DIAMOND.y, w: Game2.DECK_DIAMOND.width, h: Game2.DECK_DIAMOND.height, type: "♦"},
            {x: Game2.DECK_CLUB.x,    y: Game2.DECK_CLUB.y,    w: Game2.DECK_CLUB.width,    h: Game2.DECK_CLUB.height,    type: "♣"}
        ]

        Game2.POS_1 = new Sprite({ w: 24, h: 32 }, Card.POSITIONS["c1"].x, Card.POSITIONS["c1"].y, null, "card");
        Game2.POS_1.addAnimation("normal", { x: 192, y: 384 });
        Game2.POS_1.changeAnimation("normal");
        Game2.list.push(Game2.POS_1);

        Game2.POS_2 = new Sprite({ w: 24, h: 32 }, Card.POSITIONS["c2"].x, Card.POSITIONS["c2"].y, null, "card");
        Game2.POS_2.addAnimation("normal", { x: 192, y: 384 });
        Game2.POS_2.changeAnimation("normal");
        Game2.list.push(Game2.POS_2);

        Game2.POS_3 = new Sprite({ w: 24, h: 32 }, Card.POSITIONS["c3"].x, Card.POSITIONS["c3"].y, null, "card");
        Game2.POS_3.addAnimation("normal", { x: 192, y: 384 });
        Game2.POS_3.changeAnimation("normal");
        Game2.list.push(Game2.POS_3);

        Game2.POS_4 = new Sprite({ w: 24, h: 32 }, Card.POSITIONS["c4"].x, Card.POSITIONS["c4"].y, null, "card");
        Game2.POS_4.addAnimation("normal", { x: 192, y: 384 });
        Game2.POS_4.changeAnimation("normal");
        Game2.list.push(Game2.POS_4);

        Game2.POS_5 = new Sprite({ w: 24, h: 32 }, Card.POSITIONS["c5"].x, Card.POSITIONS["c5"].y, null, "card");
        Game2.POS_5.addAnimation("normal", { x: 192, y: 384 });
        Game2.POS_5.changeAnimation("normal");
        Game2.list.push(Game2.POS_5);

        Game2.POS_6 = new Sprite({ w: 24, h: 32 }, Card.POSITIONS["c6"].x, Card.POSITIONS["c6"].y, null, "card");
        Game2.POS_6.addAnimation("normal", { x: 192, y: 384 });
        Game2.POS_6.changeAnimation("normal");
        Game2.list.push(Game2.POS_6);

        Game2.POS_7 = new Sprite({ w: 24, h: 32 }, Card.POSITIONS["c7"].x, Card.POSITIONS["c7"].y, null, "card");
        Game2.POS_7.addAnimation("normal", { x: 192, y: 384 });
        Game2.POS_7.changeAnimation("normal");
        Game2.list.push(Game2.POS_7);

        Game2.POS_LIST = [
            {x: Game2.POS_1.x, y: Game2.POS_1.y, w: Game2.POS_1.width, h: Game2.POS_1.height, list: "c1"},
            {x: Game2.POS_2.x, y: Game2.POS_2.y, w: Game2.POS_2.width, h: Game2.POS_2.height, list: "c2"},
            {x: Game2.POS_3.x, y: Game2.POS_3.y, w: Game2.POS_3.width, h: Game2.POS_3.height, list: "c3"},
            {x: Game2.POS_4.x, y: Game2.POS_4.y, w: Game2.POS_4.width, h: Game2.POS_4.height, list: "c4"},
            {x: Game2.POS_5.x, y: Game2.POS_5.y, w: Game2.POS_5.width, h: Game2.POS_5.height, list: "c5"},
            {x: Game2.POS_6.x, y: Game2.POS_6.y, w: Game2.POS_6.width, h: Game2.POS_6.height, list: "c6"},
            {x: Game2.POS_7.x, y: Game2.POS_7.y, w: Game2.POS_7.width, h: Game2.POS_7.height, list: "c7"}
        ]

        Game2.hover =  new Sprite({ w: 48, h: 64 }, 0, 0, null, "card");
        Game2.hover.addAnimation("active", { x: 336, y: 64 });
        Game2.hover.changeAnimation("active");

        Game2.hoverPanel = new Panel({ w: 24, h: 32, v: 3 }, 10, 200, null, "Game2", Game2.STATE.Main, "", 3);
        Game2.selectPanel = new Panel({ w: 24, h: 32, v: 11 }, 10, 200, null, "Game2", Game2.STATE.Main, "", 4);

        Game2.OK_PANEL = new Sprite({ w: 48, h: 64 }, 0, 0, null, "card");
        Game2.OK_PANEL.addAnimation("normal", { x: 384, y: 64 });
        Game2.OK_PANEL.changeAnimation("normal");
        // Game2.list.push(Game2.OK_PANEL.getSprite());

        Game2.bDisplayOkPanel = false;
        //? 46 226

        // log(Card.CARD_LIST["10♥"]);
        // log(Card.CARD_LIST);

        let count = 1;
        let originX = Card.POSITIONS["deck"].x;
        let originY = Card.POSITIONS["deck"].y;
        let yOffset = 70;
        for (let card in Card.CARD_LIST) {
            let c = Card.CARD_LIST[card];
            let newCard = new Card("", c.name, c.type, c.x, c.y);
            newCard.getSprite().setParent(newCard);
            // Game2.list.push(newCard.getSprite());
        }
        
        let testArr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51];
        let newRndArr = Card.randomizer(testArr, testArr.length);

        //! TESTING ---------
        //? Test A 2 3 DIAMOND
        // let testArr = [0,1,2,3,4,5,6,7,8,9,10,11,12,  13,14,15,16,17,18,19,20,21,22,23,26,25,   24,29,33,27,30,31,32,28,34,35,36,37,38,   39,40,41,42,43,44,45,46,47,48,49,50,51];
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
            Game2.lists[c.position].push(c.sp);
            countCard++;
            // Game2.cardList.push(c.getSprite());
        });
        console.log(Card.randomList);
        // console.log(Game2.c1List[0].getParent());

        Button.resetTypeState("Game2", Game2.STATE.Main);
        Panel.resetTypeState("Game2", Game2.STATE.Main);
    }

    static getLastOf(pList) {
        return Game2.lists[pList][Game2.lists[pList].length-1].getParent();
    }

    static update(dt) {

        Sprite.manageBeforeUpdating(Game2.cardList, dt);
        Sprite.manageBeforeUpdating(Game2.list, dt);

        Panel.currentList.forEach(p => {
            p.update(dt)
        });

        Game2.cardList = Game2.cardList.filter(sp => {
            return !sp.delete;
        });

        Game2.list = Game2.list.filter(sp => {
            return !sp.delete;
        });
    }

    static draw(ctx) {
        Sprite.manageBeforeDrawing(Game2.list);

        // Panel.currentList.forEach(p => {
        //     p.update(dt)
        // });
        
        for (const cardList in Game2.lists) {
            Sprite.manageCardBeforeDrawing(Game2.lists[cardList], Card.POSITIONS[cardList]);
        }

        if (Game2.bDeckHover) {
            Game2.hoverPanel.x = Game2.DECK.x;
            Game2.hoverPanel.y = Game2.DECK.y;
            // Game2.hoverPanel.draw(ctx);
            let sp = Game2.hoverPanel.getSprite();
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
        if (Game2.bDeck2Hover) {
            Game2.hoverPanel.x = Game2.DECK2.x;
            Game2.hoverPanel.y = Game2.DECK2.y;
            // Game2.hoverPanel.draw(ctx);
            let sp = Game2.hoverPanel.getSprite();
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

        if (Game2.bDisplayOkPanel) {
            // log("OK display ok panel");
            Game2.OK_PANEL.draw(ctx);
        }
    }

}
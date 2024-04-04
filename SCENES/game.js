class Game {

    static STATE = Object.freeze({
        Main: 0,
    });

    static currentState = Game.STATE.Main;
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
        canvas.style.backgroundColor = CANVAS_ORIGIN_COLOR;
        Card.list = [];
        Card.randomList = [];

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


        let cadre = new Sprite({ w: 375, h: 600 }, 0, 0, null, "card");
        cadre.addAnimation("normal", { x: 0, y: 544 });
        cadre.changeAnimation("normal");
        Game.list.push(cadre);

        // let JS_ENGINE = new Sprite({ w: 144, h: 16 }, centerX(144), 30, null, "card");
        // JS_ENGINE.addAnimation("normal", { x: 64, y: 0 });
        // JS_ENGINE.changeAnimation("normal");
        // Game.list.push(JS_ENGINE);

        let testBtn = new Button({ w: 80, h: 23, v: 6}, centerX(80), 300, null, { cb: Game.init, arg: ""}, "Game", Game.STATE.Main, "START", 0); //? 0 : btn style par défaut
        testBtn.setFreeLabel();
        testBtn.setFontColor(RED_BTN_SDW_COLOR);
        Game.list.push(testBtn.getSprite());

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

        Game.hover =  new Sprite({ w: 48, h: 64 }, 0, 0, null, "card");
        Game.hover.addAnimation("active", { x: 336, y: 64 });
        Game.hover.changeAnimation("active");

        Game.hoverPanel = new Panel({ w: 48, h: 64, v: 3 }, 10, 200, null, "Game", Game.STATE.Main, "", 1);
        Game.selectPanel = new Panel({ w: 48, h: 64, v: 11 }, 10, 200, null, "Game", Game.STATE.Main, "", 2);

        Game.OK_PANEL = new Sprite({ w: 48, h: 64 }, 0, 0, null, "card");
        Game.OK_PANEL.addAnimation("normal", { x: 384, y: 64 });
        Game.OK_PANEL.changeAnimation("normal");
        // Game.list.push(Game.OK_PANEL.getSprite());

        Game.bDisplayOkPanel = false;
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
            // Game.list.push(newCard.getSprite());
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
            Game.lists[c.position].push(c.sp);
            countCard++;
            // Game.cardList.push(c.getSprite());
        });
        console.log(Card.randomList);
        // console.log(Game.c1List[0].getParent());

        Button.resetTypeState("Game", Game.STATE.Main);
        Panel.resetTypeState("Game", Game.STATE.Main);
    }

    static getLastOf(pList) {
        return Game.lists[pList][Game.lists[pList].length-1].getParent();
    }

    static update(dt) {

        Sprite.manageBeforeUpdating(Game.cardList, dt);
        Sprite.manageBeforeUpdating(Game.list, dt);

        Panel.currentList.forEach(p => {
            p.update(dt)
        });

        Game.cardList = Game.cardList.filter(sp => {
            return !sp.delete;
        });

        Game.list = Game.list.filter(sp => {
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
            Game.hoverPanel.y = Game.DECK2.y;
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

        if (Game.bDisplayOkPanel) {
            // log("OK display ok panel");
            Game.OK_PANEL.draw(ctx);
        }
    }

}
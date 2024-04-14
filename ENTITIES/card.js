class Card {
    // ♦♥♣♠
    // clubs (♣), diamonds (♦), hearts (♥), spades (♠).
    static CARD_LIST = [];
    static POSITIONS = [];
    static POSITION_LIST =  [
        "deck","deck2","♥","♠","♦","♣",
        "c1","c2","c3","c4","c5","c6","c7"
    ]; // 13 14 15 16 17 18 19
    static inTransition = null;
    static inTransitionList = [];
    static multiTransition = false;
    static selected = null;
    static multiHover = false;
    static multiHoverPos = "";
    static multiSelect = false;
    static multiSelectPos = "";
    static list = [];
    static randomList = [];
    static STATE = Object.freeze({
        Normal: 0,
        Hover: 1,
        FaceDown: 2,
    });
    static COL_OFFSET = 68;

    constructor(pPosition, pName, pType, pAnimX, pAnimY, pKanji) {
        this.position = pPosition;
        this.name = pName;
        this.type = pType;
        this.x = 0;
        this.y = 0;
        if (mainState === MAIN_STATE.Game) {
            this.width = 48;
            this.height = 64;
        } else {
            this.width = 24;
            this.height = 32;
        }

        this.state = Card.STATE.Normal;
        this.bHovering = false;
        this.bSelect = false;
        this.bMoving = false;

        this.kanji = pKanji;


        this.tweeningArrive = easeOutSin;
        this.startPos = { x: 0, y: 0 };
        this.destination = { x: 0, y: 0 };
        this.direction = 1;
        this.bMoving = false;
        this.bCanMove = false;
        this.speedCount = 0;
        this.movingSpeed = 1;
        this.tweeningArrive = easeOutSin;
        this.tweeningLeave = easeInSin;
        this.arriveDir = true;
        this.leaveDir = false;




        this.sp = new Sprite({w: this.width, h: this.height}, this.x, this.y, null, "c");
        this.sp.addAnimation("normal", { x: pAnimX, y: pAnimY });
        if (mainState === MAIN_STATE.Game) {
            this.sp.addAnimation("faceDown", { x: 0, y: 64 });
        } else {
            this.sp.addAnimation("faceDown", { x: 0, y: 384 });
        }
        // this.sp.addAnimation("hover", { x: 336, y: 64 });
        this.sp.changeAnimation("normal");

        Card.list.push(this);
    }

    getSprite() {
        return this.sp;
    }

    static getCard(pName) {
        let cardToReturn = null;
        Card.list.forEach(c => {
            if (c.name + "" + c.type === pName) {
                cardToReturn = c;
            }
        });
        return cardToReturn;
    }

    static randomizer(pArr, pNumber) {
        let arr = [];
        for (let i = 0; i < pNumber; i++) {
            let rndNumber = rnd(0, pArr.length);
            if (arr.includes(pArr[rndNumber])) {
                i--;
            } else {
                arr.push(pArr[rndNumber]);
            }
        }
        return arr;
    }

    static check(pName, pType, pReceiverName, pReceiverType, pC123) {
        //? "A Spade"
        //? "col Spade void" || "void" || "c1 c2 etc. faceDown" || "2 Heart/Diamond"
        //? "K Heart"
        //? "col Heart" && "Q Heart" || "void" || "c1 c2 etc. faceDown"
        //? "10 Heart"
        //? "col Heart" && "9 Heart" || "void" || "c1 c2 etc. faceDown" || "J Spade/Club"
        let bOk = false;
        if (pReceiverName == "void") return true;

        if (pC123) { //? c1 c2 c3 etc.
            if (Card.checkType(pType, pReceiverType)) {
                switch(pName) {
                    case "K":
                        return false; break;
                    case "Q":
                        if (pReceiverName === "K") return true; break;
                    case "J":
                        if (pReceiverName === "Q") return true; break;
                    case "10":
                        if (pReceiverName === "J") return true; break;
                    case "A":
                        if (pReceiverName === "2") return true; break;
                    default: 
                        if (pReceiverName === (parseInt(pName)+1)+"") return true; break;
                }
            }
        } else { //? HSDC decks
            if (pType === pReceiverType) {
                switch(pName) {
                    case "K":
                        if (pReceiverName === "Q") return true; break;
                    case "Q":
                        if (pReceiverName === "J") return true; break;
                    case "J":
                        if (pReceiverName === "10") return true; break;
                    case "2":
                        if (pReceiverName === "A") return true; break;
                    case "A":
                        if (pReceiverName !== "A") return true; break;
                    default: 
                        if (pReceiverName === (parseInt(pName)-1)+"") return true; break;
                }
            }
        }
        return false;
    }
    static checkType(pType1, pType2) {
        switch(pType1) {
            case "♥":
            case "♦":
                return (pType2 === "♠" || pType2 === "♣");
                break;
            case "♠":
            case "♣":
                return (pType2 === "♥" || pType2 === "♦");
                break;
        }
    }

    infos() {
        return this.position + ": " + this.name + "" + this.type;
    }
    nameType() {
        return this.name + "" + this.type;
    }

    setStartPos(pStartPos) {
        this.startPos = {
            x: pStartPos.x,
            y: pStartPos.y
        };
    }

    setOriginPos(pPos) {
        this.originPos = {
            x: pPos.x,
            y: pPos.y
        };
    }

    setDestination(pDestination) {
        this.destination = {
            x: pDestination.x,
            y: pDestination.y
        };
    }

    setDirection(pDirection) {
        this.direction = pDirection;
    }

    setMovingType(pType) {
        this.movingType = pType;
    }

    setCanMove(pBool) {
        this.bCanMove = pBool;
    }

    setMoving(pBool) {
        if (this.bCanMove) {
            this.bMoving = pBool;
        }
    }

    setMovingSpeed(pValue) {
        this.movingSpeed = pValue;
    }

    
    setMoveCB(pCallback, pParam = "") {
        if (pCallback == null) {
            this.moveCB = null;
        } else if (Array.isArray(pCallback)) {
            this.moveCB = [];
            pCallback.forEach(c => {
                this.moveCB.push({
                    cb: c.cb,
                    arg: c.arg
                });
            });
        } else {
            this.moveCB = {
                cb: pCallback,
                arg: pParam
            }
        }
    }

    // setDestination({ x: 0, y: CANVAS_HEIGHT - 124 });
    // setCanMove(true);
    // setMovingSpeed(0.6);
    // setMoveCB(Input.activeKeyboardBtn.bind(this), "");

    static initCardList() {
        Card.CARD_LIST = [];
        if (mainState === MAIN_STATE.Game) {
            Card.CARD_LIST["A♥"] = {name: "A",type: "♥",x: 0, y: 128};
            Card.CARD_LIST["2♥"] = {name: "2",type: "♥",x: 48,y: 128};
            Card.CARD_LIST["3♥"] = {name: "3",type: "♥",x: 96,y: 128};
            Card.CARD_LIST["4♥"] = {name: "4",type: "♥",x: 144,y: 128};
            Card.CARD_LIST["5♥"] = {name: "5",type: "♥",x: 192,y: 128};
            Card.CARD_LIST["6♥"] = {name: "6",type: "♥",x: 240,y: 128};
            Card.CARD_LIST["7♥"] = {name: "7",type: "♥",x: 288,y: 128};
            Card.CARD_LIST["8♥"] = {name: "8",type: "♥",x: 336,y: 128};
            Card.CARD_LIST["9♥"] = {name: "9",type: "♥",x: 384,y: 128};
            Card.CARD_LIST["10♥"] ={name: "10",type: "♥",x: 432,y: 128};
            Card.CARD_LIST["J♥"] = {name: "J",type: "♥",x: 480,y: 128};
            Card.CARD_LIST["Q♥"] = {name: "Q",type: "♥",x: 528,y: 128};
            Card.CARD_LIST["K♥"] = {name: "K",type: "♥",x: 576,y: 128};
            Card.CARD_LIST["A♠"] = {name: "A",type: "♠",x: 0, y: 192};
            Card.CARD_LIST["2♠"] = {name: "2",type: "♠",x: 48,y: 192};
            Card.CARD_LIST["3♠"] = {name: "3",type: "♠",x: 96,y: 192};
            Card.CARD_LIST["4♠"] = {name: "4",type: "♠",x: 144,y: 192};
            Card.CARD_LIST["5♠"] = {name: "5",type: "♠",x: 192,y: 192};
            Card.CARD_LIST["6♠"] = {name: "6",type: "♠",x: 240,y: 192};
            Card.CARD_LIST["7♠"] = {name: "7",type: "♠",x: 288,y: 192};
            Card.CARD_LIST["8♠"] = {name: "8",type: "♠",x: 336,y: 192};
            Card.CARD_LIST["9♠"] = {name: "9",type: "♠",x: 384,y: 192};
            Card.CARD_LIST["10♠"] ={name: "10",type: "♠",x: 432,y: 192};
            Card.CARD_LIST["J♠"] = {name: "J",type: "♠",x: 480,y: 192};
            Card.CARD_LIST["Q♠"] = {name: "Q",type: "♠",x: 528,y: 192};
            Card.CARD_LIST["K♠"] = {name: "K",type: "♠",x: 576,y: 192};
            Card.CARD_LIST["A♦"] = {name: "A",type: "♦",x: 0, y: 256};
            Card.CARD_LIST["2♦"] = {name: "2",type: "♦",x: 48,y: 256};
            Card.CARD_LIST["3♦"] = {name: "3",type: "♦",x: 96,y: 256};
            Card.CARD_LIST["4♦"] = {name: "4",type: "♦",x: 144,y: 256};
            Card.CARD_LIST["5♦"] = {name: "5",type: "♦",x: 192,y: 256};
            Card.CARD_LIST["6♦"] = {name: "6",type: "♦",x: 240,y: 256};
            Card.CARD_LIST["7♦"] = {name: "7",type: "♦",x: 288,y: 256};
            Card.CARD_LIST["8♦"] = {name: "8",type: "♦",x: 336,y: 256};
            Card.CARD_LIST["9♦"] = {name: "9",type: "♦",x: 384,y: 256};
            Card.CARD_LIST["10♦"] ={name: "10",type: "♦",x: 432,y: 256};
            Card.CARD_LIST["J♦"] = {name: "J",type: "♦",x: 480,y: 256};
            Card.CARD_LIST["Q♦"] = {name: "Q",type: "♦",x: 528,y: 256};
            Card.CARD_LIST["K♦"] = {name: "K",type: "♦",x: 576,y: 256};
            Card.CARD_LIST["A♣"] = {name: "A",type: "♣",x: 0, y: 320};
            Card.CARD_LIST["2♣"] = {name: "2",type: "♣",x: 48,y: 320};
            Card.CARD_LIST["3♣"] = {name: "3",type: "♣",x: 96,y: 320};
            Card.CARD_LIST["4♣"] = {name: "4",type: "♣",x: 144,y: 320};
            Card.CARD_LIST["5♣"] = {name: "5",type: "♣",x: 192,y: 320};
            Card.CARD_LIST["6♣"] = {name: "6",type: "♣",x: 240,y: 320};
            Card.CARD_LIST["7♣"] = {name: "7",type: "♣",x: 288,y: 320};
            Card.CARD_LIST["8♣"] = {name: "8",type: "♣",x: 336,y: 320};
            Card.CARD_LIST["9♣"] = {name: "9",type: "♣",x: 384,y: 320};
            Card.CARD_LIST["10♣"] ={name: "10",type: "♣",x: 432,y: 320};
            Card.CARD_LIST["J♣"] = {name: "J",type: "♣",x: 480,y: 320};
            Card.CARD_LIST["Q♣"] = {name: "Q",type: "♣",x: 528,y: 320};
            Card.CARD_LIST["K♣"] = {name: "K",type: "♣",x: 576,y: 320};
            
            let x = 2;
            let xOffset = 54;
            let yFromTop = 30
            
            let test = ["deck","deck2","♥","♠","♦","♣",
                "c1","c2","c3","c4","c5","c6","c7",
            ]; // 13 14 15 16 17 18 19
            
            Card.POSITIONS["deck"] = {x: x, y: yFromTop, type: 0}; x += xOffset;
            Card.POSITIONS["deck2"] = {x: x, y: yFromTop, type: 1}; x += xOffset; x += xOffset;
            Card.POSITIONS["♥"] = {x: x, y: yFromTop, type: 2}; x += xOffset;
            Card.POSITIONS["♠"] = {x: x, y: yFromTop, type: 3}; x += xOffset;
            Card.POSITIONS["♦"] = {x: x, y: yFromTop, type: 4}; x += xOffset;
            Card.POSITIONS["♣"] = {x: x, y: yFromTop, type: 5};
            x = 2;
            yFromTop = 30+64+10;
            // yOffset = 9;
            //6 =>
            let type = 6 //? 0: deck; 1: deck2; 2:heart etc.
            for (let i = 6; i < 13; i++) {
                Card.POSITIONS[Card.POSITION_LIST[i]] = {x: x, y: yFromTop, type: type};
                type++;
                x += xOffset;
            }

        } else { //? PixelMode

            Card.CARD_LIST["A♥"] = {name: "A",type: "♥",x: 0, y: 416};
            Card.CARD_LIST["2♥"] = {name: "2",type: "♥",x: 24,y: 416};
            Card.CARD_LIST["3♥"] = {name: "3",type: "♥",x: 48,y: 416};
            Card.CARD_LIST["4♥"] = {name: "4",type: "♥",x: 72,y: 416};
            Card.CARD_LIST["5♥"] = {name: "5",type: "♥",x: 96,y: 416};
            Card.CARD_LIST["6♥"] = {name: "6",type: "♥",x: 120,y: 416};
            Card.CARD_LIST["7♥"] = {name: "7",type: "♥",x: 144,y: 416};
            Card.CARD_LIST["8♥"] = {name: "8",type: "♥",x: 168,y: 416};
            Card.CARD_LIST["9♥"] = {name: "9",type: "♥",x: 192,y: 416};
            Card.CARD_LIST["10♥"] ={name: "10",type: "♥",x: 216,y: 416};
            Card.CARD_LIST["J♥"] = {name: "J",type: "♥",x: 240,y: 416};
            Card.CARD_LIST["Q♥"] = {name: "Q",type: "♥",x: 264,y: 416};
            Card.CARD_LIST["K♥"] = {name: "K",type: "♥",x: 288,y: 416};
            Card.CARD_LIST["A♠"] = {name: "A",type: "♠",x: 0, y: 448};
            Card.CARD_LIST["2♠"] = {name: "2",type: "♠",x: 24,y: 448};
            Card.CARD_LIST["3♠"] = {name: "3",type: "♠",x: 48,y: 448};
            Card.CARD_LIST["4♠"] = {name: "4",type: "♠",x: 72,y: 448};
            Card.CARD_LIST["5♠"] = {name: "5",type: "♠",x: 96,y: 448};
            Card.CARD_LIST["6♠"] = {name: "6",type: "♠",x: 120,y: 448};
            Card.CARD_LIST["7♠"] = {name: "7",type: "♠",x: 144,y: 448};
            Card.CARD_LIST["8♠"] = {name: "8",type: "♠",x: 168,y: 448};
            Card.CARD_LIST["9♠"] = {name: "9",type: "♠",x: 192,y: 448};
            Card.CARD_LIST["10♠"] ={name: "10",type: "♠",x: 216,y: 448};
            Card.CARD_LIST["J♠"] = {name: "J",type: "♠",x: 240,y: 448};
            Card.CARD_LIST["Q♠"] = {name: "Q",type: "♠",x: 264,y: 448};
            Card.CARD_LIST["K♠"] = {name: "K",type: "♠",x: 288,y: 448};
            Card.CARD_LIST["A♦"] = {name: "A",type: "♦",x: 0, y: 480};
            Card.CARD_LIST["2♦"] = {name: "2",type: "♦",x: 24,y: 480};
            Card.CARD_LIST["3♦"] = {name: "3",type: "♦",x: 48,y: 480};
            Card.CARD_LIST["4♦"] = {name: "4",type: "♦",x: 72,y: 480};
            Card.CARD_LIST["5♦"] = {name: "5",type: "♦",x: 96,y: 480};
            Card.CARD_LIST["6♦"] = {name: "6",type: "♦",x: 120,y: 480};
            Card.CARD_LIST["7♦"] = {name: "7",type: "♦",x: 144,y: 480};
            Card.CARD_LIST["8♦"] = {name: "8",type: "♦",x: 168,y: 480};
            Card.CARD_LIST["9♦"] = {name: "9",type: "♦",x: 192,y: 480};
            Card.CARD_LIST["10♦"] ={name: "10",type: "♦",x: 216,y: 480};
            Card.CARD_LIST["J♦"] = {name: "J",type: "♦",x: 240,y: 480};
            Card.CARD_LIST["Q♦"] = {name: "Q",type: "♦",x: 264,y: 480};
            Card.CARD_LIST["K♦"] = {name: "K",type: "♦",x: 288,y: 480};
            Card.CARD_LIST["A♣"] = {name: "A",type: "♣",x: 0, y: 512};
            Card.CARD_LIST["2♣"] = {name: "2",type: "♣",x: 24,y: 512};
            Card.CARD_LIST["3♣"] = {name: "3",type: "♣",x: 48,y: 512};
            Card.CARD_LIST["4♣"] = {name: "4",type: "♣",x: 72,y: 512};
            Card.CARD_LIST["5♣"] = {name: "5",type: "♣",x: 96,y: 512};
            Card.CARD_LIST["6♣"] = {name: "6",type: "♣",x: 120,y: 512};
            Card.CARD_LIST["7♣"] = {name: "7",type: "♣",x: 144,y: 512};
            Card.CARD_LIST["8♣"] = {name: "8",type: "♣",x: 168,y: 512};
            Card.CARD_LIST["9♣"] = {name: "9",type: "♣",x: 192,y: 512};
            Card.CARD_LIST["10♣"] ={name: "10",type: "♣",x: 216,y: 512};
            Card.CARD_LIST["J♣"] = {name: "J",type: "♣",x: 240,y: 512};
            Card.CARD_LIST["Q♣"] = {name: "Q",type: "♣",x: 264,y: 512};
            Card.CARD_LIST["K♣"] = {name: "K",type: "♣",x: 288,y: 512};
            
            let x = 1;
            let xOffset = 27;
            let yFromTop = 30;
            
            let test = ["deck","deck2","♥","♠","♦","♣",
                "c1","c2","c3","c4","c5","c6","c7",
            ]; // 13 14 15 16 17 18 19
            
            Card.POSITIONS["deck"] = {x: x, y: yFromTop, type: 0}; x += xOffset;
            Card.POSITIONS["deck2"] = {x: x, y: yFromTop, type: 1}; x += xOffset; x += xOffset;
            Card.POSITIONS["♥"] = {x: x, y: yFromTop, type: 2}; x += xOffset;
            Card.POSITIONS["♠"] = {x: x, y: yFromTop, type: 3}; x += xOffset;
            Card.POSITIONS["♦"] = {x: x, y: yFromTop, type: 4}; x += xOffset;
            Card.POSITIONS["♣"] = {x: x, y: yFromTop, type: 5};
            x = 1;
            yFromTop = Card.COL_OFFSET; //? 68
            let type = 6 //? 0: deck; 1: deck2; 2:heart etc.
            for (let i = 6; i < 13; i++) {
                Card.POSITIONS[Card.POSITION_LIST[i]] = {x: x, y: yFromTop, type: type};
                type++;
                x += xOffset;
            }
            console.log(Card.POSITIONS);
        }
    }

    update(dt) {
        // log("card update");
        if (this.bMoving) {
            // log("moving !! : " + this.infos());

            if (this.speedCount <= this.movingSpeed) {
                // log("speedcount < moving speed")

                // this.x = easeOutSin(this.speedCount, this.startPos.x, this.destination.x - this.startPos.x, this.movingSpeed);
                // this.y = easeOutSin(this.speedCount, this.startPos.y, this.destination.y - this.startPos.y, this.movingSpeed);
                if (this.arriveDir) {
                    this.x = this.tweeningArrive(this.speedCount, this.startPos.x, this.destination.x - this.startPos.x, this.movingSpeed);
                    this.y = this.tweeningArrive(this.speedCount, this.startPos.y, this.destination.y - this.startPos.y, this.movingSpeed);
                } else {
                    this.x = this.tweeningArrive(this.speedCount, this.startPos.x, this.destination.x - this.startPos.x, this.movingSpeed);
                    this.y = this.tweeningArrive(this.speedCount, this.startPos.y, this.destination.y - this.startPos.y, this.movingSpeed);
                }

                this.speedCount += dt;

            }

        }
    }
}


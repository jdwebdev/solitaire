class Input {
    static MOUSE_MOVE = true;
    static MOUSE_WHEEL = false;
    static MOUSE_DOWN = true;
    static MOUSE_CLICK = true;
    static KEYBOARD_KEYDOWN = false;
    static KEYBOARD_KEYUP = false;
    static CONTEXT_MENU = true;
    static DOUBLE_CLICK = true;

    static bDownKey = false;
    static bUpKey = false;
    static bEnterKey = false;
    static bIsKeyDown = false;

    static passwordTimer = null;

    static bKeyboardClose = true;
    static bKeyboardActive = false; //? Général
    static keyboardSpriteList = [];
    static keyboardList = [];

    static LC_alphabet = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"];
    static UC_alphabet = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M"];
    static num = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    static bCaps = true;

    constructor() { }

    static init() {


        this.keyboardPanel = new Panel({ w: 450, h: 124, v: 6 }, 0, 300, null, "", null, "", 8);
        this.keyboardPanel.setDestination({ x: 0, y: CANVAS_HEIGHT - 124 });
        this.keyboardPanel.setCanMove(true);
        this.keyboardPanel.setMovingSpeed(0.6);
        this.keyboardPanel.setMoveCB(Input.activeKeyboardBtn.bind(this), "");
        Input.keyboardSpriteList.push(this.keyboardPanel.getSprite());

        this.keyboardSprite = new Sprite({ w: 33, h: 24 }, 10, 8, this.keyboardPanel);
        this.keyboardSprite.addAnimation("normal", { x: 931, y: 90 });
        this.keyboardSprite.addAnimation("nope", { x: 964, y: 90 }, 4, 0.4, false);
        this.keyboardSprite.setAnimationCB("nope", { cb: Input.hideCloseKeyboardMessage.bind(this), arg: "" });
        this.keyboardSprite.changeAnimation("normal");
        Input.keyboardSpriteList.push(this.keyboardSprite);

        this.keyboardInstructionPanel = new Panel({ w: 150, h: 20 }, 50, 5, this.keyboardPanel, "", null, "keyboard_instruction", 0, true);
        this.keyboardInstructionPanel.getSprite().addAnimation("normal", { x: 352, y: 208 }); //? Espace vide dans la sprite sheet
        this.keyboardInstructionPanel.getSprite().changeAnimation("normal");
        this.keyboardInstructionPanel.setFontColor(GREY_162_COLOR, RED_COLOR);
        this.keyboardInstructionPanel.setAlpha(0);
        this.keyboardInstructionPanel.setAlignText(0);
        Input.keyboardSpriteList.push(this.keyboardInstructionPanel.getSprite());

        let originX = centerX(91, 1, 1);
        let originY = CANVAS_HEIGHT - 36;
        let originDestinationX = originX;
        let originDestinationY = CANVAS_HEIGHT - 26;

        this.virtualKeyboardMessage = new Panel({ w: 91, h: 18 }, originX, originY, null, "", null, "virtual_keyboard", 0, true);
        this.virtualKeyboardMessage.getSprite().addAnimation("normal", { x: 862, y: 72 });
        this.virtualKeyboardMessage.getSprite().changeAnimation("normal");
        this.virtualKeyboardMessage.setFontColor(TEST_BTN_HVR_COLOR);
        this.virtualKeyboardMessage.setAlignText(1);
        this.virtualKeyboardMessage.setTextOverflow(true);
        this.virtualKeyboardMessage.setOffsets(5, 10);
        this.virtualKeyboardMessage.setMovingType(Panel.MOVING_TYPE.ComeAndGo);
        this.virtualKeyboardMessage.setOriginPos({ x: originX, y: originY });
        this.virtualKeyboardMessage.setOriginDestination({ x: originDestinationX, y: originDestinationY });
        this.virtualKeyboardMessage.beginMoving({ x: originDestinationX, y: originDestinationY }, 1);
        Input.keyboardSpriteList.push(this.virtualKeyboardMessage.getSprite());

        let capsBtn = new KeyboardBtn({ w: 44, h: 22 }, 200, 10, this.keyboardPanel, Input.caps, "", null, "", 0, true);
        capsBtn.setAnimations({ x: 560, y: 144 });
        Input.keyboardSpriteList.push(capsBtn.getSprite());
        Input.keyboardList.push(capsBtn);

        let delBtn = new KeyboardBtn({ w: 42, h: 22 }, 251, 10, this.keyboardPanel, { cb: Input.handleKeyboardClick, arg: -1 }, "", null, "", 0, true);
        delBtn.setAnimations({ x: 560, y: 166 });
        Input.keyboardSpriteList.push(delBtn.getSprite());
        Input.keyboardList.push(delBtn);

        let leftBtn = new KeyboardBtn({ w: 23, h: 22 }, 278, 90, this.keyboardPanel, { cb: Input.moveCursor, arg: false }, "", null, "", 0, true);
        leftBtn.setAnimations({ x: 692, y: 144 });
        Input.keyboardSpriteList.push(leftBtn.getSprite());
        Input.keyboardList.push(leftBtn);

        let rightBtn = new KeyboardBtn({ w: 23, h: 22 }, 330, 90, this.keyboardPanel, { cb: Input.moveCursor, arg: true }, "", null, "", 0, true);
        rightBtn.setAnimations({ x: 692, y: 166 });
        Input.keyboardSpriteList.push(rightBtn.getSprite());
        Input.keyboardList.push(rightBtn);

        let upBtn = new KeyboardBtn({ w: 23, h: 22 }, 304, 65, this.keyboardPanel, { cb: Input.changeFocus, arg: false }, "", null, "", 0, true);
        upBtn.setAnimations({ x: 761, y: 144 });
        Input.keyboardSpriteList.push(upBtn.getSprite());
        Input.keyboardList.push(upBtn);

        let downBtn = new KeyboardBtn({ w: 23, h: 22 }, 304, 90, this.keyboardPanel, { cb: Input.changeFocus, arg: true }, "", null, "", 0, true);
        downBtn.setAnimations({ x: 761, y: 166 });
        Input.keyboardSpriteList.push(downBtn.getSprite());
        Input.keyboardList.push(downBtn);

        let nextBtn = new KeyboardBtn({ w: 29, h: 27 }, 302, 20, this.keyboardPanel, { cb: Input.changeFocus, arg: true }, "", null, "", 0, true);
        nextBtn.setAnimations({ x: 832, y: 144 });
        Input.keyboardSpriteList.push(nextBtn.getSprite());
        Input.keyboardList.push(nextBtn);

        this.openKeyboardBtn = new Button({ w: 51, h: 8 }, centerXElement(this.keyboardPanel, 51), -8, this.keyboardPanel, Input.openKeyboard.bind(this), "", null, "", 0, true);
        this.openKeyboardBtn.setAnimations({ x: 626, y: 120 });
        this.openKeyboardBtn.setIdTest("key");
        Input.keyboardSpriteList.push(this.openKeyboardBtn.getSprite());
        Input.keyboardList.push(this.openKeyboardBtn);

        originX = 45;
        originY = 40;
        let x = originX;
        let y = originY;

        for (let i = 0; i < 26; i++) {
            if (i == 10) {
                x = originX + 11;
                y += 25;
            } else if (i == 19) {
                x = originX + 36;
                y += 25;
            }

            let alphabetBtn = new KeyboardBtn({ w: 23, h: 22 }, x, y, this.keyboardPanel, { cb: Input.handleKeyboardClick, arg: i }, "", null, "alpha_" + Input.LC_alphabet[i], 0, true);
            alphabetBtn.setAnimations({ x: 862, y: 92 });
            alphabetBtn.setFontColor(RED_BTN_SDW_COLOR);
            alphabetBtn.setOffsets(-1, 13);
            alphabetBtn.setTextCase("all");
            Input.keyboardSpriteList.push(alphabetBtn.getSprite());
            Input.keyboardList.push(alphabetBtn);

            x += 25;
        }

        originX = 406;
        x = originX;
        y = 15;

        for (let i = 9; i >= 0; i--) {

            if (i == 6 || i == 3) {
                x = originX;
                y += 25;
            }
            if (i == 0) {
                x = originX - 25;
                y += 25;
            }

            let numBtn = new KeyboardBtn({ w: 23, h: 22 }, x, y, this.keyboardPanel, { cb: Input.handleKeyboardClick, arg: "num_" + i }, "", null, "num_" + i, 0, true);
            numBtn.setAnimations({ x: 862, y: 92 });
            numBtn.setFontColor(RED_BTN_SDW_COLOR);
            numBtn.setOffsets(-1, 13);
            Input.keyboardSpriteList.push(numBtn.getSprite());
            Input.keyboardList.push(numBtn);

            x -= 25;
        }

        Input.keyboardList.forEach(b => {
            b.setState(Button.STATE.Inactive);
        });
    }

    static resetKeyboardPosition() {
        Input.bKeyboardClose = true;
        this.keyboardPanel.x = this.keyboardPanel.startPos.x;
        this.keyboardPanel.y = this.keyboardPanel.startPos.y;
        this.keyboardPanel.children.forEach(c => {
            c.updatePosition();
        });

        this.keyboardList.forEach(b => {
            b.setState(Button.STATE.Inactive);
        });

        this.openKeyboardBtn.setAnimations({ x: 626, y: 120 });
        this.openKeyboardBtn.setState(Button.STATE.Normal);
        this.openKeyboardBtn.getSprite().changeAnimation("Normal");

        this.keyboardSprite.changeAnimation("normal");
        this.keyboardInstructionPanel.setAlpha(0);

    }

    //?! Handle l'insertion d'un char dans les EntryField
    static handleEntryField(pKey) {
        EntryField.currentList.every(e => {
            if (e.getState() == EntryField.STATE.Focus) {
                if (pKey === -1) { //? Remove
                    if (e.label != "" && e.sp.cursor.offX != e.cursorPosXOrigin) {
                        Sound.play("typingdelete");
                        if (e.sp.cursor.offX == e.cursorPosXOrigin + (e.label.length * 5)) { //? Si le cursor est à la fin du label
                            e.label = e.label.slice(0, e.label.length - 1);
                            e.sp.cursor.offX -= 5;
                        } else {
                            let char = (e.sp.cursor.offX - e.cursorPosXOrigin) / 5;
                            if (char == 1) {
                                e.label = e.label.substring(1, e.label.length);
                                e.sp.cursor.offX = e.cursorPosXOrigin;
                            } else {
                                e.label = e.label.substring(0, char - 1) + e.label.substring(char, e.label.length);
                                e.sp.cursor.offX -= 5;
                            }
                        }
                        e.sp.cursor.changeAnimation("normal");
                    }
                } else { //? Add new char

                    if (e.label.length < 20) {
                        Sound.play("typing");
                        if (e.sp.cursor.offX == e.cursorPosXOrigin + (e.label.length * 5)) { //? Si le cursor est à la fin du label                    
                            e.label += pKey;
                            e.sp.cursor.offX += 5;
                        } else {
                            let char = (e.sp.cursor.offX - e.cursorPosXOrigin) / 5;
                            if (e.sp.cursor.offX == e.cursorPosXOrigin) {
                                e.label = pKey + e.label;
                                e.sp.cursor.offX += 5;
                            } else {
                                e.label = e.label.slice(0, char) + pKey + e.label.slice(char, e.label.length);
                                e.sp.cursor.offX += 5;
                            }
                        }
                    }
                    e.sp.cursor.changeAnimation("normal");
                }
                return false;
            }
            return true;
        });
    }

    //? Right/Left
    static moveCursor(pRight) {
        Sound.play("entry");
        EntryField.currentList.forEach(e => {
            if (e.getState() == EntryField.STATE.Focus) {
                if (pRight) {
                    e.sp.cursor.offX += 5;
                    if (e.sp.cursor.offX > e.cursorPosXOrigin + (e.label.length * 5)) {
                        e.sp.cursor.offX = e.cursorPosXOrigin + (e.label.length * 5);
                    }
                } else {
                    e.sp.cursor.offX -= 5;
                    if (e.sp.cursor.offX < e.cursorPosXOrigin) {
                        e.sp.cursor.offX = e.cursorPosXOrigin;
                    }
                }
                e.sp.cursor.changeAnimation("normal");
            }
        });
    }

    //? Next, Up/Down, Tab physic key
    static changeFocus(pDown) {
        let newIndex = -1;
        let oldIndex = -1;
        EntryField.currentList.forEach((e, index) => {
            if (e.getState() == EntryField.STATE.Focus) {
                oldIndex = index
                if (pDown) {
                    if (index < EntryField.currentList.length - 1) {
                        newIndex = index + 1
                    } else {
                        newIndex = 0;
                    }
                } else {
                    if (index > 0) {
                        newIndex = index - 1;
                    } else {
                        newIndex = EntryField.currentList.length - 1;
                    }
                }
            }
        });

        if (newIndex != -1 && oldIndex != -1) {

            EntryField.currentList[newIndex].setState(EntryField.STATE.Focus);
            EntryField.currentList[newIndex].changeSpriteAnimation("focus");
            // Sound.list["entry"].audioPlay();
            Sound.play("entry");
            EntryField.currentList[newIndex].textOffsetX = EntryField.currentList[newIndex].textOffsetXFocus;
            EntryField.currentList[newIndex].textOffsetY = EntryField.currentList[newIndex].textOffsetYFocus;
            EntryField.currentList[newIndex].sp.cursor.changeAnimation("normal");
            EntryField.currentList[newIndex].sp.cursor.offX = EntryField.currentList[newIndex].cursorPosXOrigin + EntryField.currentList[newIndex].label.length * 5

            //! En dur
            if (EntryField.currentList[oldIndex].focusCB) {
                if (newIndex == 0) { //! Index en dur
                    Login.bTooltipIncluded = false;
                    EntryField.currentList[oldIndex].getTooltip().forEach(sp => {
                        if (sp instanceof Sprite) {
                            sp.delete = true;
                            sp.currentFrame = 0;
                        } else {
                            sp.getSprite().delete = true;
                        }
                    })
                }
            }

            if (EntryField.currentList[newIndex].focusCB) {
                EntryField.currentList[newIndex].focusCB.cb(EntryField.currentList[newIndex].focusCB.arg);
            }

            EntryField.currentList[oldIndex].setState(EntryField.STATE.Normal);
            EntryField.currentList[oldIndex].changeSpriteAnimation("normal");
            EntryField.currentList[oldIndex].sp.cursor.changeAnimation("none");
            EntryField.currentList[oldIndex].textOffsetX = EntryField.currentList[oldIndex].textOffsetXOrigin;
            EntryField.currentList[oldIndex].textOffsetY = EntryField.currentList[oldIndex].textOffsetYOrigin;
        }


    }

    static showPassword() {
        Input.passwordTimer = new Timer(2, Input.hidePassword)
        EntryField.currentList.forEach(e => {
            if (e.bPasswordField) {
                e.setPassword(false);
            }
        });
    }

    static hidePassword() {
        Input.passwordTimer = null;
        EntryField.currentList.forEach(e => {
            if (e.bPasswordField) {
                e.setPassword(true);
            }
        });
    }

    static caps() {
        Sound.play("entry");
        Input.bCaps = !Input.bCaps;
        Input.keyboardList.forEach(b => {
            if (Input.bCaps) {
                b.setTextCase("all");
            } else {
                b.setTextCase("normal");
            }
        });
    }

    //? Mouse click on virtual keyboard keys (A-Z, 0-9, DEL)
    static handleKeyboardClick(pIndex) {
        if (pIndex == -1) { //? Del
            Input.handleEntryField(pIndex);
        } else if (typeof pIndex == "string") { //? "num_" + index
            Input.handleEntryField(pIndex.split("_")[1]);
        } else { //? Normal 
            if (Input.bCaps) {
                Input.handleEntryField(Input.UC_alphabet[pIndex]);
            } else {
                Input.handleEntryField(Input.LC_alphabet[pIndex]);
            }
        }
    }

    static openKeyboard() {
        if (!Input.bKeyboardClose) { //? Close
            this.keyboardPanel.startPos.x = this.keyboardPanel.x;
            this.keyboardPanel.startPos.y = this.keyboardPanel.y;
            this.keyboardPanel.setDestination({ x: 0, y: CANVAS_HEIGHT });
            this.keyboardPanel.setMoving(true);
            Input.bKeyboardClose = true;
            Sound.play("keyboard2");

            this.openKeyboardBtn.setAnimations({ x: 626, y: 120 });
            this.openKeyboardBtn.setState(Button.STATE.Inactive);
            this.openKeyboardBtn.getSprite().changeAnimation("Normal");
            Input.keyboardList.forEach(b => {
                b.setState(Button.STATE.Inactive);
            });
        } else { //? Open
            this.keyboardPanel.startPos.x = this.keyboardPanel.x;
            this.keyboardPanel.startPos.y = this.keyboardPanel.y;
            this.keyboardPanel.setDestination({ x: 0, y: CANVAS_HEIGHT - 124 });
            this.keyboardPanel.setMoving(true);
            Input.bKeyboardClose = false;
            Sound.play("keyboard");

            this.openKeyboardBtn.setAnimations({ x: 626, y: 129 });
            this.openKeyboardBtn.setState(Button.STATE.Inactive);
            this.openKeyboardBtn.getSprite().changeAnimation("Normal");

            this.virtualKeyboardMessage.setAlpha(0);
            this.virtualKeyboardMessage.bMoving = false;
        }

    }

    static activeKeyboardBtn() {
        this.openKeyboardBtn.setState(Button.STATE.Normal);
        if (!Input.bKeyboardClose) {
            Input.keyboardList.forEach(b => {
                b.setState(Button.STATE.Normal);

                if (CollisionManager.MouseCollision(MOUSE_SPRITE.x, MOUSE_SPRITE.y, b.x, b.y, b.getSize().w, b.getSize().h)) {
                    b.setState(Button.STATE.Hover);
                    b.changeSpriteAnimation("hover");
                    MOUSE_SPRITE.changeAnimation("hover");
                }
            });
        } else {
            Input.resetVirtualKeyboardMessage();

            //? Dernière fermeture avant de passer au splashscreen :
            if (Login.bConnectionSucceed) {
                Input.setKeyboardActive(false);
            }
        }
    }

    static resetVirtualKeyboardMessage() {
        this.virtualKeyboardMessage.setStartPos({ x: this.virtualKeyboardMessage.originPos.x, y: this.virtualKeyboardMessage.originPos.y })
        this.virtualKeyboardMessage.resetPosition();
        this.virtualKeyboardMessage.setDirection(1);
        this.virtualKeyboardMessage.beginMoving({ x: this.virtualKeyboardMessage.originDestination.x, y: this.virtualKeyboardMessage.originDestination.y }, 1);
    }

    static setKeyboardActive(pBool = true) {
        Input.bKeyboardActive = pBool;
    }

    static hideCloseKeyboardMessage() {
        this.keyboardSprite.changeAnimation("normal");
        this.keyboardInstructionPanel.setAlpha(0);
    }

    static update(dt) {

        if (this.keyboardPanel.bMoving) {
            this.keyboardPanel.update(dt);
        }
        if (this.virtualKeyboardMessage.bMoving) {
            this.virtualKeyboardMessage.update(dt);
        }
        // this.keyboardInstructionPanel.update(dt);
        if (Input.passwordTimer != null) Input.passwordTimer.update(dt);
        Sprite.manageBeforeUpdating(Input.keyboardSpriteList, dt);
    }

}

document.addEventListener("fullscreenchange", e => {
    if (FULLSCREEN) {
        FULLSCREEN = false;
        FULLSCREEN_BTN.setAnimations({x: 1344, y: 32});
    } else {
        FULLSCREEN = true;
        FULLSCREEN_BTN.setAnimations({x: 1344, y: 54});
    }
});

// Key event
if (Input.KEYBOARD_KEYDOWN) {
    document.addEventListener("keydown", keyDown, false);
}
if (Input.KEYBOARD_KEYUP) {
    document.addEventListener("keyup", keyUp, false);
}

function keyDown(k) {

    k.preventDefault();

    if (Input.bKeyboardActive && !Input.bIsKeyDown && k.key != "Shift" && !Login.bLoading) {
        // Input.bIsKeyDown = true;

        if (!Input.bKeyboardClose) {
            Input.keyboardSprite.changeAnimation("nope");
            Input.keyboardInstructionPanel.setAlpha(1);
        } else {
            if (Input.LC_alphabet.includes(k.key) || Input.UC_alphabet.includes(k.key) || Input.num.includes(k.key)) {
                Input.handleEntryField(k.key);
            } else if (k.key == "Backspace") {
                Input.handleEntryField(-1);
            } else if (k.key.slice(0, 5) == "Arrow") {
                switch (k.key.slice(5)) {
                    case "Left":
                        Input.moveCursor(false);
                        break;
                    case "Right":
                        Input.moveCursor(true);
                        break;
                    case "Up":
                        Input.changeFocus(false);
                        Input.bIsKeyDown = true;
                        break;
                    case "Down":
                        Input.changeFocus(true);
                        Input.bIsKeyDown = true;
                        break;
                }
            } else if (k.key == "Enter") {
                if (Login.currentState == Login.STATE.Login && Login.loginSubmitBtn.getState() == Button.STATE.Normal) {
                    Login.handleSubmit();
                } else if (Login.currentState == Login.STATE.Signup && Login.submitBtn.getState() == Button.STATE.Normal) {
                    Login.handleSubmit();
                } else {
                    Input.changeFocus(true);
                    Input.bIsKeyDown = true;
                }
            } else if (k.key == "Tab") {
                if (k.shiftKey) {
                    Input.changeFocus(false);
                } else {
                    Input.changeFocus(true);
                }
                Input.bIsKeyDown = true;
            }
            /*
                ! A
                key: 'a'
                code: 'KeyQ'
                q -> KeyA
                w -> KeyZ
                z -> KeyW
                , -> KeyM
                m -> Semicolon

                ! Backspace
                key: 'Backspace'
                code: 'Backspace'

                ! Left / Right / Up / Down
                key: 'ArrowLeft' / ...
                code: 'ArrowLeft' / ...

                ! Enter / NumpadEnter
                key: 'Enter' / 'Enter'
                code: 'Enter' / 'NumpadEnter'

                ! Tab
                key: 'Tab'
                code: 'Tab'
                shiftKey : true / false
            */

        }
    }
}

function keyUp(k) {
    k.preventDefault();

    if (Input.bIsKeyDown) {
        Input.bIsKeyDown = false;
    }

    /**
     * DEBUG
     */
    if (k.code == "KeyQ") {} //? A 

    if (k.code == "KeyE") {}

    if (k.code == "Enter") {
        
    }
    if (k.code == "KeyQ") {
        FRAME_BY_FRAME = !FRAME_BY_FRAME;
    }

    if (k.code == "Space") {
        debug_STOP = !debug_STOP;
        FRAME_BY_FRAME = debug_STOP;
        if (!debug_STOP) requestAnimationFrame(run);

        // console.log(" --- MainMenu.randomKanaSpriteList : --- ");
        // console.table(MainMenu.randomKanaSpriteList);

        // console.log(" --- Sprite.list : --- ");
        // console.table(Sprite.list);
        // console.log(" --- MainMenu.mainList : --- ");
        // console.table(MainMenu.mainList);
        // console.log(" --- MainMenu.optionsList : --- ");
        // console.table(MainMenu.optionsList);
        // console.log(" --- MainMenu.creditsList : --- ");
        // console.table(MainMenu.creditsList);
        // console.log(" --- Button.list : --- ");
        // console.table(Button.list);
        // console.log(" --- Button.currentList : --- ");
        // console.table(Button.currentList);
        // console.log(" --- Panel.currentList : --- ");
        // console.table(Panel.currentList);
        // console.log(" --- Sprite.kanaList : --- ");
        // console.table(Sprite.kanaList);
    }

    // ------------------- END DEBUG
}

function pick(x, y) {
    let pixel = ctx.getImageData(x, y, 1, 1);
    let data = pixel.data;
}

//!  _______       _______  _______           _______ 
//! (       )     (       )(  ___  )|\     /|(  ____ \
//! | () () |     | () () || (   ) || )   ( || (    \/
//! | || || |     | || || || |   | || |   | || (__    
//! | |(_)| |     | |(_)| || |   | |( (   ) )|  __)   
//! | |   | |     | |   | || |   | | \ \_/ / | (      
//! | )   ( | _   | )   ( || (___) |  \   /  | (____/\
//! |/     \|(_)  |/     \|(_______)   \_/   (_______/
if (Input.MOUSE_MOVE) {
    canvas2.addEventListener("mousemove", e => {
        if (Game.currentState === Game.STATE.Ending || PixelMode.currentState === PixelMode.STATE.Ending) {
            const mouseX = e.layerX / SCALE_X;
            const mouseY = e.layerY / SCALE_Y;    
            MOUSE_SPRITE.x = mouseX;
            MOUSE_SPRITE.y = mouseY;
    
            Button.currentList.forEach(b => {
                if (b.getState() != Button.STATE.Inactive && !b.bMoving) {
                    if (CollisionManager.MouseCollision(mouseX, mouseY, b.getPosition().x, b.getPosition().y, b.getSize().w, b.getSize().h)) {
                        if ((b.getSprite().tl != undefined && b.getSprite().tl.currentAnimation.name != "down") || // not staticSize
                            (b.getSprite().tl == undefined && b.getSprite().currentAnimation.name != "down")) {    // staticSize
    
                            if (b.getState() != Button.STATE.Hover) {
                                if (b.hoverCB) {
                                    b.hoverCB.cb(b.hoverCB.arg);
                                }
    
                                // Sound.play("hover");
                                if (b instanceof CheckboxBtn) {
                                    if (b.bChecked) {
                                        // b.setState(CheckboxBtn.STATE.Hover);
                                        // b.changeSpriteAnimation("c_hover");
                                        // MOUSE_SPRITE.changeAnimation("hover");
                                    } else {
                                        b.setState(CheckboxBtn.STATE.Hover);
                                        b.changeSpriteAnimation("hover");
                                        MOUSE_SPRITE.changeAnimation("hover");
                                    }
                                } else {
                                    b.setState(Button.STATE.Hover);
                                    b.changeSpriteAnimation("hover");
                                    MOUSE_SPRITE.changeAnimation("hover");
                                }
    
                                if (b.id_test == "V") {
                                    b.textOffsetX = b.textOffsetXHover;
                                    b.textOffsetY = b.textOffsetYHover;
                                    b.bTextOffsetChanged = true;
                                }
    
                            } else {
                                if (MOUSE_SPRITE.currentAnimation.name != "hover") {
                                    MOUSE_SPRITE.changeAnimation("hover");
                                }
                            }
                        }
                    } else { //? Mouse Moving and NO collision
                        if (b.getState() == Button.STATE.Hover) {
                            if (b.hoverCB) {
                                b.getTooltip().forEach(sp => {
                                    if (sp instanceof Sprite) {
                                        sp.delete = true;
                                        sp.currentFrame = 0;
                                    } else {
                                        sp.getSprite().delete = true;
                                    }
                                })
                                if (b.getHoverOffset()) {
                                    let func = translate.bind(b, { x: b.getHoverOffset().x, y: b.getHoverOffset().y }, true);
                                    func();
                                }
                            }
                            
                            if (b instanceof CheckboxBtn) {
                                if (b.bChecked) {
                                    b.setState(Button.STATE.Normal);
                                    b.changeSpriteAnimation("c_normal");
                                } else {
                                    b.setState(Button.STATE.Normal);
                                    b.changeSpriteAnimation("normal");
                                }
                            } else {
                                b.setState(Button.STATE.Normal);
                                b.changeSpriteAnimation("normal");
                            }
                            
                            MOUSE_SPRITE.changeAnimation("normal");
    
                        } else {
                            if (b.bTextOffsetChanged) b.resetOffsets();
                        }
                    }
                }
            });
        }
    })
    canvas.addEventListener("mousemove", e => {
    
        const mouseX = e.layerX / SCALE_X;
        const mouseY = e.layerY / SCALE_Y;
    
        MOUSE_SPRITE.x = mouseX;
        MOUSE_SPRITE.y = mouseY;
        
        if (!inTransition() && mainState != MAIN_STATE.Error) {
            // pick(e.layerX, e.layerY);
            if (mainState === MAIN_STATE.Game && !MENU) {
                let bCollideHSDC = false;
                // let bCollide = false;

                if (Card.selected !== null) {
                    if (Game.bDisplayOkPanel) {
                        if (CollisionManager.MouseCollision(mouseX, mouseY, Game.OK_PANEL.x, Game.OK_PANEL.y, Game.OK_PANEL.width, Game.OK_PANEL.height)) {
                        } else {
                            Game.bDisplayOkPanel = false;
                        }
                    }

                    //? CHECK HSDC
                    Game.HSDC_LIST.forEach(HSDC => {
                        if (CollisionManager.MouseCollision(mouseX, mouseY, HSDC.x, HSDC.y, HSDC.w, HSDC.h)) {
                            bCollideHSDC = true;
                            let name = "";
                            if (Game.lists[HSDC.type].length > 0) name = Game.getLastOf(HSDC.type).name;
                            if (Card.check(Card.selected.name, Card.selected.type, name, HSDC.type, false)) {
                                Game.OK_PANEL.x = HSDC.x;
                                Game.OK_PANEL.y = HSDC.y;
                                Game.bDisplayOkPanel = true;
                                Game.listToGoTo = HSDC.type;
                            }
                        }
                    });

                    if (!bCollideHSDC) {
                        Game.POS_LIST.forEach(POS => {
                            if (Game.lists[POS.list].length === 0) {
                                if (CollisionManager.MouseCollision(mouseX, mouseY, POS.x, POS.y, POS.w, POS.h)) {
                                    Game.OK_PANEL.x = POS.x;
                                    Game.OK_PANEL.y = POS.y;
                                    Game.bDisplayOkPanel = true;
                                    Game.listToGoTo = POS.list;
                                }
                            }
                        });
                    }
                } else { //? CHECK DECKs
                    if (CollisionManager.MouseCollision(mouseX, mouseY, Game.DECK.x, Game.DECK.y, Game.DECK.width, Game.DECK.height)) {
                        if (Game.lists["deck"].length > 0 || Game.lists["deck2"].length > 0) {
                            Game.bDeckHover = true;
                        }
                    } else {
                        Game.bDeckHover = false;
                    }
                    // bDeck2Hover
                    if (CollisionManager.MouseCollision(mouseX, mouseY, Game.DECK2.x, Game.DECK2.y, Game.DECK2.width, Game.DECK2.height)) {
                        if (Game.lists["deck2"].length > 0) {
                            Game.bDeck2Hover = true;
                        }
                    } else {
                        Game.bDeck2Hover = false;
                    }

                    //? CHECK HSDC
                    Game.HSDC_LIST.forEach(HSDC => {
                        if (CollisionManager.MouseCollision(mouseX, mouseY, HSDC.x, HSDC.y, HSDC.w, HSDC.h)) {
                            bCollideHSDC = true;
                            let name = "";
                            if (Game.lists[HSDC.type].length > 0) {
                                Game.getLastOf(HSDC.type).bHovering = true;
                            }
                        } else {
                            if (Game.lists[HSDC.type].length > 0) {
                                if (Game.getLastOf(HSDC.type).bHovering) {
                                    Game.getLastOf(HSDC.type).bHovering = false;
                                }
                            }
                        }
                    });

                }
                if (!CollisionManager.MouseCollision(mouseX, mouseY, Game.DECK2.x, Game.DECK2.y, Game.DECK2.width, Game.DECK2.height)) {
                    Game.bDeck2Hover = false;
                } else {
                }

                if (!bCollideHSDC) { //? Ce n'est plus la peine de chercher ici, si la collision se fait là haut
                    let bOneCollision = false; //? to check if there's at least one collision
                    let bAlreadyColliding = false;
                    Game.POS_LIST.forEach(pos => { //? Collision with c1 c2 etc.
                        for (let i = Game.lists[pos.list].length-1; i >=0; i--) {
                            if (Card.selected === null) {
                                let card = Game.lists[pos.list][i].getParent();
                                if (card.state === Card.STATE.Normal && !card.bSelect) {
                                    // if (card.position != "deck2") {
                                        if (!bAlreadyColliding && CollisionManager.MouseCollision(mouseX, mouseY, card.x, card.y, card.width, card.height)) {
                                            bOneCollision = true;
                                            bAlreadyColliding = true;
                                            card.bHovering = true
                                            if (i !== Game.lists[pos.list].length-1) {
                                                yomiText.element.innerHTML = "";
                                                Card.multiHover = true;
                                                Card.multiHoverPos = pos.list;
                                                for (let j = i+1; j <= Game.lists[pos.list].length-1; j++) {
                                                    Game.lists[pos.list][j].getParent().bHovering = true;
                                                    
                                                } 
                                            } else {
                                                Card.multiHover = false;
                                                Card.multiHoverPos = "";
                                            }
                                        } else {
                                            card.bHovering = false;
                                        }
                                    // }
                                } else if (card.state === Card.STATE.FaceDown) {
                                    if (card.name+card.type === Game.getLastOf(pos.list).name + Game.getLastOf(pos.list).type) {
                                        if (CollisionManager.MouseCollision(mouseX, mouseY, card.x, card.y, card.width, card.height)) {
                                            card.bHovering = true;
                                            bOneCollision = true;
                                        } else {
                                            card.bHovering = false;
                                        }
                                    }
                                }
                            }
                        }
                    })
                    if (!bOneCollision) {
                        Card.multiHover = false;
                        Card.multiHoverPos = "";
                        yomiText.element.innerHTML = "";
                    }

                    Card.list.forEach(c => {
                        if (Card.selected === null) {
    
                        } else { //? Card Selected !
                            
                            if (CollisionManager.MouseCollision(mouseX, mouseY, c.x, c.y, c.width, c.height)) {
                                if (c.position !== "deck" && c.position !== "deck2") {
                                    if (Game.lists[c.position].length > 0) {
                                        if (c.name === Game.getLastOf(c.position).name &&
                                            c.type === Game.getLastOf(c.position).type &&
                                            (Card.selected.name !== c.name || Card.selected.type !== c.type)) {
                                            
                                            if (Game.getLastOf(c.position).state === Card.STATE.FaceDown) {                                                
                                                Game.OK_PANEL.x = Game.getLastOf(c.position).x;
                                                Game.OK_PANEL.y = Game.getLastOf(c.position).y + 14;
                                                Game.bDisplayOkPanel = true;
                                                Game.listToGoTo = c.position;
                                            } else {
                                                let receiver = Game.getLastOf(c.position);
                                                if (Card.check(Card.selected.name, Card.selected.type, receiver.name, receiver.type, true)) {
                                                    Game.OK_PANEL.x = receiver.x;
                                                    Game.OK_PANEL.y = receiver.y+14;
                                                    Game.bDisplayOkPanel = true;
                                                    Game.listToGoTo = receiver.position;
                                                }
                                            }
                                        }
                                    } else { //? Void
                                        Game.OK_PANEL.x = Card.POSITIONS[c.position].x;
                                        Game.OK_PANEL.x = Card.POSITIONS[c.position].y;
                                        Game.bDisplayOkPanel = true;

                                    }
                                }
                            }
                            
                        }
                        
                    });
                }
            } else if (mainState === MAIN_STATE.PixelMode && !MENU) {
                let bCollideHSDC = false;
                // let bCollide = false;

                if (Card.selected !== null) {
                    if (PixelMode.bDisplayOkPanel) {
                        if (CollisionManager.MouseCollision(mouseX, mouseY, PixelMode.OK_PANEL.x, PixelMode.OK_PANEL.y, PixelMode.OK_PANEL.width, PixelMode.OK_PANEL.height)) {
                        } else {
                            PixelMode.bDisplayOkPanel = false;
                        }
                    }

                    //? CHECK HSDC
                    PixelMode.HSDC_LIST.forEach(HSDC => {
                        if (CollisionManager.MouseCollision(mouseX, mouseY, HSDC.x, HSDC.y, HSDC.w, HSDC.h)) {
                            bCollideHSDC = true;
                            let name = "";
                            if (PixelMode.lists[HSDC.type].length > 0) name = PixelMode.getLastOf(HSDC.type).name;
                            if (Card.check(Card.selected.name, Card.selected.type, name, HSDC.type, false)) {
                                PixelMode.OK_PANEL.x = HSDC.x;
                                PixelMode.OK_PANEL.y = HSDC.y;
                                PixelMode.bDisplayOkPanel = true;
                                PixelMode.listToGoTo = HSDC.type;
                            }
                        }
                    });

                    if (!bCollideHSDC) {
                        PixelMode.POS_LIST.forEach(POS => {
                            if (PixelMode.lists[POS.list].length === 0) {
                                if (CollisionManager.MouseCollision(mouseX, mouseY, POS.x, POS.y, POS.w, POS.h)) {
                                    PixelMode.OK_PANEL.x = POS.x;
                                    PixelMode.OK_PANEL.y = POS.y;
                                    PixelMode.bDisplayOkPanel = true;
                                    PixelMode.listToGoTo = POS.list;
                                }
                            }
                        });
                    }
                } else { //? CHECK DECKs
                    if (CollisionManager.MouseCollision(mouseX, mouseY, PixelMode.DECK.x, PixelMode.DECK.y, PixelMode.DECK.width, PixelMode.DECK.height)) {
                        if (PixelMode.lists["deck"].length > 0 || PixelMode.lists["deck2"].length > 0) {
                            PixelMode.bDeckHover = true;
                        }
                    } else {
                        PixelMode.bDeckHover = false;
                    }
                    // bDeck2Hover
                    if (CollisionManager.MouseCollision(mouseX, mouseY, PixelMode.DECK2.x, PixelMode.DECK2.y, PixelMode.DECK2.width, PixelMode.DECK2.height)) {
                        if (PixelMode.lists["deck2"].length > 0) {
                            PixelMode.bDeck2Hover = true;
                        }
                    } else {
                        PixelMode.bDeck2Hover = false;
                    }

                    //? CHECK HSDC
                    PixelMode.HSDC_LIST.forEach(HSDC => {
                        if (CollisionManager.MouseCollision(mouseX, mouseY, HSDC.x, HSDC.y, HSDC.w, HSDC.h)) {
                            bCollideHSDC = true;
                            let name = "";
                            if (PixelMode.lists[HSDC.type].length > 0) {
                                PixelMode.getLastOf(HSDC.type).bHovering = true;
                            }
                        } else {
                            if (PixelMode.lists[HSDC.type].length > 0) {
                                if (PixelMode.getLastOf(HSDC.type).bHovering) {
                                    PixelMode.getLastOf(HSDC.type).bHovering = false;
                                }
                            }
                        }
                    });

                }
                if (!CollisionManager.MouseCollision(mouseX, mouseY, PixelMode.DECK2.x, PixelMode.DECK2.y, PixelMode.DECK2.width, PixelMode.DECK2.height)) {
                    PixelMode.bDeck2Hover = false;
                } else {
                }

                if (!bCollideHSDC) { //? Ce n'est plus la peine de chercher ici, si la collision se fait là haut
                    let bOneCollision = false; //? to check if there's at least one collision
                    let bAlreadyColliding = false;
                    PixelMode.POS_LIST.forEach(pos => { //? Collision with c1 c2 etc.
                        for (let i = PixelMode.lists[pos.list].length-1; i >=0; i--) {
                            if (Card.selected === null) {
                                let card = PixelMode.lists[pos.list][i].getParent();
                                if (card.state === Card.STATE.Normal && !card.bSelect) {
                                    if (!bAlreadyColliding && CollisionManager.MouseCollision(mouseX, mouseY, card.x, card.y, card.width, card.height)) {
                                        bOneCollision = true;
                                        bAlreadyColliding = true;
                                        card.bHovering = true
                                        if (i !== PixelMode.lists[pos.list].length-1) {
                                            Card.multiHover = true;
                                            Card.multiHoverPos = pos.list;
                                            for (let j = i+1; j <= PixelMode.lists[pos.list].length-1; j++) {
                                                PixelMode.lists[pos.list][j].getParent().bHovering = true;
                                                
                                            } 
                                        } else {
                                            Card.multiHover = false;
                                            Card.multiHoverPos = "";
                                        }
                                    } else {
                                        card.bHovering = false;
                                    }
                                } else if (card.state === Card.STATE.FaceDown) {
                                    if (card.name+card.type === PixelMode.getLastOf(pos.list).name + PixelMode.getLastOf(pos.list).type) {
                                        if (CollisionManager.MouseCollision(mouseX, mouseY, card.x, card.y, card.width, card.height)) {
                                            card.bHovering = true;
                                            bOneCollision = true;
                                        } else {
                                            card.bHovering = false;
                                        }
                                    }
                                }
                            }
                        }
                    })
                    if (!bOneCollision) {
                        Card.multiHover = false;
                        Card.multiHoverPos = "";
                    }

                    Card.list.forEach(c => {
                        if (Card.selected === null) {
                            // if (c.state === Card.STATE.Normal && !c.bSelect) {

                            //     if (c.position != "deck2") {

                            //         if (CollisionManager.MouseCollision(mouseX, mouseY, c.x, c.y, c.width, c.height)) {
                            //             // log("collision: " + c.name + " " + c.type);
                            //             // PixelMode.hover.x = c.x;
                            //             // PixelMode.hover.y = c.y;
                            //             // PixelMode.hover.changeAnimation("active");
                            //             c.bHovering = true;
                            //         } else {
                            //             if (c.bHovering) {
                            //                 c.bHovering = false;
                            //             }
                            //         }

                            //     }

                            // } else if (c.state === Card.STATE.FaceDown && (c.position == "c2" || c.position == "c3" || c.position == "c4" || c.position == "c5" || c.position == "c6" || c.position == "c7")) {
                            //     if (c.name+c.type === PixelMode.getLastOf(c.position).name + PixelMode.getLastOf(c.position).type) {
                            //         if (CollisionManager.MouseCollision(mouseX, mouseY, c.x, c.y, c.width, c.height)) {
                            //             c.bHovering = true;
                            //         } else {
                            //             c.bHovering = false;
                            //         }
                            //     }
                            //     // log("facedown")
                            // }
    
                        } else { //? Card Selected !
                            
                            if (CollisionManager.MouseCollision(mouseX, mouseY, c.x, c.y, c.width, c.height)) {
                                if (c.position !== "deck" && c.position !== "deck2") {
                                    if (PixelMode.lists[c.position].length > 0) {
                                        if (c.name === PixelMode.getLastOf(c.position).name &&
                                            c.type === PixelMode.getLastOf(c.position).type &&
                                            (Card.selected.name !== c.name || Card.selected.type !== c.type)) {
                                            
                                            if (PixelMode.getLastOf(c.position).state === Card.STATE.FaceDown) {
                                                PixelMode.OK_PANEL.x = PixelMode.getLastOf(c.position).x;
                                                PixelMode.OK_PANEL.y = PixelMode.getLastOf(c.position).y + 10;
                                                PixelMode.bDisplayOkPanel = true;
                                                PixelMode.listToGoTo = c.position;
                                            } else {
                                                let receiver = PixelMode.getLastOf(c.position);
                                                if (Card.check(Card.selected.name, Card.selected.type, receiver.name, receiver.type, true)) {
                                                    PixelMode.OK_PANEL.x = receiver.x;
                                                    PixelMode.OK_PANEL.y = receiver.y+10;
                                                    PixelMode.bDisplayOkPanel = true;
                                                    PixelMode.listToGoTo = receiver.position;
                                                }
                                            }
                                        }
                                    } else { //? Void
                                        PixelMode.OK_PANEL.x = Card.POSITIONS[c.position].x;
                                        PixelMode.OK_PANEL.x = Card.POSITIONS[c.position].y;
                                        PixelMode.bDisplayOkPanel = true;

                                    }
                                }
                            }
                            
                        }
                        
                    });
                }
            }
            // if (MainMenu.state != MainMenu.STATE.Transition) {
    
            Button.currentList.forEach(b => {
                if (b.getState() != Button.STATE.Inactive && !b.bMoving) {
                    if (CollisionManager.MouseCollision(mouseX, mouseY, b.getPosition().x, b.getPosition().y, b.getSize().w, b.getSize().h)) {
                        if ((b.getSprite().tl != undefined && b.getSprite().tl.currentAnimation.name != "down") || // not staticSize
                            (b.getSprite().tl == undefined && b.getSprite().currentAnimation.name != "down")) {    // staticSize

                            if (b.getState() != Button.STATE.Hover) {
                                if (b.hoverCB) {
                                    b.hoverCB.cb(b.hoverCB.arg);
                                }

                                // Sound.play("hover");
                                if (b instanceof CheckboxBtn) {
                                    if (b.bChecked) {
                                        // b.setState(CheckboxBtn.STATE.Hover);
                                        // b.changeSpriteAnimation("c_hover");
                                        // MOUSE_SPRITE.changeAnimation("hover");
                                    } else {
                                        b.setState(CheckboxBtn.STATE.Hover);
                                        b.changeSpriteAnimation("hover");
                                        MOUSE_SPRITE.changeAnimation("hover");
                                    }
                                } else {
                                    b.setState(Button.STATE.Hover);
                                    b.changeSpriteAnimation("hover");
                                    MOUSE_SPRITE.changeAnimation("hover");
                                }

                                if (b.id_test == "V") {
                                    b.textOffsetX = b.textOffsetXHover;
                                    b.textOffsetY = b.textOffsetYHover;
                                    b.bTextOffsetChanged = true;
                                }

                            } else {
                                if (MOUSE_SPRITE.currentAnimation.name != "hover") {
                                    MOUSE_SPRITE.changeAnimation("hover");
                                }
                            }
                        }
                    } else { //? Mouse Moving and NO collision
                        if (b.getState() == Button.STATE.Hover) {
                            if (b.hoverCB) {
                                b.getTooltip().forEach(sp => {
                                    if (sp instanceof Sprite) {
                                        sp.delete = true;
                                        sp.currentFrame = 0;
                                    } else {
                                        sp.getSprite().delete = true;
                                    }
                                })
                                if (b.getHoverOffset()) {
                                    let func = translate.bind(b, { x: b.getHoverOffset().x, y: b.getHoverOffset().y }, true);
                                    func();
                                }
                            }
                            
                            if (b instanceof CheckboxBtn) {
                                if (b.bChecked) {
                                    b.setState(Button.STATE.Normal);
                                    b.changeSpriteAnimation("c_normal");
                                } else {
                                    b.setState(Button.STATE.Normal);
                                    b.changeSpriteAnimation("normal");
                                }
                            } else {
                                b.setState(Button.STATE.Normal);
                                b.changeSpriteAnimation("normal");
                            }
                            
                            MOUSE_SPRITE.changeAnimation("normal");

                        } else {
                            if (b.bTextOffsetChanged) b.resetOffsets();
                        }
                    }
                }
            });
    
                if (Input.bKeyboardActive && !SETTINGS) {
                    Input.keyboardList.forEach(b => {
                        if (b.getState() != Button.STATE.Inactive && !b.bMoving) {
                            if (CollisionManager.MouseCollision(mouseX, mouseY, b.getPosition().x, b.getPosition().y, b.getSize().w, b.getSize().h)) {
                                if ((b.getSprite().tl != undefined && b.getSprite().tl.currentAnimation.name != "down") || // not staticSize
                                    (b.getSprite().tl == undefined && b.getSprite().currentAnimation.name != "down")) {    // staticSize
    
                                    if (b.getState() != Button.STATE.Hover) {
                                        if (b.hoverCB) {
                                            b.hoverCB.cb(b.hoverCB.arg);
                                        }
    
                                        b.setState(Button.STATE.Hover);
                                        b.changeSpriteAnimation("hover");
                                        // Sound.list["hover"].audioPlay();
                                        Sound.play("hover");
                                        MOUSE_SPRITE.changeAnimation("hover");
                                    }
                                }
                            } else { //? Mouse Moving and NO collision
                                if (b.getState() == Button.STATE.Hover) {
                                    if (b.hoverCB) {
                                        b.getTooltip().forEach(sp => {
                                            if (sp instanceof Sprite) {
                                                sp.delete = true;
                                                sp.currentFrame = 0;
                                            } else {
                                                sp.getSprite().delete = true;
                                            }
                                        })
                                        if (b.getHoverOffset()) {
                                            let func = translate.bind(b, { x: b.getHoverOffset().x, y: b.getHoverOffset().y }, true);
                                            func();
                                        }
                                    }
    
                                    b.setState(Button.STATE.Normal);
                                    b.changeSpriteAnimation("normal");
    
                                    MOUSE_SPRITE.changeAnimation("normal");
    
                                    if (b.bTextOffsetChanged) b.resetOffsets();
    
                                }
                            }
                        }
                    });
                }
    
                //? Mouse MOVE ---
                Panel.currentList.forEach(p => {
                    if (p.getState() != Panel.STATE.Inactive && p.hoverable && !SETTINGS) {
                        if (CollisionManager.MouseCollision(mouseX, mouseY, p.x, p.y, p.getSize().w, p.getSize().h)) {
                            if ((p.getSprite().tl != undefined && p.getSprite().tl.currentAnimation.name != "down") || // not staticSize
                                (p.getSprite().tl == undefined && p.getSprite().currentAnimation.name != "down")) {    // staticSize
                                if (p.getState() != Panel.STATE.Hover) {
                                    if (p.hoverCB) {
                                        Sound.play("kanapanel");
                                        p.hoverCB.cb(p.hoverCB.arg);
                                    }
                                    p.setState(Panel.STATE.Hover);
                                    p.changeSpriteAnimation("hover");
                                }
                            }
                        } else {
                            if (p.getState() == Panel.STATE.Hover) {
                                if (p.hoverCB) {
                                    p.getTooltip().forEach(sp => {
                                        if (sp instanceof Sprite) {
                                            sp.delete = true;
                                        } else {
                                            sp.getSprite().delete = true;
                                        }
                                    })
                                }
                                p.setState(Panel.STATE.Normal);
                                p.changeSpriteAnimation("normal");
                            }
                        }
                    }
                });
    
                //? Mouse MOVE ---
                let bCollided = false;
                EntryField.currentList.forEach(e => {
                    if (e.getState() != EntryField.STATE.Inactive) {
                        if (CollisionManager.MouseCollision(mouseX, mouseY, e.x, e.y, e.getSize().w, e.getSize().h)) {
                            bCollided = true;
                            MOUSE_SPRITE.changeAnimation("entry");
                            if (e.getState() == EntryField.STATE.Normal) {
                                e.setState(EntryField.STATE.Hover);
                                e.changeSpriteAnimation("hover");
                            }
    
                        } else {
                            if (e.getState() == EntryField.STATE.Hover) {
                                e.setState(EntryField.STATE.Normal);
                                e.changeSpriteAnimation("normal");
                                if (MOUSE_SPRITE.currentAnimation.name == "entry") {
                                    MOUSE_SPRITE.changeAnimation("normal");
                                }
                            }
                        }
                    }
                });
                EntryField.currentList.forEach(e => {
                    // if (!CollisionManager.MouseCollision(mouseX, mouseY, e.x, e.y, e.getSize().w, e.getSize().h)) {
                    if (e.getState() == EntryField.STATE.Focus && !bCollided) {
                        if (MOUSE_SPRITE.currentAnimation.name == "entry") {
                            MOUSE_SPRITE.changeAnimation("normal");
                        }
                    }
                    // }
    
                });
            // }
        }
    
        if (TRANSITION) {
            MOUSE_SPRITE.changeAnimation("normal");
        }
    
    });
}

//!                    _______  _______  _       
//! |\     /||\     /|(  ____ \(  ____ \( \      
//! | )   ( || )   ( || (    \/| (    \/| (      
//! | | _ | || (___) || (__    | (__    | |      
//! | |( )| ||  ___  ||  __)   |  __)   | |      
//! | || || || (   ) || (      | (      | |      
//! | () () || )   ( || (____/\| (____/\| (____/\
//! (_______)|/     \|(_______/(_______/(_______/

if (Input.MOUSE_WHEEL) {
    canvas.addEventListener("wheel", e => {
        e.preventDefault();
        Panel.currentList.forEach(p => {
            if (p.getState() != Panel.STATE.Inactive && p instanceof DropdownPanel && p.getState() == Panel.STATE.Hover) {
                if (p.list.length > 8) {
                    if (e.deltaY == -100) {        //? y++
                        if (p.currentPos > 0) {
                            p.currentPos--;        //? Vers le haut de la liste
                            p.cursor.offY--;
                            p.cursorUp.offY = p.cursor.offY - 2;  //! -2 ??
                            p.cursorDown.offY = p.cursor.offY + p.cursor.scaleY;
                            if (p.currentPos == 0) {
                                p.cursor.y = p.cursorStartPos;
                            }
                        }
                    } else if (e.deltaY == 100) {  //? y--
                        if (p.currentPos < p.list.length - 8) {
                            p.currentPos++;
                            p.cursor.offY++;
                            p.cursorUp.offY = p.cursor.offY - 2;
                            p.cursorDown.offY = p.cursor.offY + p.cursor.scaleY;
                            if (p.currentPos == p.list.length - 8) {
                                p.cursor.y = p.limit - p.cursor.scaleY - 2; //! -2 ??
                            }
                        }
                    }
                }
            }
        });
    
    });
}
if (Input.CONTEXT_MENU) {
    canvas.addEventListener("contextmenu", e => {
        e.preventDefault();
    });
}

//!  _______       ______   _______           _       
//! (       )     (  __  \ (  ___  )|\     /|( (    /|
//! | () () |     | (  \  )| (   ) || )   ( ||  \  ( |
//! | || || |     | |   ) || |   | || | _ | ||   \ | |
//! | |(_)| |     | |   | || |   | || |( )| || (\ \) |
//! | |   | |     | |   ) || |   | || || || || | \   |
//! | )   ( | _   | (__/  )| (___) || () () || )  \  |
//! |/     \|(_)  (______/ (_______)(_______)|/    )_)

if (Input.MOUSE_DOWN) {
    canvas2.addEventListener("mousedown", e => {
        if (!inTransition() && e.button == 0 && mainState != MAIN_STATE.Error) { // Left click !
    
            const mouseX = e.layerX / SCALE_X;
            const mouseY = e.layerY / SCALE_Y;
    
            if (RESOLUTION_SETTINGS) {
                if (!CollisionManager.MouseCollision(mouseX, mouseY, RESOLUTION_PANEL_DATA.x, RESOLUTION_PANEL_DATA.y, RESOLUTION_PANEL_DATA.w, RESOLUTION_PANEL_DATA.h)) {
                    closeResolutionPanel();
                }
            } else if (SETTINGS) {
                if (!CollisionManager.MouseCollision(mouseX, mouseY, SETTINGS_PANEL_DATA.x, SETTINGS_PANEL_DATA.y, SETTINGS_PANEL_DATA.w, SETTINGS_PANEL_DATA.h)) {
                    closeSettings();
                }
            }
    
    
            let bClickedOnKeyboard = false;
            // if (MainMenu.state != MainMenu.STATE.Transition && Game1.currentState != Game1.STATE.Transition) {
                Button.currentList.every(b => {
                    if (b.getState() != Button.STATE.Inactive) {
    
                        if (b.getState() == Button.STATE.Hover) {

                            if (b instanceof CheckboxBtn) {
                                if (b.bChecked) {
                                    // b.changeSpriteAnimation("c_down");
                                } else {
                                    b.changeSpriteAnimation("down");
                                }
                            } else {
                                b.changeSpriteAnimation("down");
                            }

                            if (b.id == 1) { // Btn standard
                                b.textOffsetX += 1;
                                b.textOffsetY += 1;
                                b.bTextOffsetChanged = true;
                            } 
    
                            MOUSE_SPRITE.changeAnimation("down");
                            return false;
                        }
                    }
                    return true;
                });
    
                if (Input.bKeyboardActive) {
                    Input.keyboardList.every(b => {
                        if (b.getState() != Button.STATE.Inactive) {
                            if (b.getState() == Button.STATE.Hover) {
                                if (b instanceof KeyboardBtn) {
                                    bClickedOnKeyboard = true;
                                }
    
                                b.textOffsetX += 1;
                                b.textOffsetY += 1;
                                b.bTextOffsetChanged = true;
    
                                b.changeSpriteAnimation("down");
                                MOUSE_SPRITE.changeAnimation("down");
                                return false;
                            }
                        }
                        return true;
                    });
                }
    
                let bClickedOnAnotherEntryField = false;
                let newIndex = -1;
                EntryField.currentList.forEach((e, index) => {
                    if (e.getState() != EntryField.STATE.Inactive) {
                        if (CollisionManager.MouseCollision(mouseX, mouseY, e.x, e.y, e.getSize().w, e.getSize().h)) {
                            if (e.getState() == EntryField.STATE.Hover) {
                                bClickedOnAnotherEntryField = true;
                                e.setState(EntryField.STATE.Focus);
                                e.changeSpriteAnimation("focus");
                                Sound.play("entry");
                                e.textOffsetX = e.textOffsetXFocus;
                                e.textOffsetY = e.textOffsetYFocus;
                                if (e.focusCB) {
                                    e.focusCB.cb(e.focusCB.arg);
                                }
                                newIndex = index;
    
                            }
                            if (e.getState() == EntryField.STATE.Hover || e.getState() == EntryField.STATE.Focus) {
                                e.sp.cursor.changeAnimation("normal");
    
                                if (mouseX < e.x + e.cursorPosXOrigin) {
                                    e.sp.cursor.offX = e.cursorPosXOrigin;
                                }
                                else if (mouseX > e.x + e.cursorPosXOrigin + e.label.length * 5) {
                                    e.sp.cursor.offX = e.cursorPosXOrigin + e.label.length * 5
                                }
                                else {
                                    let char = Math.ceil((mouseX - (e.x + e.cursorPosXOrigin)) / 5);
                                    e.sp.cursor.offX = e.cursorPosXOrigin + char * 5;
                                }
                            }
    
                        }
                    }
                });
    
                if (bClickedOnAnotherEntryField) {
    
                    EntryField.currentList.forEach((e, index) => {
                        if (e.getState() == EntryField.STATE.Focus
                            && !CollisionManager.MouseCollision(mouseX, mouseY, e.x, e.y, e.getSize().w, e.getSize().h)
                            && !bClickedOnKeyboard) {
                            e.setState(EntryField.STATE.Normal);
                            e.changeSpriteAnimation("normal");
                            e.sp.cursor.changeAnimation("none");
                            e.textOffsetX = e.textOffsetXOrigin;
                            e.textOffsetY = e.textOffsetYOrigin;
    
                            if (e.focusCB) {
                                if (newIndex == 0) { //! Index en dur
                                    Login.bTooltipIncluded = false;
                                    e.getTooltip().forEach(sp => {
                                        if (sp instanceof Sprite) {
                                            sp.delete = true;
                                            sp.currentFrame = 0;
                                        } else {
                                            sp.getSprite().delete = true;
                                        }
                                    })
                                }
                            }
                        }
                    });
                }
    
    
            // }
        }
    });

    canvas.addEventListener("mousedown", e => {
    
        if (!inTransition() && e.button == 0 && mainState != MAIN_STATE.Error) { // Left click !
    
            const mouseX = e.layerX / SCALE_X;
            const mouseY = e.layerY / SCALE_Y;
    
            if (RESOLUTION_SETTINGS) {
                if (!CollisionManager.MouseCollision(mouseX, mouseY, RESOLUTION_PANEL_DATA.x, RESOLUTION_PANEL_DATA.y, RESOLUTION_PANEL_DATA.w, RESOLUTION_PANEL_DATA.h)) {
                    closeResolutionPanel();
                }
            } else if (MENU) {
                if (mainState === MAIN_STATE.Game && !CollisionManager.MouseCollision(mouseX, mouseY, Game.menuPanel.x, Game.menuPanel.y, Game.menuPanel.width, Game.menuPanel.height)) {
                    Game.closeMenu();
                } else if (mainState === MAIN_STATE.PixelMode && !CollisionManager.MouseCollision(mouseX, mouseY, PixelMode.menuPanel.x, PixelMode.menuPanel.y, PixelMode.menuPanel.width, PixelMode.menuPanel.height)) {
                    PixelMode.closeMenu();
                }
            }
    
    
            let bClickedOnKeyboard = false;
            // if (MainMenu.state != MainMenu.STATE.Transition && Game1.currentState != Game1.STATE.Transition) {
                Button.currentList.every(b => {
                    if (b.getState() != Button.STATE.Inactive) {
    
                        if (b.getState() == Button.STATE.Hover) {

                            if (b instanceof CheckboxBtn) {
                                if (b.bChecked) {
                                    // b.changeSpriteAnimation("c_down");
                                } else {
                                    b.changeSpriteAnimation("down");
                                }
                            } else {
                                b.changeSpriteAnimation("down");
                            }

                            if (b.id == 1) { // Btn standard
                                b.textOffsetX += 1;
                                b.textOffsetY += 1;
                                b.bTextOffsetChanged = true;
                            } 
    
                            MOUSE_SPRITE.changeAnimation("down");
                            return false;
                        }
                    }
                    return true;
                });
    
                if (Input.bKeyboardActive) {
                    Input.keyboardList.every(b => {
                        if (b.getState() != Button.STATE.Inactive) {
                            if (b.getState() == Button.STATE.Hover) {
                                if (b instanceof KeyboardBtn) {
                                    bClickedOnKeyboard = true;
                                }
    
                                b.textOffsetX += 1;
                                b.textOffsetY += 1;
                                b.bTextOffsetChanged = true;
    
                                b.changeSpriteAnimation("down");
                                MOUSE_SPRITE.changeAnimation("down");
                                return false;
                            }
                        }
                        return true;
                    });
                }
    
                let bClickedOnAnotherEntryField = false;
                let newIndex = -1;
                EntryField.currentList.forEach((e, index) => {
                    if (e.getState() != EntryField.STATE.Inactive) {
                        if (CollisionManager.MouseCollision(mouseX, mouseY, e.x, e.y, e.getSize().w, e.getSize().h)) {
                            if (e.getState() == EntryField.STATE.Hover) {
                                bClickedOnAnotherEntryField = true;
                                e.setState(EntryField.STATE.Focus);
                                e.changeSpriteAnimation("focus");
                                Sound.play("entry");
                                e.textOffsetX = e.textOffsetXFocus;
                                e.textOffsetY = e.textOffsetYFocus;
                                if (e.focusCB) {
                                    e.focusCB.cb(e.focusCB.arg);
                                }
                                newIndex = index;
    
                            }
                            if (e.getState() == EntryField.STATE.Hover || e.getState() == EntryField.STATE.Focus) {
                                e.sp.cursor.changeAnimation("normal");
    
                                if (mouseX < e.x + e.cursorPosXOrigin) {
                                    e.sp.cursor.offX = e.cursorPosXOrigin;
                                }
                                else if (mouseX > e.x + e.cursorPosXOrigin + e.label.length * 5) {
                                    e.sp.cursor.offX = e.cursorPosXOrigin + e.label.length * 5
                                }
                                else {
                                    let char = Math.ceil((mouseX - (e.x + e.cursorPosXOrigin)) / 5);
                                    e.sp.cursor.offX = e.cursorPosXOrigin + char * 5;
                                }
                            }
    
                        }
                    }
                });
    
                if (bClickedOnAnotherEntryField) {
    
                    EntryField.currentList.forEach((e, index) => {
                        if (e.getState() == EntryField.STATE.Focus
                            && !CollisionManager.MouseCollision(mouseX, mouseY, e.x, e.y, e.getSize().w, e.getSize().h)
                            && !bClickedOnKeyboard) {
                            e.setState(EntryField.STATE.Normal);
                            e.changeSpriteAnimation("normal");
                            e.sp.cursor.changeAnimation("none");
                            e.textOffsetX = e.textOffsetXOrigin;
                            e.textOffsetY = e.textOffsetYOrigin;
    
                            if (e.focusCB) {
                                if (newIndex == 0) { //! Index en dur
                                    Login.bTooltipIncluded = false;
                                    e.getTooltip().forEach(sp => {
                                        if (sp instanceof Sprite) {
                                            sp.delete = true;
                                            sp.currentFrame = 0;
                                        } else {
                                            sp.getSprite().delete = true;
                                        }
                                    })
                                }
                            }
                        }
                    });
                }
    
    
            // }
        }
    })
}

//!  _______  _       _________ _______  _       
//! (  ____ \( \      \__   __/(  ____ \| \    /\
//! | (    \/| (         ) (   | (    \/|  \  / /
//! | |      | |         | |   | |      |  (_/ / 
//! | |      | |         | |   | |      |   _ (  
//! | |      | |         | |   | |      |  ( \ \ 
//! | (____/\| (____/\___) (___| (____/\|  /  \ \
//! (_______/(_______/\_______/(_______/|_/    \/
if (Input.MOUSE_CLICK) {
    canvas2.onclick = e => {
        Button.currentList.every(b => {
            if (b.getState() != Button.STATE.Inactive && !b.bMoving) {
                if (b.getState() == Button.STATE.Hover) {         
                    if ((b.getSprite().class == 9 && b.getSprite().tl.currentAnimation.name != "down")
                        || (b.getSprite().class != 9 && b.getSprite().currentAnimation.name != "down")
                    ) {
                        return false;
                    }

                    if (b.getHoverOffset()) {
                        let func = translate.bind(b, { x: b.getHoverOffset().x, y: b.getHoverOffset().y }, true);
                        func();
                    }

                    if (b.bTextOffsetChanged) b.resetOffsets();

                    if (b.sound != "") {
                        if (b.id_test != "go") {
                            Sound.play(b.sound);
                        } else {
                            setTimeout(() => {
                                Sound.play(b.sound);
                            }, 500);
                        }
                    }

                    if (b instanceof CheckboxBtn) {
                        if (b.bChecked) {
                            // b.setState(Button.STATE.Normal);
                        } else {
                            b.setState(Button.STATE.Normal);
                            b.changeSpriteAnimation("normal");
                            b.check();
                        }
                    } else {
                        b.setState(Button.STATE.Normal);
                        b.changeSpriteAnimation("normal");
                    }
                    MOUSE_SPRITE.changeAnimation("normal");

                    if (b.callback.cb != null && b.callback.arg != null) {
                        b.callback.cb(b.callback.arg);
                    } else {
                        b.callback();
                    }
                    if (b.hoverCB) {
                        b.getTooltip().forEach(sp => {
                            if (sp instanceof Sprite) {
                                sp.delete = true;
                            } else {
                                sp.getSprite().delete = true;
                            }
                        });
                    }
                    return false;
                }
            }
            return true;
        });
    }

    canvas.onclick = e => {
        if (!Sound.bInit) {
            Sound.initAudioContext();
        }
    
        if (!inTransition() && e.button == 0 && mainState != MAIN_STATE.Error) { // Left click !
            const mouseX = e.layerX / SCALE_X;
            const mouseY = e.layerY / SCALE_Y;
    
            // if (MainMenu.state != MainMenu.STATE.Transition && Game1.currentState != Game1.STATE.Transition) {
            if (mainState === MAIN_STATE.Game) { //! GAME ---------------------

                if (Game.bDeckHover) {
                    if (Game.lists["deck"].length > 0) {
                        let cardSprite = Game.lists["deck"][Game.lists["deck"].length-1];
                        cardSprite.getParent().position = "deck2";
                        cardSprite.getParent().state = Card.STATE.Normal;
                        cardSprite.changeAnimation("normal");
                        Game.lists["deck"].pop();
                        Game.lists["deck2"].push(cardSprite);
                    } else {
                        if (Game.lists["deck2"].length > 0) {
                            Game.lists["deck2"].forEach(d2 => {
                                d2.getParent().position = "deck";
                                d2.getParent().state = Card.STATE.FaceDown;
                                d2.changeAnimation("faceDown");
                                Game.lists["deck"].unshift(d2);
                            });
                            Game.lists["deck2"] = [];
                        }
                    }
                    return;
                } else if (Game.bDeck2Hover) {
                    Card.selected = Game.getLastOf("deck2");
                    Card.selected.bSelect = true;
                    Card.selected.bHovering = false;

                    return;
                }

                //? CHECK HSDC
                let bCollideHSDC = false;
                if (Card.selected === null) {
                    Game.HSDC_LIST.forEach(HSDC => {
                        if (CollisionManager.MouseCollision(mouseX, mouseY, HSDC.x, HSDC.y, HSDC.w, HSDC.h)) {
                            bCollideHSDC = true;
                            if (Game.lists[HSDC.type].length > 0) {
                                let card = Game.getLastOf(HSDC.type);
                                card.bHovering = false;
                                card.bSelect = true;
                                Card.selected = card;
                            } 
                        }
                    });
                }
                
                if (!bCollideHSDC) {
                    if (Card.selected === null) {

                        if (Card.multiHover) {
                            Card.multiSelect = true;
                            yomiText.element.innerHTML = "";
                            Card.multiSelectPos = Card.multiHoverPos;
                            let bFirst = true;
                            Game.lists[Card.multiHoverPos].forEach(c => {
                                let card = c.getParent();
                                if (card.bHovering) {
                                    if (bFirst) {
                                        bFirst = false;
                                        Card.selected = card;
                                    }
                                    card.bHovering = false;
                                    card.bSelect = true;
                                }
                            });
                        } else {
                            Card.list.every(c => {
                                if (c.bHovering && c.state === Card.STATE.Normal) {
                                    
                                    c.bHovering = false;
                                    c.bSelect = true;
                                    Card.selected = c;
                                    return false;
                                } else if (c.bHovering && c.state === Card.STATE.FaceDown) {
                                    c.state = Card.STATE.Normal;
                                    c.getSprite().changeAnimation("normal");
                                    if (MOBILE) {
                                        c.bHovering = false;
                                    }
                                }
                                return true;
                            });
                        }

                    } else {

                        if (Game.bDisplayOkPanel) {
                            if (Card.multiSelect) {

                                Card.multiTransition = true;

                                let bGo = false;
                                let nbToPop = 0;
                                let count = 0;
                                let offsetY = 0;
                                let speed = 0.5;
                                Game.lists[Card.multiSelectPos].forEach(c => {
                                    let card = c.getParent();
                                    if (card.nameType() === Card.selected.nameType()) {
                                        bGo = true;
                                    } 
                                    if (bGo) {
                                        nbToPop++
                                        // speed -= 0.01;
                                    }
                                })
                                bGo = false;

                                Game.lists[Card.multiSelectPos].forEach(c => {
                                    let card = c.getParent();
                                    if (card.nameType() === Card.selected.nameType()) {
                                        bGo = true;
                                    }
                                    if (bGo) {
                                        count++;
                                        Card.inTransitionList.push(card);
                                        card.bMoving = true
                                        TRANSITION = true;

                                        let newSprite = new Sprite({ w: 48, h: 64 }, card.x, card.y, null, "mc"); //? Moving Card
                                        newSprite.addAnimation("normal", { x: card.getSprite().getAnimation("normal").origin.x, y: card.getSprite().getAnimation("normal").origin.y });
                                        newSprite.changeAnimation("normal");
                                        newSprite.setDestination({ x: Game.OK_PANEL.x, y: Game.OK_PANEL.y + offsetY});

                                        newSprite.setMoveSpeed(speed);
                                        speed += 0.01;
                                        Game.movingList.push(newSprite);
                                        
                                        if (count === nbToPop && Game.currentGameType !== Game.GAME_TYPE.Normal) {
                                            let kanjiSprite = new Sprite({ w: 46, h: 38 }, 1, 13, newSprite, "mcc"); //? Moving Card Child
                                            kanjiSprite.addAnimation("normal", { x: 336, y: 16});
                                            kanjiSprite.changeAnimation("normal");
                                            Game.movingList.push(kanjiSprite);
                                        }

                                        // nbToPop++;
                                        Game.lists[Game.listToGoTo].push(card.getSprite());
                                        card.bSelect = false;
                                        card.position = Game.listToGoTo;
                                        offsetY += PIXEL_MODE ? 10 : 14;
                                    }
                                })



                                for (let i = 0; i < nbToPop; i++) {
                                    Game.lists[Card.multiSelectPos].pop();
                                }
                                Card.selected = null;
                                Card.multiSelect = false;
                                Card.multiSelectPos = "";
                                Game.bDisplayOkPanel = false;
                                Game.listToGoTo = "";
                                return;
                            } else {
                                //! HSDCも
                                yomiText.element.innerHTML = "";
                                Card.inTransition = Card.selected;
                                Card.selected.bMoving = true;
                                TRANSITION = true;

                                let newSprite = new Sprite({ w: 48, h: 64 }, Card.selected.x, Card.selected.y, null, "mc"); //? Moving Card
                                newSprite.addAnimation("normal", { x: Card.selected.getSprite().getAnimation("normal").origin.x, y: Card.selected.getSprite().getAnimation("normal").origin.y });
                                newSprite.changeAnimation("normal");
                                newSprite.setDestination({ x: Game.OK_PANEL.x, y: Game.OK_PANEL.y });
                                newSprite.setMoveSpeed(0.5);
                                Game.movingList.push(newSprite);
                                    
                                if (Game.currentGameType !== Game.GAME_TYPE.Normal) {
                                    let kanjiSprite = new Sprite({ w: 46, h: 38 }, 1, 13, newSprite, "mcc"); //? Moving Card Child
                                    kanjiSprite.addAnimation("normal", { x: 336, y: 16});
                                    kanjiSprite.changeAnimation("normal");
                                    Game.movingList.push(kanjiSprite);
                                }


                                Game.lists[Card.selected.position].pop();
                                Game.lists[Game.listToGoTo].push(Card.selected.sp);
                                Card.selected.position = Game.listToGoTo;
                                Card.selected.bSelect = false;
    
                                Game.bDisplayOkPanel = false;
                                Card.selected = null;
                                Game.listToGoTo = "";
                                if (Game.lists["deck"].length === 0 && Game.lists["deck2"].length === 0) {
                                    Game.DECK.changeAnimation("void");
                                }
                                return;
                            }
                        }
    
                        //? Ici : displayOK = false ==> désactivation de tous les selects
                        let bCollision = false;
                        Card.list.every(c => {
                            if (CollisionManager.MouseCollision(mouseX, mouseY, c.x, c.y, c.width, c.height)) {
                                bCollision = true;
                                if (c.bSelect) {
                                    c.bSelect = false;
                                    Card.selected = null;
                                    if (!MOBILE) c.bHovering = true;
                                } else {
                                    Card.multiSelect = false;
                                    Card.multiSelectPos = "";
                                    if (Card.selected !== null) Card.selected.bSelect = false;
                                    Card.selected = null;
                                    Game.listToGoTo = ""
                                }
                            } else {
                                if (c.bSelect) {
                                    c.bSelect = false;
                                }
                            }
                            return true;
                        });
                        if (!bCollision) {
                            Card.multiSelect = false;
                            Card.multiSelectPos = "";
                            Card.selected.bSelect = false;
                            Card.selected = null;
                            Game.bDisplayOkPanel = false;
                            Game.listToGoTo = "";
                            yomiText.element.innerHTML = "";
                        }
                    }
                }

            } else if (mainState === MAIN_STATE.PixelMode) { //! PixelMode ---------------------

                if (PixelMode.bDeckHover) {
                    if (PixelMode.lists["deck"].length > 0) {
                        let cardSprite = PixelMode.lists["deck"][PixelMode.lists["deck"].length-1];
                        cardSprite.getParent().position = "deck2";
                        cardSprite.getParent().state = Card.STATE.Normal;
                        cardSprite.changeAnimation("normal");
                        PixelMode.lists["deck"].pop();
                        PixelMode.lists["deck2"].push(cardSprite);
                    } else {
                        if (PixelMode.lists["deck2"].length > 0) {
                            PixelMode.lists["deck2"].forEach(d2 => {
                                d2.getParent().position = "deck";
                                d2.getParent().state = Card.STATE.FaceDown;
                                d2.changeAnimation("faceDown");
                                PixelMode.lists["deck"].unshift(d2);
                            });
                            PixelMode.lists["deck2"] = [];
                        }
                    }
                    return;
                } else if (PixelMode.bDeck2Hover) {
                    Card.selected = PixelMode.getLastOf("deck2");
                    Card.selected.bSelect = true;
                    Card.selected.bHovering = false;

                    return;
                }

                //? CHECK HSDC
                let bCollideHSDC = false;
                if (Card.selected === null) {
                    PixelMode.HSDC_LIST.forEach(HSDC => {
                        if (CollisionManager.MouseCollision(mouseX, mouseY, HSDC.x, HSDC.y, HSDC.w, HSDC.h)) {
                            bCollideHSDC = true;
                            if (PixelMode.lists[HSDC.type].length > 0) {
                                let card = PixelMode.getLastOf(HSDC.type);
                                card.bHovering = false;
                                card.bSelect = true;
                                Card.selected = card;
                            } 
                        }
                    });
                }
                
                if (!bCollideHSDC) {
                    if (Card.selected === null) {

                        if (Card.multiHover) {
                            Card.multiSelect = true;
                            Card.multiSelectPos = Card.multiHoverPos;
                            let bFirst = true;
                            PixelMode.lists[Card.multiHoverPos].forEach(c => {
                                let card = c.getParent();
                                if (card.bHovering) {
                                    if (bFirst) {
                                        bFirst = false;
                                        Card.selected = card;
                                    }
                                    card.bHovering = false;
                                    card.bSelect = true;
                                }
                            });
                        } else {
                            Card.list.every(c => {
                                if (c.bHovering && c.state === Card.STATE.Normal) {
                                    
                                    c.bHovering = false;
                                    c.bSelect = true;
                                    Card.selected = c;
                                    return false;
                                } else if (c.bHovering && c.state === Card.STATE.FaceDown) {
                                    c.state = Card.STATE.Normal;
                                    c.getSprite().changeAnimation("normal");
                                    if (MOBILE) {
                                        c.bHovering = false;
                                    }
                                }
                                return true;
                            });
                        }

                    } else {

                        if (PixelMode.bDisplayOkPanel) {
                            if (Card.multiSelect) {

                                Card.multiTransition = true;

                                let bGo = false;
                                let nbToPop = 0;
                                let count = 0;
                                let offsetY = 0;
                                let speed = 0.5;
                                PixelMode.lists[Card.multiSelectPos].forEach(c => {
                                    let card = c.getParent();
                                    if (card.nameType() === Card.selected.nameType()) {
                                        bGo = true;
                                    } 
                                    if (bGo) {
                                        nbToPop++
                                        // speed -= 0.01;
                                    }
                                })
                                bGo = false;

                                PixelMode.lists[Card.multiSelectPos].forEach(c => {
                                    //! do not delete
                                    // let card = c.getParent();
                                    // if (card.nameType() === Card.selected.nameType()) {
                                    //     // log("to bGo? : " + card.nameType + " " + Card.selected.nameType)
                                    //     bGo = true;
                                    // }
                                    // if (bGo) {
                                    //     nbToPop++;
                                    //     PixelMode.lists[PixelMode.listToGoTo].push(card.getSprite());
                                    //     card.bSelect = false;
                                    //     card.position = PixelMode.listToGoTo;
                                    // }
                                    //! do not delete

                                    let card = c.getParent();
                                    if (card.nameType() === Card.selected.nameType()) {
                                        bGo = true;
                                    }
                                    if (bGo) {
                                        count++;
                                        Card.inTransitionList.push(card);
                                        card.bMoving = true
                                        TRANSITION = true;

                                        let newSprite = new Sprite({ w: 24, h: 37 }, card.x, card.y, null, "mc"); //? Moving Card
                                        newSprite.addAnimation("normal", { x: card.getSprite().getAnimation("normal").origin.x, y: card.getSprite().getAnimation("normal").origin.y });
                                        newSprite.changeAnimation("normal");
                                        newSprite.setDestination({ x: PixelMode.OK_PANEL.x, y: PixelMode.OK_PANEL.y + offsetY});

                                        newSprite.setMoveSpeed(speed);
                                        speed += 0.01;
                                        PixelMode.movingList.push(newSprite);
                                        
                                        // if (count === nbToPop) {
                                        //     let kanjiSprite = new Sprite({ w: 46, h: 38 }, 1, 13, newSprite, "mcc"); //? Moving Card Child
                                        //     kanjiSprite.addAnimation("normal", { x: 336, y: 16});
                                        //     kanjiSprite.changeAnimation("normal");
                                        //     PixelMode.movingList.push(kanjiSprite);
                                        // }

                                        // nbToPop++;
                                        PixelMode.lists[PixelMode.listToGoTo].push(card.getSprite());
                                        card.bSelect = false;
                                        card.position = PixelMode.listToGoTo;
                                        offsetY += PIXEL_MODE ? 10 : 14;
                                    }
                                })



                                for (let i = 0; i < nbToPop; i++) {
                                    PixelMode.lists[Card.multiSelectPos].pop();
                                }
                                Card.selected = null;
                                Card.multiSelect = false;
                                Card.multiSelectPos = "";
                                PixelMode.bDisplayOkPanel = false;
                                PixelMode.listToGoTo = "";
                                return;
                            } else {

                                Card.inTransition = Card.selected;
                                TRANSITION = true;

                                let newSprite = new Sprite({ w: 24, h: 37 }, Card.selected.x, Card.selected.y, null, "mc"); //? Moving Card
                                newSprite.addAnimation("normal", { x: Card.selected.getSprite().getAnimation("normal").origin.x, y: Card.selected.getSprite().getAnimation("normal").origin.y });
                                newSprite.changeAnimation("normal");
                                newSprite.setDestination({ x: PixelMode.OK_PANEL.x, y: PixelMode.OK_PANEL.y });
                                newSprite.setMoveSpeed(0.5);
                                PixelMode.movingList.push(newSprite);
                                Card.selected.bMoving = true;
                                
                                // let kanjiSprite = new Sprite({ w: 46, h: 38 }, 1, 13, newSprite, "mcc"); //? Moving Card Child
                                // kanjiSprite.addAnimation("normal", { x: 336, y: 16});
                                // kanjiSprite.changeAnimation("normal");
                                // Game.movingList.push(kanjiSprite);

                                PixelMode.lists[Card.selected.position].pop();
                                PixelMode.lists[PixelMode.listToGoTo].push(Card.selected.sp);
                                Card.selected.position = PixelMode.listToGoTo;
                                Card.selected.bSelect = false;
    
                                PixelMode.bDisplayOkPanel = false;
                                Card.selected = null;
                                PixelMode.listToGoTo = "";
                                if (PixelMode.lists["deck"].length === 0 && PixelMode.lists["deck2"].length === 0) {
                                    PixelMode.DECK.changeAnimation("void");
                                }
                                return;
                            }
                        }
    
                        //? Ici : displayOK = false ==> désactivation de tous les selects
                        let bCollision = false;
                        Card.list.every(c => {
                            if (CollisionManager.MouseCollision(mouseX, mouseY, c.x, c.y, c.width, c.height)) {
                                bCollision = true;
                                if (c.bSelect) {
                                    c.bSelect = false;
                                    Card.selected = null;
                                    if (!MOBILE) c.bHovering = true;
                                } else {
                                    Card.multiSelect = false;
                                    Card.multiSelectPos = "";
                                    if (Card.selected !== null) Card.selected.bSelect = false;
                                    Card.selected = null;
                                    PixelMode.listToGoTo = ""
                                }
                            } else {
                                if (c.bSelect) {
                                    c.bSelect = false;
                                }
                            }
                            return true;
                        });
                        if (!bCollision) {
                            Card.multiSelect = false;
                            Card.multiSelectPos = "";
                            Card.selected.bSelect = false;
                            Card.selected = null;
                            PixelMode.bDisplayOkPanel = false;
                            PixelMode.listToGoTo = "";
                        }
                    }
                }
            }

                Button.currentList.every(b => {
                    if (b.getState() != Button.STATE.Inactive && !b.bMoving) {
                        if (b.getState() == Button.STATE.Hover) {                        
    
                            if ((b.getSprite().class == 9 && b.getSprite().tl.currentAnimation.name != "down")
                                || (b.getSprite().class != 9 && b.getSprite().currentAnimation.name != "down")
                            ) {
                                return false;
                            }
    
                            if (b.getHoverOffset()) {
                                let func = translate.bind(b, { x: b.getHoverOffset().x, y: b.getHoverOffset().y }, true);
                                func();
                            }

                            if (b.bTextOffsetChanged) b.resetOffsets();
    
                            if (b.sound != "") {
                                if (b.id_test != "go") {
                                    Sound.play(b.sound);
                                } else {
                                    setTimeout(() => {
                                        Sound.play(b.sound);
                                    }, 500);
                                }
                            }
    
                            if (b instanceof CheckboxBtn) {
                                if (b.bChecked) {
                                    // b.setState(Button.STATE.Normal);
                                } else {
                                    b.setState(Button.STATE.Normal);
                                    b.changeSpriteAnimation("normal");
                                    b.check();
                                }
                            } else {
                                b.setState(Button.STATE.Normal);
                                b.changeSpriteAnimation("normal");
                            }
                            MOUSE_SPRITE.changeAnimation("normal");
    
                            if (b.callback.cb != null && b.callback.arg != null) {
                                b.callback.cb(b.callback.arg);
                            } else {
                                b.callback();
                            }
                            if (b.hoverCB) {
                                b.getTooltip().forEach(sp => {
                                    if (sp instanceof Sprite) {
                                        sp.delete = true;
                                    } else {
                                        sp.getSprite().delete = true;
                                    }
                                });
                            }
                            return false;
                        } else {
                            if (b.bTextOffsetChanged) b.resetOffsets();
                        }
                    }
                    return true;
                });
    
                if (Input.bKeyboardActive) {
                    Input.keyboardList.every(b => {
                        if (b.getState() != Button.STATE.Inactive && !b.bMoving) {
                            if (b.getState() == Button.STATE.Hover) {
    
                                if (b.id_test == "key") {
                                    // Sound.play("click");
                                }
    
                                if ((b.getSprite().class == 9 && b.getSprite().tl.currentAnimation.name != "down")
                                    || (b.getSprite().class != 9 && b.getSprite().currentAnimation.name != "down")
                                ) {
                                    return false;
                                }
    
                                if (b.getHoverOffset()) {
                                    let func = translate.bind(b, { x: b.getHoverOffset().x, y: b.getHoverOffset().y }, true);
                                    func();
                                }
    
                                if (b.bTextOffsetChanged) b.resetOffsets();
    
                                b.setState(Button.STATE.Normal);
                                b.changeSpriteAnimation("normal");
                                MOUSE_SPRITE.changeAnimation("normal");
    
                                if (b.callback.cb != null && b.callback.arg != null) {
                                    b.callback.cb(b.callback.arg);
                                } else {
                                    b.callback();
                                }
                                if (b.hoverCB) {
                                    b.getTooltip().forEach(sp => {
                                        if (sp instanceof Sprite) {
                                            sp.delete = true;
                                        } else {
                                            sp.getSprite().delete = true;
                                        }
                                    });
                                }
                                return false;
                            }
                        }
                        return true;
                    });
                }
    
                // Check after a screen change if the mouse isn't hovering
    
                if (!inTransition()) {
    
                    Button.currentList.every(b => {
                        if (b.getState() != Button.STATE.Inactive && !b.bMoving) {
                            if (CollisionManager.MouseCollision(mouseX, mouseY, b.x, b.y, b.getSize().w, b.getSize().h)) {
                                if (b.hoverCB && b.getState() != Button.STATE.Hover) {
                                    b.hoverCB.cb(b.hoverCB.arg);
                                }
    
                                if (b instanceof CheckboxBtn) {
                                    if (b.bChecked) {
                                    } else {
                                        b.setState(Button.STATE.Hover);
                                        b.changeSpriteAnimation("hover");
                                        MOUSE_SPRITE.changeAnimation("hover");
                                    }
                                } else {
                                    b.setState(Button.STATE.Hover);
                                    b.changeSpriteAnimation("hover");
                                    MOUSE_SPRITE.changeAnimation("hover");

                                }
    
                                
                                return false;
                            } else {
                                if (b.getState() == Button.STATE.Hover) {
                                    if (b.bTextOffsetChanged) b.resetOffsets();
                                    b.setState(Button.STATE.Normal);
                                    b.changeSpriteAnimation("normal");
                                    MOUSE_SPRITE.changeAnimation("normal");
                                }
                            }
                        }
                        return true;
                    });
    
                    if (Input.bKeyboardActive && !Login.bLoading) {
    
                        Input.keyboardList.every(b => {
                            if (b.getState() != Button.STATE.Inactive && !b.bMoving) {
                                if (CollisionManager.MouseCollision(mouseX, mouseY, b.x, b.y, b.getSize().w, b.getSize().h)) {
                                    if (b.hoverCB && b.getState() != Button.STATE.Hover) {
                                        b.hoverCB.cb(b.hoverCB.arg);
                                    }
                                    if (b.bTextOffsetChanged) b.resetOffsets();
    
                                    b.setState(Button.STATE.Hover);
                                    b.changeSpriteAnimation("hover");
                                    MOUSE_SPRITE.changeAnimation("hover");
                                    return false;
                                } else {
                                    if (b.getState() == Button.STATE.Hover) {
                                        if (b.bTextOffsetChanged) b.resetOffsets();
                                        b.setState(Button.STATE.Normal);
                                        b.changeSpriteAnimation("normal");
                                        MOUSE_SPRITE.changeAnimation("normal");
                                    }
                                }
                            }
                            return true;
                        });
                    }
    
                }
    
            // }
        }
        if (TRANSITION) {
            MOUSE_SPRITE.changeAnimation("normal");
        }
    }
}

if (Input.DOUBLE_CLICK) {
    canvas.addEventListener("dblclick", e => {

        if (!inTransition() && e.button == 0 && mainState != MAIN_STATE.Error) {
            const mouseX = e.layerX / SCALE_X;
            const mouseY = e.layerY / SCALE_Y;

            let lastHSDC = [];

            let bCollideHSDC = false;
            if (mainState === MAIN_STATE.Game) {
                if (Game.bDeckHover) return;
                Game.HSDC_LIST.forEach(HSDC => {
                    lastHSDC[HSDC.type] = Game.getLastOf(HSDC.type);
                    if (CollisionManager.MouseCollision(mouseX, mouseY, HSDC.x, HSDC.y, HSDC.w, HSDC.h)) {
                        bCollideHSDC = true;
                    }
                });
            } else if (mainState === MAIN_STATE.PixelMode) {
                if (PixelMode.bDeckHover) return;
                PixelMode.HSDC_LIST.forEach(HSDC => {
                    lastHSDC[HSDC.type] = PixelMode.getLastOf(HSDC.type);
                    if (CollisionManager.MouseCollision(mouseX, mouseY, HSDC.x, HSDC.y, HSDC.w, HSDC.h)) {
                        bCollideHSDC = true;
                    }
                });
            }
            if (bCollideHSDC) return;
            
            let bOneCollision = false;
            let bCollidingDeck2 = false;
            let bOkGo = false;

            if (mainState === MAIN_STATE.Game) {
                let card = Game.getLastOf("deck2");
                if (card !== null) {
                    if (CollisionManager.MouseCollision(mouseX, mouseY, card.x, card.y, card.width, card.height)) {
                        bCollidingDeck2 = true;
                        if (lastHSDC[card.type] !== null) {
                            if (Card.check(card.name, card.type, lastHSDC[card.type].name, card.type, false)) {
                                bOkGo = true;
                            }
                        } else {
                            if (card.name === "A") {
                                bOkGo = true;
                            }
                        }
                    }
                }

                if (!bCollidingDeck2) {
                    card = null;
                    Game.POS_LIST.forEach(pos => { //? Collision with c1 c2 etc.
                        if (!bOkGo) {
                            // log("pos: ")
                            // log(pos.list)
                            card = Game.getLastOf(pos.list);
                            // log("card last of " + pos.list) 
                            // log(card)
                            if (card !== null) {
                                if (CollisionManager.MouseCollision(mouseX, mouseY, card.x, card.y, card.width, card.height)) {
                                    // log("collision with : " + card.infos());
                                    //? Collision with last card of c1, c2 etc.
                                    if (lastHSDC[card.type] !== null) {
                                        if (Card.check(card.name, card.type, lastHSDC[card.type].name, card.type, false)) {
                                            bOkGo = true;
                                        }
                                    } else {
                                        if (card.name === "A") {
                                            bOkGo = true;
                                        }
                                    }
    
                                }
                                
                            }
                        }
                    })
                }

                if (bOkGo) {
                    Game.HSDC_LIST.forEach(HSDC => {
                        if (HSDC.type === card.type) {
                            Game.OK_PANEL.x = HSDC.x
                            Game.OK_PANEL.y = HSDC.y;
                        }
                    });

                    Game.listToGoTo = card.type;

                    Card.selected = card;
                    
                    yomiText.element.innerHTML = "";
                    Card.inTransition = Card.selected;
                    Card.selected.bMoving = true;
                    TRANSITION = true;
                    Game.bDeck2Hover = false;

                    let newSprite = new Sprite({ w: 48, h: 64 }, Card.selected.x, Card.selected.y, null, "mc"); //? Moving Card
                    newSprite.addAnimation("normal", { x: Card.selected.getSprite().getAnimation("normal").origin.x, y: Card.selected.getSprite().getAnimation("normal").origin.y });
                    newSprite.changeAnimation("normal");
                    newSprite.setDestination({ x: Game.OK_PANEL.x, y: Game.OK_PANEL.y });
                    newSprite.setMoveSpeed(0.5);
                    Game.movingList.push(newSprite);
                        
                    if (Game.currentGameType !== Game.GAME_TYPE.Normal) {
                        let kanjiSprite = new Sprite({ w: 46, h: 38 }, 1, 13, newSprite, "mcc"); //? Moving Card Child
                        kanjiSprite.addAnimation("normal", { x: 336, y: 16});
                        kanjiSprite.changeAnimation("normal");
                        Game.movingList.push(kanjiSprite);
                    }

                    Game.lists[Card.selected.position].pop();
                    Game.lists[Game.listToGoTo].push(Card.selected.sp);
                    Card.selected.position = Game.listToGoTo;
                    Card.selected.bSelect = false;

                    Game.bDisplayOkPanel = false;
                    Card.selected = null;
                    Game.listToGoTo = "";
                    if (Game.lists["deck"].length === 0 && Game.lists["deck2"].length === 0) {
                        Game.DECK.changeAnimation("void");
                    }
                    return;
                }
            } else if (mainState === MAIN_STATE.PixelMode) {
                let card = PixelMode.getLastOf("deck2");
                if (card !== null) {
                    if (CollisionManager.MouseCollision(mouseX, mouseY, card.x, card.y, card.width, card.height)) {
                        bCollidingDeck2 = true;
                        if (lastHSDC[card.type] !== null) {
                            if (Card.check(card.name, card.type, lastHSDC[card.type].name, card.type, false)) {
                                bOkGo = true;
                            }
                        } else {
                            if (card.name === "A") {
                                bOkGo = true;
                            }
                        }
                    }
                }

                if (!bCollidingDeck2) {
                    card = null;
                    PixelMode.POS_LIST.forEach(pos => { //? Collision with c1 c2 etc.
                        if (!bOkGo) {
                            // log("pos: ")
                            // log(pos.list)
                            card = PixelMode.getLastOf(pos.list);
                            // log("card last of " + pos.list) 
                            // log(card)
                            if (card !== null) {
                                if (CollisionManager.MouseCollision(mouseX, mouseY, card.x, card.y, card.width, card.height)) {
                                    // log("collision with : " + card.infos());
                                    //? Collision with last card of c1, c2 etc.
                                    if (lastHSDC[card.type] !== null) {
                                        if (Card.check(card.name, card.type, lastHSDC[card.type].name, card.type, false)) {
                                            bOkGo = true;
                                        }
                                    } else {
                                        if (card.name === "A") {
                                            bOkGo = true;
                                        }
                                    }
    
                                }
                                
                            }
                        }
                    })
                }

                if (bOkGo) {
                    PixelMode.HSDC_LIST.forEach(HSDC => {
                        if (HSDC.type === card.type) {
                            PixelMode.OK_PANEL.x = HSDC.x
                            PixelMode.OK_PANEL.y = HSDC.y;
                        }
                    });

                    PixelMode.listToGoTo = card.type;

                    Card.selected = card;
                    
                    yomiText.element.innerHTML = "";
                    Card.inTransition = Card.selected;
                    Card.selected.bMoving = true;
                    TRANSITION = true;
                    PixelMode.bDeck2Hover = false;

                    let newSprite = new Sprite({ w: 24, h: 37 }, Card.selected.x, Card.selected.y, null, "mc"); //? Moving Card
                    newSprite.addAnimation("normal", { x: Card.selected.getSprite().getAnimation("normal").origin.x, y: Card.selected.getSprite().getAnimation("normal").origin.y });
                    newSprite.changeAnimation("normal");
                    newSprite.setDestination({ x: PixelMode.OK_PANEL.x, y: PixelMode.OK_PANEL.y });
                    newSprite.setMoveSpeed(0.5);
                    PixelMode.movingList.push(newSprite);
                        
                    PixelMode.lists[Card.selected.position].pop();
                    PixelMode.lists[PixelMode.listToGoTo].push(Card.selected.sp);
                    Card.selected.position = PixelMode.listToGoTo;
                    Card.selected.bSelect = false;

                    PixelMode.bDisplayOkPanel = false;
                    Card.selected = null;
                    PixelMode.listToGoTo = "";
                    if (PixelMode.lists["deck"].length === 0 && PixelMode.lists["deck2"].length === 0) {
                        PixelMode.DECK.changeAnimation("void");
                    }
                    return;
                }
            }


            
        }

    });
}

/**
 *
 * FIN GESTION MENU MOUSE
 *
 */
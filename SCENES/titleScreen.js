class TitleScreen {

    static STATE = Object.freeze({
        Main: 0,
    });

    static currentState = TitleScreen.STATE.Main;

    static list = [];

    constructor() {
    }

    static init() {
        canvas.style.backgroundColor = CANVAS_ORIGIN_COLOR;

        let normalBtn = new Button({ w: 60, h: 24, v: 7}, centerX(60), 100, null, { cb: TitleScreen.start, arg: 1 }, "TitleScreen", TitleScreen.STATE.Main, "NORMAL", 1);
        normalBtn.setFreeLabel();
        normalBtn.setFontColor(CARD_BTN_SDW_COLOR, BLACK_COLOR, CARD_BTN_SDW_COLOR);
        TitleScreen.list.push(normalBtn.getSprite());

        let pixelBtn = new Button({ w: 60, h: 24, v: 7}, centerX(60), 130, null, { cb: TitleScreen.start, arg: 2 }, "TitleScreen", TitleScreen.STATE.Main, "PIXEL", 1);
        pixelBtn.setFreeLabel();
        pixelBtn.setFontColor(CARD_BTN_SDW_COLOR, BLACK_COLOR, CARD_BTN_SDW_COLOR);
        TitleScreen.list.push(pixelBtn.getSprite());

        let kanjiBtn = new Button({ w: 60, h: 24, v: 7}, centerX(60), 160, null, { cb: TitleScreen.start, arg: 3 }, "TitleScreen", TitleScreen.STATE.Main, "漢字", 1);
        kanjiBtn.setFreeLabel();
        kanjiBtn.setFontColor(CARD_BTN_SDW_COLOR, BLACK_COLOR, CARD_BTN_SDW_COLOR);
        TitleScreen.list.push(kanjiBtn.getSprite());

        let hanziBtn = new Button({ w: 60, h: 24, v: 7}, centerX(60), 190, null, { cb: TitleScreen.start, arg: 4 }, "TitleScreen", TitleScreen.STATE.Main, "中文", 1);
        hanziBtn.setFreeLabel();
        hanziBtn.setFontColor(CARD_BTN_SDW_COLOR, BLACK_COLOR, CARD_BTN_SDW_COLOR);
        TitleScreen.list.push(hanziBtn.getSprite());

        Button.resetTypeState("TitleScreen", TitleScreen.STATE.Main);
    }

    static start(pArg) {
        switch(pArg) {
            case 1:
                mainState = MAIN_STATE.Game;
                Game.currentGameType = Game.GAME_TYPE.Normal;
                PIXEL_MODE = 1;
                Card.initCardList();
                changeMode();
                break;
            case 2:
                changeMode();
                break;
            case 3:
                mainState = MAIN_STATE.Game;
                Game.currentGameType = Game.GAME_TYPE.Kanji;
                PIXEL_MODE = 1;
                Card.initCardList();
                changeMode();
                break;
            case 4:
                mainState = MAIN_STATE.Game;
                Game.currentGameType = Game.GAME_TYPE.Hanzi;
                PIXEL_MODE = 1;
                Card.initCardList();
                changeMode();
                break;
        }
    }

    static update(dt) {

        Sprite.manageBeforeUpdating(TitleScreen.list, dt);

        Panel.currentList.forEach(p => {
            p.update(dt)
        });

        TitleScreen.list = TitleScreen.list.filter(sp => {
            return !sp.delete;
        });
    }

    static draw(ctx) {
        Sprite.manageBeforeDrawing(TitleScreen.list);
    }

}
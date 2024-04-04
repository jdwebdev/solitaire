class LanguageScreen {

    static STATE = Object.freeze({
        Main: 0,
    });

    static currentState = LanguageScreen.STATE.Main;

    static list = [];

    constructor() {
    }

    static init() {
        canvas.style.backgroundColor = CANVAS_ORIGIN_COLOR;

        let frBtn = new Button({ w: 80, h: 40, v: 6 }, centerX(80), centerY(40, 30), null, { cb: LanguageScreen.changeLanguage, arg: "fr" }, "LanguageScreen", LanguageScreen.STATE.Main, "french_lang", 41);
        frBtn.setFontColor(RED_BTN_SDW_COLOR);
        frBtn.setOffsets(0, 22);
        LanguageScreen.list.push(frBtn.getSprite());

        let enBtn = new Button({ w: 80, h: 40, v: 6 }, centerX(80), centerY(50, 30, 1), null, { cb: LanguageScreen.changeLanguage, arg: "en" }, "LanguageScreen", LanguageScreen.STATE.Main, "english_lang", 41);
        enBtn.setFontColor(RED_BTN_SDW_COLOR);
        enBtn.setOffsets(0, 22);
        LanguageScreen.list.push(enBtn.getSprite());

        Button.resetTypeState("LanguageScreen", LanguageScreen.STATE.Main);
    }

    static changeLanguage(pLang) {        
        switch (pLang) {
            case "en":
                LANG = translationEn;
                break;
            case "fr":
                LANG = translationFr;
                break;
            case "jp":
                LANG = translationJp;
                break;
            default:
                LANG = translationEn;
        }
        if (!MainMenu.bInit) {
            if (!Input.bInit) {
                Input.init();
            }
            Login.init();
        }

    }

    static load() {
        LanguageScreen.currentState = LanguageScreen.STATE.Game;
    }

    static update(dt) {

        Sprite.manageBeforeUpdating(LanguageScreen.list, dt);

        Panel.currentList.forEach(p => {
            p.update(dt)
        });

        LanguageScreen.list = LanguageScreen.list.filter(sp => {
            return !sp.delete;
        });
    }

    static draw(ctx) {
        Sprite.manageBeforeDrawing(LanguageScreen.list);
    }

}
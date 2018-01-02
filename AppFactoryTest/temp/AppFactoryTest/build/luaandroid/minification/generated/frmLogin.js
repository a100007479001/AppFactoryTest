function addWidgetsfrmLogin() {
    frmLogin.setDefaultUnit(kony.flex.DP);
    var lblTest = new kony.ui.Label({
        "id": "lblTest",
        "isVisible": true,
        "left": "0dp",
        "skin": "slLabel",
        "text": "This is a test App factory project",
        "textStyle": {
            "letterSpacing": 0,
            "strikeThrough": false
        },
        "top": "121dp",
        "width": kony.flex.USE_PREFFERED_SIZE,
        "zIndex": 1
    }, {
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {
        "textCopyable": false
    });
    frmLogin.add(lblTest);
};

function frmLoginGlobals() {
    frmLogin = new kony.ui.Form2({
        "addWidgets": addWidgetsfrmLogin,
        "enabledForIdleTimeout": false,
        "id": "frmLogin",
        "layoutType": kony.flex.FREE_FORM,
        "needAppMenu": true,
        "skin": "slForm"
    }, {
        "displayOrientation": constants.FORM_DISPLAY_ORIENTATION_PORTRAIT,
        "layoutType": kony.flex.FREE_FORM,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {
        "footerOverlap": false,
        "headerOverlap": false,
        "menuPosition": constants.FORM_MENU_POSITION_AFTER_APPMENU,
        "retainScrollPosition": false,
        "titleBar": true,
        "titleBarSkin": "slTitleBar",
        "windowSoftInputMode": constants.FORM_ADJUST_PAN
    });
};
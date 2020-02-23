/*
Declaring a new presence instance
*/
const presence = new Presence({
    clientId: "546040040153939969",
    mediaKeys: false
});
/*
Detecting when data updates on the page with UpdateData event
*/
presence['on']("UpdateData", () => {
    /*
    Declaring presence data
    */
    const presenceData = {
        largeImageKey: "ayat_dark",
        startTimestamp: Math.floor(Date.now() / 1000)
    };
    /* If the pathname is / , then attach a details key to the presence data*/
    if (document['location']['pathname'] == '/') {
        presenceData['details'] = "تصفح الصفحة الرئيسية";
    }
    /* If the pathname is /ayat/ , then attach a details key to the presence data*/
    else if (document['location']['pathname'] == '/help/help.pdf') {
        presenceData['details'] = "دليل الاستخدام";
    }
    /* If the pathname is help/help.pdf , then attach a details key to the presence data*/
    else if (document['location']['pathname'] == '/ayat/') {
        switch ((new Url(document['location']['href']))['searchParams']['get']('pg')) {
            /* If the url param pg is contact , then attach a details key to the presence data*/
            case 'contact':
                presenceData['details'] = "اتصل بنا";
                break;
                /* If the case above evaluates to false , then attach a details key to the presence data*/
            default:
                presenceData['details'] = "صفحة تحميل التطبيق";
                break;
        }
    }
    /* If the cases above evaluates to false , then go to this */
    else {
        /* If the play button style is blank , then attach read mode related keys to the presence data*/
        if (document.querySelector('#jp_interface_1 > ul > li:nth-child(1) > a').style.display.length < 1) {
            presenceData['smallImageKey'] = 'book';
            presenceData['smallImageText'] = 'وضع القراءة';
            presenceData['details'] = `قرأ القرآن برواية   : ${document.querySelector('#sel_mosshaf > li:nth-child(2) > a').innerText}`;
            presenceData['state'] = ` سورة ${document['querySelector'] ('#tb_sura').innerText} / آية ${document['querySelector'] ('#tb_aya').innerText} / الجزء ${document['querySelector'] ('#tb_juz').innerText}`;
            /* If the case above evaluates to false , then attach listen mode related keys to the presence data*/
        } else {
            presenceData['smallImageKey'] = 'headset';
            presenceData['smallImageText'] = 'وضع الاستماع';
            presenceData['details'] = `القارئ  : ${document.querySelector('#qaree_selector > a').innerText}`;
            presenceData['state'] = ` سورة ${document['querySelector'] ('#tb_sura').innerText} / آية ${document['querySelector'] ('#tb_aya').innerText} / الجزء ${document['querySelector'] ('#tb_juz').innerText}`;
        }
    }
    /* Set the activity with the presence data */
    presence['setActivity'](presenceData);
});

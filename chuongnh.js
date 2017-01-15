
var interval = 1000;

$.getScript("https://cdnjs.cloudflare.com/ajax/libs/notify/0.4.2/notify.min.js");
$(document).ready(function () {


    // remove attr disabled
    $('.classCheckChon').removeAttr("disabled");

    // Form Submitting after 1 seconds.
    var auto_refresh = setInterval(function () {

        console.log('Đang đăng ký. Xin vui lòng chờ.....');
        doSubmit();
        registerSubject();

    }, interval);

    function registerSubject() {
        var mypath = AddressUrl;
        var hideval = $('#chk_hidden').val();
        var StudyUnitID = $('#StudyUnitID').val();
        var CurriculumID = $('#CurriculumID').val();
        $.ajax({
            type: 'GET',
            url: mypath + '/DangKiHocPhan?StudyUnitID=' + StudyUnitID + '&CurriculumID=' + CurriculumID + '&Hide=' + hideval + '&t=' + Math.random(),
            async: true,
            dataType: 'html',
            success: function (html) {
                $.notify(html, "success", [{ autoHide: true, autoHideDelay: interval }]);
                //console.log(html);
            }
        })
            .fail(
            function (jqXHR, textStatus, err) {
                $.notify(err, "warn");
                //console.log(err);
            });
    }

    function doSubmit() {
        document.forms.Frm.hdID.value = "";
        for (var i = 0; i < document.forms.Frm.elements.length; i++) {
            if (document.forms.Frm.elements[i].type == "radio") {
                if (document.forms.Frm.elements[i].checked == true) {
                    document.forms.Frm.hdID.value += document.forms.Frm.elements[i].id + "|";
                }
            }
        }
    }
})

function PopupDanhSachLop(StudyUnitID, CurriculumID) {
    window.open(AddressUrl + '/' + 'DangKiNgoaiKeHoach/DanhSachLopHocPhan/' + StudyUnitID + "?CurriculumID=" + CurriculumID + "&t=" + Math.random(), '_blank');
}

var countDel = 0;
//confirm delete dialog :
function ConfirmDelete(MaHocPhan) {
    $.messager.confirm("Lưu ý ", "Bạn có muốn xóa học phần '" + MaHocPhan + "' không ?", function (r) {
        if (r) {
            var time = prompt("Tốc độ gửi request (mili s):", 1000);
            $('#DanhSachHocPhanDaDangKi').append("<b id='notify-delete'></b>");
            if (time != null) {
                setInterval(function () {
                    myXoaHocPhan(MaHocPhan);
                }, time);
            }
        }
        else {
            //false
        }
    });
}

function myXoaHocPhan(MaHocPhan) {
    //ProgressShow();
    var mypath = AddressUrl;
    try {
        $.ajax({
            type: 'GET',
            url: mypath + '/DangKiThanhCong/DeleteHocPhan/' + MaHocPhan + "?t=" + Math.random(),
            async: true,
            dataType: 'html',
            success: function (html) {
                $('#notify-delete').html('<b>[' + MaHocPhan + '] ' + html + '(' + (++countDel) + ')</b>');
                console.log(html);
                //DanhSachHocPhanDaDangKi();
                //ProgressHide();
                //DialogAlert("Thông báo", html, "info");
            },
        })
            .fail(
            function (jqXHR, textStatus, err) {
                // ProgressHide();
                //DialogAlert("Lỗi kết nối", "Kết nối không thành công :"+ err, "error");
                console.log("Kết nối không thành công :" + err);
            });
    }
    catch (err_) {
        //ProgressHide();
    }

}

function mydoSubmit() {
    document.forms.Frm.hdID.value = "";
    for (var i = 0; i < document.forms.Frm.elements.length; i++) {
        if (document.forms.Frm.elements[i].type == "radio") {
            if (document.forms.Frm.elements[i].checked == true) {
                document.forms.Frm.hdID.value += document.forms.Frm.elements[i].id + "|";
            }
        }
    }
}

function mydoSubmitAll() {
    document.forms.Frm.hdID.value = "";
    for (var i = 0; i < document.forms.Frm.elements.length; i++) {
        if (document.forms.Frm.elements[i].type == "radio") {
            document.forms.Frm.elements[i].checked == true
            document.forms.Frm.hdID.value += document.forms.Frm.elements[i].id + "|";
            myAjaxDangKiHocPhan();
        }
    }
    //location.reload();
}

var submit_count = 0;
function myAjaxDangKiHocPhan() {
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
            console.log(html);
            $('#notify').html('<b>' + html + '(' + (++submit_count) + ')</b>');
        }
    })
        .fail(
        function (jqXHR, textStatus, err) {
            console.log(err);
        });
}

if (window.location.href.indexOf('DanhSachLopHocPhan') != -1) {

    //===========================================================
    //$('table').addClass('table table-bordered');
    //$('.button').addClass('btn btn-primary');
    //===========================================================
    var interval = null;
    // remove attr disabled
    $('.classCheckChon').removeAttr("disabled");
    $('form').append("<b id='notify'>Vui lòng chọn lớp và nhấn nút đăng ký.</b>");

    $('.button')[0].onclick = null;
    //$('.button')[1].onclick = null;
    //$('.button')[1].value = 'Đăng ký (All)';

    $('.button')[0].addEventListener('click', function () {
        if ($('.button')[0].value.indexOf('Đăng ký') != -1) {
            alert('Server đang bảo trì, vui lòng quay lại sau!');
            return;
            /*var time = prompt("Tốc độ gửi request (mili s):", 1000);
            if (time != null) {
                interval = setInterval(function () {
                    mydoSubmit();
                    myAjaxDangKiHocPhan();
                    console.log("mydoSubmit time: " + time);
                }, time);
                $('.button')[0].value = 'Dừng lại';
                $('.button')[1].disabled = true;
            }*/
        } else {
            clearInterval(interval);

            $('.button')[0].value = 'Đăng ký';
            $('.button')[1].disabled = false;
        }
    }, false);


    // $('.button')[1].addEventListener('click', function () {
    //     if ($('.button')[1].value.indexOf('Đăng ký (All)') != -1) {
    //         var time = prompt("Tốc độ gửi request (mili s):", 1000);

    //         if (time != null) {
    //             interval = setInterval(function () {
    //                 mydoSubmitAll();
    //                 console.log("mydoSubmitAll time: " + time);
    //             }, time);
    //             $('.button')[1].value = 'Dừng lại (All)';
    //             $('.button')[0].disabled = true;
    //         }
    //     } else {
    //         clearInterval(interval);
    //         $('.button')[1].value = 'Đăng ký (All)';
    //         $('.button')[0].disabled = false;
    //     }
    // }, false);
}
else {
    //PopupDanhSachLop('162ECOM430984', 'lmgPbT9QJCU=');
}

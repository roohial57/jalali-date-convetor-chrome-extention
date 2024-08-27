

$(function () {
    goToToday();
    $("#txtGDate").change(() => {
        $("#txtGDate").removeClass("border-warning");
    });
    $("#txtJDate").change(() => {
        $("#txtJDate").removeClass("border-warning");
    });
    $("#btnGToJ").click(() => {
        try {
            const gDate = $("#txtGDate").val();
            const jDate = gToJ(gDate);
            $("#txtJDate").val(jDate);
        }
        catch {
            $("#txtGDate").addClass("border-warning");
        }
    });
    $("#btnJToG").click(() => {
        try {
            const date = jToG($("#txtJDate").val());
            $("#txtGDate").val(date);
        }
        catch {
            $("#txtJDate").addClass("border-warning");
        }
    });
    $("#btnToday").click(() => {
        goToToday();
    });
});
function goToToday() {
    const today = new Date();
    const gDate = today.toISOString().substring(0, 10);
    $("#txtGDate").val(gDate);
    $("#txtJDate").val(gToJ(gDate));
}
function jToG(jDate) {
    const jDateArr = jDate.split(/[^0-9]/);
    const gDate = jalaali.jalaaliToDateObject(parseInt(jDateArr[0]), parseInt(jDateArr[1]), parseInt(jDateArr[2]));
    return gDate.toISOString().substring(0, 10);
}
function gToJ(gDate) {
    const date = new Date(gDate);
    return new Intl.DateTimeFormat('fa-IR-u-nu-latn').format(date);
}
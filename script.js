

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



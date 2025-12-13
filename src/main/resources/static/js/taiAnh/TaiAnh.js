function start() {
    // Lấy giá trị của radio button được checked trong nhóm 'browser'
    var selectedBrowser = $('input[name="browser"]:checked').val();

    // Lấy giá trị của radio button được checked trong nhóm 'profileMode'
    var selectedProfileMode = $('input[name="profileMode"]:checked').val();

    // In ra giá trị đã chọn
    console.log('Trình duyệt chạy bot: ' + selectedBrowser);  // In ra trình duyệt được chọn
    console.log('Dạng chạy: ' + selectedProfileMode);  // In ra dạng chạy được chọn
    $.ajax({
        type: "POST",
        url: "/dowload-image-res/get-dowload-image-main",
        contentType: "application/json",
        data: JSON.stringify({
            brow: selectedBrowser,
            profile: selectedProfileMode
        }),
        success: async function (response) {

        },
        error: function (xhr) {
            console.error('loi ' + xhr.responseText)
        }
    })
}



$(document).ready(function() {
    gitHubContributors();

});
function gitHubContributors() {

    var
        howMany = 70,
        baseUrl = 'https://api.github.com/repos/hechoendrupal/DrupalConsole/contributors?per_page=' + howMany + '&callback=?',
        $contributorsOutput = $("#contributors-list"),
        $pager = $(".pager");

    function _listContributors(data) {
        $contributorsOutput.html("");
        var html = '';
        $(data).each(function(i, user) {
            html += '<li><a href="' + user.url.replace('api.', '').replace('users/', '') + '"><img src="' + user.avatar_url + '" alt="' + user.login + '" class="contributor-avatar"></a></li>';
        });
        $contributorsOutput.html(html);
    }

    function _getContributors(apiUrl) {
        $.ajax({
            type: 'GET',
            url: apiUrl,
            async: true,
            crossDomain: true,
            contentType: "application/json",
            dataType: 'jsonp',
            success: function(data) {
                if (data.meta.status != "200") {
                    _throwError(data.meta);
                } else {
                    _listContributors(data.data); // output contribs
                }
            },
            error: function(e) {
                console.log(e.message);
            }
        });
    }

    function _throwError(data) {
        $contributorsOutput.text("Error");
        console.log(data);
    }
    _getContributors(baseUrl);
}

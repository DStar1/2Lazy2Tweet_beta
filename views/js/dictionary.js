$(document).ready(function () {

    $.getJSON('/api/posts', printTerms);
    $('form').submit(function (e) {
        e.preventDefault();
        $.post('/api/posts', {date: $('#date').val(), post: $('#post').val()}, printTerms);
        this.reset();
    });

});

function printTerms(terms) {
    $('body>dl').empty();
    $.each(terms, function () {
        $('<dt>').text(this.date).appendTo('body>dl');
        $('<dd>').text(this.post).appendTo('body>dl');
    });
    $('dt').off('dblclick').dblclick(function() {
        $.ajax({
            url: '/api/posts/' + $(this).text(),
            type: 'DELETE',
            success: printTerms
        });
    });
}

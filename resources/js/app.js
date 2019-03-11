require('./bootstrap');

$(document).ready(function () {
    let api_url = 'http://rest.test/api/items/';

    getItems();

    // Get items from API
    function getItems() {
        $.ajax({
            url: api_url
        }).done(function (items) {
            let output = '';
            $.each(items, function (key, item) {
                output += `
             <li class="list-group-item">
                <strong>${item.text}: </strong>${item.body} <a href="#" class="deleteLink" data-id="${item.id}">Delete</a>
              </li>
            `;
            });
            $('.items').append(output);
        });
    }

    // Submit event
    $('#itemForm').on('submit', function (e) {
        e.preventDefault();

        let text = $('#text').val();
        let body = $('#body').val();

        addItem(text, body);
    });

    // Delete event
    $('body').on('click', '.deleteLink', function(e){
        e.preventDefault();

        let id = $(this).data('id');

        deleteItem(id);
    });

    // Delete item through api
    function deleteItem(id) {
        $.ajax({
            method: 'POST',
            url: api_url + id,
            data: {_method: 'DELETE'}
        }).done(function (item) {
            alert('Item Removed');
            location.reload();
        });
    }

    // Insert items using api
    function addItem(text, body) {
        $.ajax({
            method: 'POST',
            url: api_url,
            data: {text: text, body: body}
        }).done(function (item) {
            alert('Item # ' + item.id + ' added');
            location.reload();
        });
    }
});
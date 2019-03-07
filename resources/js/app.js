
require('./bootstrap');

$(document).ready(function(){
    getItems();

    // Get items from API
    function getItems(){

        $.ajax({
            url:'http://rest.test/api/items'
        }).done(function(items){
            let output = '';
            $.each(items, function(key, item){
                output += `
              <li class="list-group-item">
                <strong>${item.text}: </strong>${item.body}
              </li>
            `;
            });
            $('.items').append(output);
        });
    }
});
$(document).ready(function() {
    $('#date_sent_group').datetimepicker({
        format : 'DD/MM/YYYY HH:mm'
    });
    $('#date_group_1').datetimepicker({
        format : 'DD/MM/YYYY HH:mm'
    });
    var nbItems = 1;
    fillWithSavedData();
});

var nbItems = 1;

function fillWithSavedData() {
    if (localStorage.getItem('data') != null) {
        var savedData = JSON.parse(localStorage.getItem('data'));
        console.log('savedData:');
        console.log(savedData);

        // Filling every field except items

        for ( var field in savedData) {
            $('#'+field).val(savedData[field]);
        }

        // Adjusting number of item

        var savedNbItems = savedData['items'].length;
        var diffNbItems = savedNbItems - nbItems;
        if (diffNbItems >= 0) {
            for (var i = 0; i < diffNbItems; i++) {
                addItem();
            }
        }
        else {
            for (var i = 0; i < diffNbItems; i++) {
                removeItem();
            }
        }

        // Filling item fields

        for (var itemIndex = 0; itemIndex < savedNbItems; itemIndex++) {
            var savedItem = savedData['items'][itemIndex];
            var itemId = itemIndex + 1;
            $('#amount_'+itemId).val(savedItem['amount']);
            $('#date__'+itemId).val(savedItem['date']);
            $('#description_'+itemId).val(savedItem['description']);
            $('#units_'+itemId).val(savedItem['units']);
            var savedContractor = savedItem['contractor'];
            $('#contractor_'+itemId).val(savedContractor);
        }
    }
    console.log('Filling form fields with saved data');
}

function addItem() {
    nbItems++;
    var item_template =
        `<div id="item_${nbItems}">
            <h3>Item ${nbItems}</h3>
            <div class="form-group">
                <label for="description_${nbItems}" class="control-label">Description</label>
                <input type="text" class="form-control" placeholder="Description" name="description_${nbItems}" id="description_${nbItems}">
            </div>

            <div class="row">
                <div class="form-group col-md-6">
                    <label for="date__${nbItems}" class="control-label">Date</label>
                    <div class='input-group date' id='date_group_${nbItems}'>
                        <input type='text' class="form-control" name="date__${nbItems}" id="date__${nbItems}" placeholder="Date"/>
                        <span class="input-group-addon">
                        <span class="glyphicon glyphicon-calendar"></span>
                        </span>
                    </div>
                </div>
                <div class="form-group col-md-6">
                    <label for="units_${nbItems}" class="control-label">Duration</label>
                    <input type="text" class="form-control" placeholder="Duration" name="units_${nbItems}" id="units_${nbItems}">
                </div>
            </div>
            <div class="row">
                <div class="form-group col-md-6">
                    <label for="contractor_${nbItems}" class="control-label">Contractor</label>
                    <input type="text" class="form-control" id="contractor_${nbItems}" name="contractor_${nbItems}" placeholder="Contractor Name">
                </div>
                <div class="form-group col-md-6">
                    <label for="amount_${nbItems}" class="control-label">Cost</label>
                    <input type="number" class="form-control" placeholder="Cost (£)" name="amount_${nbItems}" id="amount_${nbItems}">
                </div>
            </div>
        </div>`;
    $("#items").append(item_template);
    $('.date').last().datetimepicker({
        format : 'DD/MM/YYYY HH:mm'
    });
    $('#remove_button').show();
}

function removeItem() {
    if (nbItems > 1) {
        $('#items').children().last().remove();
        nbItems--;
        if(nbItems < 2) {
            $('#remove_button').hide();
        }
    }
}

function generateInvoice() {
    console.log('Generating invoice');
    var pre_data = $('form').serializeArray();

    var data = {};
    var items = [];

    var currentItemIndex = -1;
    for (var i = 0; i < pre_data.length; i++) {
        var name = pre_data[i]['name'];
        var value = pre_data[i]['value'];
        if (name.includes('description_')) {  // new item
            currentItemIndex++;
            items[currentItemIndex] = {};  // new item object
            items[currentItemIndex]['description'] = value;
        } else if (name.includes('date__')) {
            items[currentItemIndex]['date'] = value;
        } else if (name.includes('contractor_')) {
            items[currentItemIndex]['contractor'] = value;
        } else if (name.includes('units_')) {
            items[currentItemIndex]['units'] = value;
        } else if (name.includes('amount_')) {
            items[currentItemIndex]['amount'] = value;
        } else {
            data[name] = value;
        }
    }
    data['items'] = items;
    console.log('data: ');
    console.log(data);

    var net_amount = 0;
    for (var i = 0; i < Object.keys(items).length; i++) {
        net_amount += parseFloat(items[i]['amount']);
    }
    data['net_amount'] = (net_amount).toFixed(2);
    data['tax_amount'] = (parseFloat(data['vat_rate']) / 100 * net_amount).toFixed(2);
    data['gross_amount'] = (parseFloat(net_amount) + parseFloat(data['tax_amount'])).toFixed(2);
    data['invoice_amount'] = data['gross_amount'];

    localStorage.setItem("data", JSON.stringify(data));

    if (window.location.href.indexOf('raw=true') === -1) {
        document.body.innerHTML = Mustache.render(document.body.innerHTML, data);
    }
    fillWithSavedData();
}

function loadImage() { // called automatically when the user chooses a file
    var imgs = document.querySelectorAll('img');
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
        imgs[0].src = reader.result;
        imgs[1].src = reader.result;
    }
    if (file) {
        reader.readAsDataURL(file); //reads the data as a URL
    } else {
        imgs.src = "";
    }
}

function savePDF() {
    location.reload();
    generateInvoice();
    var invoiceWindow = window.open('');
    invoiceWindow.document.write("<link rel='stylesheet' href='css/pdf_styles.css'>");
    invoiceWindow.document.write("<link rel='stylesheet' href='css/pdf_preview_styles.css'>");
    invoiceWindow.document.write("<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css' crossorigin='anonymous'>");
    invoiceWindow.document.write("<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css' crossorigin='anonymous'>");
    invoiceWindow.document.write($('#invoice').html());
}
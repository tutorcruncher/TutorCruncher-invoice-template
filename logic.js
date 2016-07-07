$('#date_sent_group').datetimepicker();

$(document).ready(function() {
    var nbItems = 1;
    var nbOfContractorsPerItem = [];
    nbOfContractorsPerItem[1] = 1; // item 1 has 1 contractor by default
    fillWithSavedData();
});

var nbItems = 1;
var nbOfContractorsPerItem = [];
nbOfContractorsPerItem[1] = 1; // item 1 has 1 contractor by default
var saved = false;

function fillWithSavedData() {
    if (localStorage.getItem('data') != null) {
        var nbOfContractorsPerItem = [];
        nbOfContractorsPerItem[1] = 1; // item 1 has 1 contractor by default
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

        // Adjusting number of contractor

        var savedNbOfContractorsPerItem = [];
        var diffNbContractorsPerItem = [];
        for (var itemIndex = 0; itemIndex < savedNbItems; itemIndex++) {
            var itemId = itemIndex + 1;
            savedNbOfContractorsPerItem[itemIndex] = savedData['items'][itemIndex]['contractors'].length;
            diffNbContractorsPerItem[itemIndex] = savedNbOfContractorsPerItem[itemIndex] - nbOfContractorsPerItem[itemIndex];
            if (diffNbContractorsPerItem[itemIndex] >= 0) {
                for (var j = 0; j < diffNbContractorsPerItem[itemIndex]; j++) {
                    addContractor(itemId);
                }
            }
            else {
                removeContractor(itemId);
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
            if (savedItem['cancelled'] != null) {
                $('#cancelled_'+itemId).val(true);
                $('#cancelled_'+itemId).prop("checked", true);
            }
            for (var contractorIndex = 0; contractorIndex < savedNbOfContractorsPerItem[itemIndex]; contractorIndex++) {
                var contractorId = contractorIndex + 1;
                var savedContractor = savedItem['contractors'][contractorIndex];
                var label = savedContractor.split(': ')[0];
                var name = savedContractor.split(': ')[1];
                $('#contractor_label_'+itemId+'_'+contractorId).val(label);
                $('#contractor_name_'+itemId+'_'+contractorId).val(name);
            }
        }
    }
}

function addItem() {
    nbItems++;
    nbOfContractorsPerItem[nbItems] = 1;
    var item_template =
        `<div id="item_${nbItems}">
                            <h3>Item ${nbItems}</h3>
                            <div class="form-group">
                                <div class='input-group date'>
                                    <input type='text' class="form-control" name="date__${nbItems}" id='date__${nbItems}' placeholder="Date"/>
                                    <span class="input-group-addon">
                                        <span class="glyphicon glyphicon-calendar"></span>
                                    </span>
                                </div>
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Description" name="description_${nbItems}" id="description_${nbItems}">
                            </div>
                            <!--<div class="checkbox">-->
                                    <label>
                                        <input type="checkbox" name="cancelled_${nbItems}" id="cancelled_${nbItems}"> Cancelled
                                    </label>
                                <!--</div>-->
                            <div id="contractors_${nbItems}" class="form-group">
                                    <div id="inner_list_${nbItems}">
                                        <h5>Contractor 1</h5>
                                        <input type="text" class="form-control" id="contractor_label_${nbItems}_1" name="contractor_label_${nbItems}_1" placeholder="Contractor Label">
                                        <input type="text" class="form-control" id="contractor_name_${nbItems}_1" name="contractor_name_${nbItems}_1" placeholder="Contractor Name">
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-xs btn-primary" onclick="addContractor(${nbItems});">Add Contractor</button>
                                        <button type="button" class="btn btn-xs btn-danger" onclick="removeContractor(${nbItems});">Remove Contractor</button>
                                    </div>
                                </div>
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Units" name="units_${nbItems}" id="units_${nbItems}">
                            </div>
                            <div class="form-group">
                                <input type="number" class="form-control" placeholder="Amount (£)" name="amount_${nbItems}" id="amount_${nbItems}">
                            </div>
                     </div>`
    $("#items").append(item_template);
    $('.date').last().datetimepicker();
}

function removeItem() {
    if (nbItems > 1) {
        $('#items').children().last().remove();
        nbOfContractorsPerItem[nbItems] = 0;
        nbItems--;
    }
}

function addContractor(item) {
    nbOfContractorsPerItem[item]++;
    var n = nbOfContractorsPerItem[item];
    var contractor_template =
        `<div>
                          <h5>Contractor ${n}</h5>
                            <input type="text" class="form-control" name="contractor_label_${item}_${n}" id="contractor_label_${item}_${n}" placeholder="Contractor Label">
                            <input type="text" class="form-control" name="contractor_name_${item}_${n}" id="contractor_name_${item}_${n}" placeholder="Contractor Name">
                        </input>`
    $("#inner_list_"+item).append(contractor_template)
}

function removeContractor(item) {
    if (nbOfContractorsPerItem[item] > 1) {
        $('#inner_list_'+item).children().last().remove();
        nbOfContractorsPerItem[item]--;
    }
}

function closeAndGenerate() {
    saved = true;
    $('#myModal').modal('hide'); // then "$('#myModal').on('hidden.bs.modal'..." occurs
}

function generateInvoice() {
    var pre_data = $('form').serializeArray();

    var data = {};
    var items = [];

    var currentItemId = -1;
    var currentContractorId = -1;
    var currentItemContractors = [];
    for (var i = 0; i < pre_data.length; i++) {
        var name = pre_data[i]['name'];
        var value = pre_data[i]['value'];
        if (name.includes('date__')) {  // new item
            currentItemId++;
            items[currentItemId] = {};  // new item object
            items[currentItemId]['date'] = value;
        } else if (name.includes('description_')) {
            items[currentItemId]['description'] = value;
        } else if (name.includes('cancelled_')) {
            items[currentItemId]['cancelled'] = true;
        } else if (name.includes('contractor_label')) {  // new contractor
            currentContractorId++;
            currentItemContractors[currentContractorId] = (value == '' ? value : value + ': ');
        } else if (name.includes('contractor_name_')) {
            currentItemContractors[currentContractorId] += value;
        } else if (name.includes('units_')) {  // done with the contractors for this item
            items[currentItemId]['contractors'] = currentItemContractors; // saving the contractors for this item
            currentItemContractors = [];  // reinitialising the list of contractors for the future item
            currentContractorId = -1;  // reinitialising the current contractor for the future item
            items[currentItemId]['units'] = value;
        } else if (name.includes('amount_')) {
            items[currentItemId]['amount'] = value;
        } else {
            data[name] = value;
        }
    }
    data['items'] = items;

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

$('#myModal').on('hidden.bs.modal', function(e) {
    if (saved) { // so it only happens when the modal is dismissed via the ok button
        generateInvoice();
    }
});

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
    generateInvoice();
    var invoiceWindow = window.open('');
    invoiceWindow.document.write("<link rel='stylesheet' href='css/pdf_styles.css'>");
    invoiceWindow.document.write("<link rel='stylesheet' href='css/pdf_preview_styles.css'>");
    invoiceWindow.document.write("<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css' crossorigin='anonymous'>");
    invoiceWindow.document.write("<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css' crossorigin='anonymous'>");
    invoiceWindow.document.write($('#invoice').html());
}
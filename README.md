# TutorCruncher's Invoice Template

[TutorCruncher](https://tutorcruncher.com)'s default editable invoice template, as well as examples of invoices created from within TutorCruncher.

## Examples

The first example, [example-invoice-charge-via-branch.pdf](https://github.com/tutorcruncher/TutorCruncher-invoice-template/blob/master/example-invoice-charge-via-branch.pdf)
shows an example of lessons charged via the branch, where the invoice is from the branch to the client.

The second example, [example-invoice-charge-via-tutor.pdf](https://github.com/tutorcruncher/TutorCruncher-invoice-template/blob/master/example-invoice-charge-via-tutor.pdf)
shows an example of lessons charged via the tutor; the company is sending an invoice to the client on the tutors behalf. This is why the first page is a summary page
from the company to the client, and each page after that is a breakdown per tutor, from the tutor to the client.

## How to create your own invoice

1. Download the package using the 'Download ZIP' link above.
2. View the invoice_template.html file in your browser locally. (Easiest to open it up in your favourite text editor; generally there is an option to 'View in Browser'.
3. The template has variable's in it, such as `{{ client_name }}`, `{{ net_amount }}`, `{{ logo }}`. To input these for yourself, you can add them to the data.js file 
if you wish. Examples have been included.
4. If you wish to view the file with just the variable names in, then add `raw=true` to the URL.
[Click here to view the file in your browser](http://tutorcruncher.github.io/TutorCruncher-invoice-template/invoice_template.html?raw=true).

To learn more about TutorCruncher, visit https://tutorcruncher.com.
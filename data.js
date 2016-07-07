var data = {
  invoice_label: 'Fake Invoice',

  first_page_subtitle: 'Invoice INV-1234, Page 1 of 2',
  date_sent: '28/06/2016',

  logo: 'tc-box-logo.png',

  client_name: 'John Doe',
  client_street: '123 Example Street',
  client_town: 'London',
  client_country: 'United Kingdom',
  client_postcode: 'WC2A 3BP',
  client_phone: '071234 12345',
  client_email: 'john.doe@example.com',

  branch_name: 'Dinosaur Tutors',
  branch_street: '8A Lower Grosvenor Place, Victoria',
  branch_town: 'London',
  branch_country: 'United Kingdom',
  branch_postcode: 'SW1W 0EN',
  branch_email: 'info@tutorcruncher.com',

  branch_statement_prefix: 'We would ask you to settle the invoice within 7 days.',

  total_charged_via_branch: '£240',
  invoice_amount: '£240',

  please_quote: 'Please quote the invoice reference with your payment.',

  company_name: 'Dinosaur Tutors',
  account_number: '12345678',
  sort_code: '11-22-33',
  bank_address: 'NatWest Bank 141 Ebury St',
  bank_city: 'London',
  bank_postcode: 'SW1W 9QW',

  sub_invoices:true,

  page_subtitle: 'Invoice INV-1234, Page 2 of 2',

  payee_website: 'https://tutorcruncher.com',
  payee_email: 'info@tutorcruncher.com',

  items: [
    {
      date: '28/06/2016 17:20',
      description:'Maths',
      cancelled: false,
      contractors:[
        {contractor:'Brain Johnston'},
        {contractor:'Jeremy Tutoringkoff'},
      ],
      contractor_label: 'Tutor',
      units: '1 hour',
      amount: '£100'
    },
    {
      date: '29/06/2016 17:20',
      description:'Physics',
      cancelled: true,
      contractors:[
        {contractor:'Matthew Prior'},
      ],
      contractor_label: 'Tutor',
      units: '1 hour',
      amount: '£100'
    }
  ],

  net_amount: '£200',
  vat_rate: '20%',
  tax_amount: '£40',
  gross_amount: '£240',

  branch_contractor_page_suffix: 'To ease administration Dinosaur Tutors collects fees on behalf of tutors. Please ' +
  'make a single payment to Dinosaur Tutors for the total amount shown on the statement page of this PDF and if paying' +
  ' by BACS or cheque please use the reference number supplied on this statement.'
};

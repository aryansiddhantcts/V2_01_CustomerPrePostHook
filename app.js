const express = require('express');
const app = express();

app.use(express.json());

//-- Start of Authentication setup
const xsenv = require('@sap/xsenv');
const { XssecPassportStrategy, XsuaaService } = require('@sap/xssec'); // ← add XsuaaService
const passport = require('passport');

xsenv.loadEnv();
const services = xsenv.getServices({
  xsuaa: { name: 'preposthook-xsuaa' }, // ← specify service by name
  //xsuaa: { tag: 'xsuaa' } // using tag can have conflict if multiple exist with same name in btp
});

const xsuaaService = new XsuaaService(services.xsuaa); // ← wrap in Service object

passport.use('JWT', new XssecPassportStrategy(xsuaaService)); // ← pass service not raw creds
app.use(passport.initialize());

const checkAuth = passport.authenticate('JWT', { session: false });
//-- End of Authentication setup

//--1. Import customer routes
const customerprehook = require('./routes/customer/route-customer-prehook');
const customerposthook = require('./routes/customer/route-customer-posthook');
app.use('/customer-prehook', checkAuth, customerprehook);
app.use('/customer-posthook', checkAuth, customerposthook);

//--2. Import case routes
const caserprehook = require('./routes/case/route-case-prehook');
const caseposthook = require('./routes/case/route-case-posthook');
app.use('/case-prehook', checkAuth, caserprehook);
app.use('/case-posthook', checkAuth, caseposthook);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
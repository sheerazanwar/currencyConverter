var express = require('express');
var bodyParser = require('body-parser');
var yCurrency = require('y-currency');
var countries = require('countries-list');
var math = require('mathjs');
var port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.get('/getCountries',function(req,res){
    var obj = [];
    var keys= Object.keys(countries['countries']);
    keys.forEach(function(key){
         obj.push({
            name:countries['countries'][key]['name']+[" ("]+countries['countries'][key]['currency']['0']+countries['countries'][key]['currency']['1']+countries['countries'][key]['currency']['2']+[")"],
            currency:countries['countries'][key]['currency']['0']+countries['countries'][key]['currency']['1']+countries['countries'][key]['currency']['2']
        })

    })

    res.send(obj);
});


app.post('/converter', function (req, res) {

    var value = req.body.value;
    var from = req.body.from;
    var to = req.body.to;
    if(value == '0'){
        res.status('400').send('please input value greater than 0.0');
    }else
    if (value != null && from != null && to != null && value!= " " && from != " " && to != " ") {
        yCurrency
            .convert(parseFloat(value), from, to
    , function (err, converted) {
                if (err) {
                    res
                        .status('500')
                        .send(err);
                } else{
                    var rate = converted/parseFloat(value);
                    rate = math.round(rate,4);
                    converted = math.round(converted, 4);
                res.status('200').send({result: converted , rate: rate});
                }
            });
    }else{
        res.status('400').send('please check the perameters, something is missing');
    }

})

app.listen(port, function () {
    console.log('server is now connected on ' + port);
});

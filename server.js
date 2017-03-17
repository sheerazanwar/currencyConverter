var express=require('express');
var parallelfx=require('parallelfx');
var bodyParser=require('body-parser');
var countries = require('countries-list');
var port=process.env.PORT||3000;


var app=express();



app.use(bodyParser.urlencoded({
  extended:true
}));



app.use(bodyParser.json());

app.get('/getCountries',function(req,res){
    var obj = [];
    var keys= Object.keys(countries['countries']);
    keys.forEach(function(key){
        obj.push({
            name:countries['countries'][key]['name'],
            currency:countries['countries'][key]['currency']
        })
    })
    res.send(obj);
});


app.post('/',function(req,res){
    var reqValue = req.body.value;
    var convertFrom = req.body.from;
    var convertTo = req.body.to;
    console.log(req.body);
    parallelfx.convert({value:reqValue, from:convertFrom, to:convertTo}).then(
    function(resp){
        //use the response object  
        //resp = {from: 'XXX', to: 'XXX', value: [converted amount], rate: [exchange_rate]} 
        res.status('200').send(resp);
    },
    function(err){
        res.status('500').send(resp);
        //report error 
    }
);
})



app.listen(port,function(){
  console.log('server is now connected on '+port);
});

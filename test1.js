var express = require('express')
var response = require('./methods.js')
var app = express();

var frequentCalls = response.methods.methodsToPass();
console.log(frequentCalls)


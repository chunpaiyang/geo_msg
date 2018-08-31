var assert = require('assert')
var create_table = require('../src/create_table.js');

describe('simpletest', function() {
    before(() => {
    });

    after(function() {
    });

    it('create dynamodb GeoMsg table', function() {
        create_table({},{})
            .then((data)=>{
                console.log(data);
                console.log("success");
            })
            .catch((err)=>{
                throw new Error(err);
            });
    });
});

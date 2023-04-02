/*Copyright 2019 Evsent

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.*/

/*
Function: buildStringAJV

Creates a string from an list of JSON objects which is generated by
AJV errors
Input:
list with JSONs
Example:
[ { keyword: 'additionalProperties',
     dataPath: '.data',
     schemaPath: '#/properties/data/additionalProperties',
     params: { additionalProperty: 'namererer' },
     message: 'should NOT have additional properties' },
    { keyword: 'required',
      dataPath: '.data',
      schemaPath: '#/properties/data/required',
     params: { missingProperty: 'name' },
     message: 'should have required property \'name\'' } ]

Output:
String with a new line for every JSON in input
Example:
additionalProperty: 'namererer': 'should NOT have additional properties'
missingProperty: 'name': 'should have required property \'name\''
*/

function buildStringAJV(list) {
    var out = new String;
    for (i = 0; i < list.length; i++) {
           var obj = JSON.stringify(list[i].params) + ": " + list[i].message
        out = out + "\n " + obj;
    }
    out = out.replace(/[{}]/g, "");
    return out;
}

module.exports = {buildStringAJV}
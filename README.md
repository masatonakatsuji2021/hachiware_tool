# Hachiware_tool

<a href="https://github.com/masatonakatsuji2021/hachiware_tool/blob/master/LICENSE"><img alt="GitHub license" src="https://img.shields.io/github/license/masatonakatsuji2021/hachiware_tool"></a>
<img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/masatonakatsuji2021/hachiware_tool">
<img alt="GitHub top language" src="https://img.shields.io/github/languages/top/masatonakatsuji2021/hachiware_tool">
<img src="https://img.shields.io/badge/author-Nakatsuji%20Masato-brightgreen" alt="author Nakatsuji Masato">
<img src="https://img.shields.io/badge/made%20in-Japan-brightgreen" alt="made in japan">

Extension library for web framework "Hachiware".

---

## # Sample source

Place the sample source in the test directory in the package.

```
L base64.js
L dateformat.js
L objexists.js
L objget.js
L objset.js
L replaceall.js
L uniqid.js
L icuc.js
L hash.js
L encode.js
```

- base64.js ........ base64 encoding/decoding.
- dateformat.js .... Date format conversion.
- objexists.js ..... Whether the object path exists.
- objget.js ........ Get access to the object path.
- objset.js ........ Specify a value in the specified hierarchy in the object.
- replaceall.js .... Full replacement process.
- uniqid.js ........ Unique random code generation.
- icuc.js .......... Convert only the beginning to uppercase or lowercase..
- hash.js .......... Hash value generation.
- encode.js ........ Encryption or decryption.
---

## # How do you use this?

First, install the npm package with the following command.

```javascript
npm i hachiware_tool
```

All you have to do is add the package require code to index.js   etc. and you're ready to go.

```javascript
const tool = require("hachiware_tool");
```

---

## # base64 encoding/decoding

Methods for encoding to base64 or decoding from base64 format are provided.

The ``base64Encode`` method encodes and the ``base64Decode`` does the decoding.

```javascript
const tool = require("hachiware_tool");

var b64 = tool.base64Encode("hello World!");

console.log(b64);

console.log(tool.base64Decode(b64));
```

---

## # Date format conversion

We have prepared a method that can easily display the date and time by specifying the date format.

For the ``getDateFormat`` method, specify the format string and the target Date object as arguments.

The Date object is optional, and if omitted, the format will be converted to the current date and time.

```javascript
const tool = require("hachiware_tool");

console.log(tool.getDateFormat("{YYYY}{MM}{DD}{HH}{mm}{ss}"));

var d = new Date("1983-01-02 00:15:31");
console.log(tool.getDateFormat("{YYYY}{MM}{DD}{HH}{mm}{ss}", d));

```

In the above case, the result will be displayed at the following date and time.

```
20211222125632
19830102001531
```

The conversion string and each unit are as follows.

|format|Conversion item|
|:--|:--|
|{YYYY}|Year|
|{MM}|Month(Fixed to 2 digits)|
|{M}|Month|
|{DD}|Day(Fixed to 2 digits)|
|{D}|Day|
|{W}|day of week|
|{HH}|O'clock(Fixed to 2 digits)|
|{H}|O'clock|
|{mm}|(Fixed to 2 digits)|
|{m}|Minutes|
|{ss}|Seconds(Fixed to 2 digits)|
|{s}|Seconds|
|{U}|UNIX TIME|
|{DATETIME}|Same meaning as the format below. Date and time<br>{YYYY}/{MM}/{DD} {HH}:{mm}:{ss}|
|{DATE}|Same meaning as the format below. date<br>{YYYY}/{MM}/{DD}|
|{TIME}|Same meaning as the format below. Times of Day<br>{HH}:{mm}:{ss}|

---

## # Whether the object path exists

We provide a method to check the existence of the key in the object variable.

For example, when determining the existence of a value in a deep hierarchy, it must be described as follows.

```javascript
const tool = require("hachiware_tool");

var obj = {
	aaa:{
		bbb:{
			ccc:"dd",
		},
	},
};

var juge = false;
if(obj.aaa){
	if(obj.aaa.bbb){
		if(obj.aaa.bbb.ccc){
			juge = true;
		}
	}
}

if(juge){
	console.log("exists");
}
else{
	console.log("no exists");
}
```

It is necessary to nest the discrimination by if,  
Also, in this description, it is necessary to separately describe the final judgment by leaving the flag to a variable separately for the correspondence when it does not exist.

The ``objExists` method provided in this package can determine the existence or nonexistence with a simple code description by specifying the target object and the target key as the path as arguments.

The return value is a Boolean.

```javascript
const tool = require("hachiware_tool");

var obj = {
	aaa:{
		bbb:{
			ccc:"dd",
		},
	},
};

if(tool.objExists(obj,"aaa.bbb.ccc")){
	console.log("exists");
}
else{
	console.log("no exists");
}
```

This simplifies code writing.

---

## # Get access to the object path

A method provided to get the value inside an object.

Originally, in order to get the value in the deep hierarchy, it is necessary to write the code as follows.

```javascript
const tool = require("hachiware_tool");

var obj = {
	aaa:{
		bbb:{
			ccc:"dd",
		},
	},
};

var get = null;
if(obj.aaa){
	if(obj.aaa.bbb){
		if(obj.aaa.bbb.ccc){
			get = obj.aaa.bbb.ccc;
		}
	}
}

console.log(get);
```

Code is squeezed because the if determination needs to be nested.

The ``objGet` method provided in this package can get the value in the deep hierarchy with a simple code description by specifying the target object and the target key as the path as arguments.

If a value exists for the specified path (key), that value is returned in the return value.
Returns **undefined** if it does not exist.

```javascript
const tool = require("hachiware_tool");

var obj = {
	aaa:{
		bbb:{
			ccc:"dd",
		},
	},
};

var get = tool.objGet(obj,"aaa.bbb.ccc");

console.log(get);
```

Code writing can be simplified.

---

## # Specify a value in the specified hierarchy in the object

Provides methods that allow you to add or change values within a given hierarchy within an object.

In the `` objSet`` method, specify the target object, key path, and specified value as arguments.

```javascript
const tool = require("hachiware_tool");

var obj = {
	aaa: {
		dddd: "eee",
	},
};

obj = tool.objSet(obj,"aaa.bbb.cccc","dd");

console.log(obj);
```

As a result, the contents of the variable obj will be displayed below.  
Items after item bbb are newly added to item aaa.

```
{
	"aaa": {
		"dddd": "eee",
		"bbb": {
			"cccc": "dd"
		}
	}
}
```

---

## # Full replacement process

The ``replaceAll`` method performs the replacement target for all specified characters.

```javascript
const tool = require("hachiware_tool");

var string = "{name} .... {name2} or {name} .... {name}";

console.log(tool.replaceAll("{name}","aaaa",string));
```

---

## # Unique random code generation

By using the ``uniqId`` method, we have prepared a method that makes it easy to randomly create a unique and unique character string.

You can optionally specify the number of digits in the generated string as an argument.  
If not specified, a 32-digit string will be generated by default.

```javascript
const tool = require("hachiware_tool");

console.log(tool.uniqId());
```

The display results are as follows.  
Since it is a random character string, it will be updated when it is output.

```
FCmPRME,u_mO=kbmq63B,JXNa_Y3.EAH
```

---

## # Uppercase or lowercase first letter

If you want to capitalize only the first character of the string, you can easily convert it by using ``ucFirst``.

```javascript
const tool = require("hachiware_tool");

console.log(tool.ucFirst("abcdefg"));
```

On the other hand, if you want to make only the first letter lowercase, use ``lcFirst``.

```javascript
const tool = require("hachiware_tool");

console.log(tool.lcFirst("ABCDEFG"));
```

---

## # Hash value generation

Generate a hash value using the hash algorithm by using the ``hash`` method.  
The hash value generated as the return value is returned.

```javascript
const tool = require("hachiware_tool");

console.log(tool.hash());
```

You can arbitrarily specify the salt at the time of hash generation and the hash format for each argument.  
The salt designation is described as follows.

```javascript
const tool = require("hachiware_tool");

console.log(tool.hash("123456"));
```

To change the hash format, write as follows.  
If omitted, it will be hashed with ``sha25`` by default.
(In this case, change to ``sha512``.)

```javascript
const tool = require("hachiware_tool");

console.log(tool.hash("12345","sha512"));
```

---

## # Random generation of hash values

You can easily generate a hash value randomly by using the ``randomHash`` method.  
Even if you execute `` andomHash`` multiple times in the same state as shown below, the generated hash value will not return the same value.

It can be used to generate a temporary unique hash value such as a one-time token.

```javascript
const tool = require("hachiware_tool");

console.log(tool.randomHash());
console.log(tool.randomHash());
```

Similar to the ``hash`` method. It is possible to specify the salt and hash format arbitrarily with the argument.

```javascript
const tool = require("hachiware_tool");

// Add salt
console.log(tool.randomHash("123456"));

// Hash format change (shs512)
console.log(tool.randomHash(null,"sha512"));
```

---

## # Data encryption and decryption

The ``encode`` method encrypts the data, and the ``decode`` method decrypts the data.

```javascript
const tool = require("hachiware_tool");

var data = "123456";

var enc = tool.encode(data);

console.log(enc);

var dec = tool.decode(enc);

console.log(dec);
```

The key, salt, and encryption format for encryption/decryption can be specified as options as the second argument.

```javascript
const tool = require("hachiware_tool");

var data = "123456";

var option = {
	key: "*********key",			// <= Specify the key>
	salt: "*************salt",		// <= Specify salt>
	method: "aes-512-cbc",			// <= Change encryption format
};

var enc = tool.encode(data, option);

console.log(enc);

var dec = tool.decode(enc, option);

console.log(dec);
```

---

Hachiware_tool
 
License : MIT License.   
Author  : Nakatsuji Masato  
HP URL  : [https://hachiware-js.com/](https://hachiware-js.com/)  
GitHub  : [https://github.com/masatonakatsuji2021/Hachiware_tool](https://github.com/masatonakatsuji2021/Hachiware_tool)  
npm     : [https://www.npmjs.com/package/Hachiware_tool](https://www.npmjs.com/package/Hachiware_tool)

# lambda-excel-example
xlsx file download using aws lambda<br>
<b> Api gateway does not support Stream reponse </b> <br>
So I used a file stream within lambda local.<br>

## excel4node
This module is easy to use <br>
But, this module does not support streams <br>
When you make the big data's excel file, the lambda function's memory can be maxed out <br>
This module uses only buffers <br>

## exceljs
This module is also easy to use <br>
This module support many functions <br>
You'd better use this module if you can <br>


## Usage
1. cd exceljs
2. npm install serverless -g
3. npm i
4. npm start
5. http://localhost:3000/

const http=require('http');
const file=require('fs');

let arr=[];///inmain memory database
let createTabl=[];
let arr1=[];
let max=0;
const server=http.createServer((req,res)=>{
    // res.setHeader('Access-control-Allow-Origin','*');
    // res.setHeader('Access-Control-Allow-Method','OPTIONS,GET,POST');
    // res.setHeader('Access-Control-Allow-Headers','Content-type');
    // if(req.method==='OPTION'){
    //     res.writeHead(204);
    //     res.end();
    //     return;
    // }
    if(req.url==="/" && req.method==='POST'){
        
        // const body=req.body;
    //     console.log(body);
    //     console.log(body.name);
    //     const data=body.name;
    //     const result=execute(data);
    //  console.log(result);
     
    //     res.end("hello");
    let body="";
    req.on('data',chunk=>{
        body+=chunk;
    })
   
    
    req.on('end',()=>{
        
        const data=JSON.parse(body);
        console.log(data);
        const qr=data.name;
        console.log(qr);
        
        const result=execute(qr);
        
        res.end(JSON.stringify(result));
        
       
    })
}
})
server.listen(3000,()=>{
    console.log("server is running");
})
function execute(query) {
    const tokens = query.trim().split(/\s+/);
    const command = tokens[0].toUpperCase();

    switch (command) {
        case "CREATE": return createTable(tokens);
        case "INSERT": return insertInto(tokens);
        case "SELECT": return selectFrom(tokens);
        case "UPDATE": return updateTable(tokens);
        case "DELETE": return deleteFrom(tokens);
        case "JOIN": return   joinTables(tokens);
        case "ORDER": return  orderBy(tokens);
        case "LIMIT": return limitResults(tokens);
        default: throw new Error("Invalid SQL command");
    }
}
function createTable(tokens){
    let tableName = tokens[2];
    // const arr=[{}];
    // file.write('exm.json',arr,(err)=>{
    //     console.log(err);
    
    let obj={tableName:arr1};
    createTabl.push(obj);
    const jsonData1 = JSON.stringify(createTabl);
      file.writeFile('exm.json',jsonData1,(err)=>{
        console.log(err);
      })
    
    // })

    // if (db[tableName]) {
    //     throw new Error(`Table '${tableName}' already exists`);
    // }

    // db[tableName] = [];
    // this.saveDB(db);
    return `Table '${tableName}' created successfully`;
}
async function insertInto(tokens) {
    const tableName = tokens[2];
    // if (!db[tableName]) {
    //     throw new Error(`Table '${tableName}' does not exist`);
    // }

    const columns = tokens.slice(3, tokens.indexOf("VALUES")).join("").replace(/[()]/g, "").split(",");
    console.log(columns);
    const values = tokens.slice(tokens.indexOf("VALUES") + 1).join("").replace(/[()]/g, "").split(",");
    console.log(values);
    
    let row = {};
    columns.forEach((col, i) => row[col.trim()] = values[i].trim().replace(/['"]/g, ""));
    row.id=max;
    arr.push(row);
    console.log(arr);
    max++;
    const jsonData = JSON.stringify(arr, null, 2);
    file.writeFile('exm.json', jsonData, (err) => {
        if (err){      
          console.error('Error writing file:', err);
        } 
        else{
          console.log('File written successfully');
        }
      });
   return arr;

    // return `Row inserted into '${tableName}' successfully`;
}
function selectFrom(tokens) {
    const tableName = tokens[3];
    
    
   
   const data=file.readFileSync('exm.json');
       
       
   

    // if (tokens.includes("ORDER")) {
    //     result = this.orderBy(tokens, result);
    // }

    // if (tokens.includes("LIMIT")) {
    //     result = this.limitResults(tokens, result);
    // }
      return arr;
    // return JSON.parse(data);
}
function updateTable(tokens) {
    const tableName = tokens[1];
   
    
//    const value=file.readFileSync('exm.json');
//     console.log(value);
    
    const setIndex = tokens.indexOf("SET");//which i want to set like age, name , id
    const whereIndex = tokens.indexOf("WHERE"); // update by id
    console.log(setIndex+' '+whereIndex);
//     const updates = tokens.slice(setIndex + 1, whereIndex).join("").split(",");
//     const conditions = tokens.slice(whereIndex + 1).join("").split("=");
    
//     value.forEach(row => {
//         if (row[conditions[0].trim()] == conditions[1].trim()) {
//             updates.forEach(update => {
//                 const [col, value] = update.split("=");
//                 row[col.trim()] = value.trim().replace(/['"]/g, "");
//             });
//         }
//     });
   
    
   
    return `Table '${tableName}' updated successfully`;
}
function deleteFrom(tokens){
    const tableName = tokens[2];
    

    if (!db[tableName]) {
        throw new Error(`Table '${tableName}' does not exist`);
    }

    const conditions = tokens.slice(tokens.indexOf("WHERE") + 1).join("").split("=");
    db[tableName] = db[tableName].filter(row => row[conditions[0].trim()] != conditions[1].trim());
  
    return `Rows deleted from '${tableName}' successfully`;
}

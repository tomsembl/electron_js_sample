var child_process = require("child_process")
var user_list = []

function query_sql() {
  console.log('a')
  var spawn = child_process.spawn,child;
  child = spawn("powershell.exe",["c:\\temp\\helloworld.ps1"]);
  child.stdout.on("data",function(data){user_list = data})
  child.stderr.on("data",function(data){console.log("Powershell Errors: " + data)})
  child.on("exit",function(){console.log("Powershell Script finished")})
  child.stdin.end(); //end input
  child.kill()

}
console.log(user_list)
query_sql()
console.log(user_list)

/*
var spawn = child_process.spawn,child;
child = spawn("powershell.exe",["c:\\temp\\helloworld.ps1"]);
child.stdout.on("data",function(data){
    console.log("Powershell Data: " + data);
});
child.stderr.on("data",function(data){
    console.log("Powershell Errors: " + data);
});
child.on("exit",function(){
    console.log("Powershell Script finished");
});
child.stdin.end(); //end input



const mysql = require('mysql')

function query_sql(){

  const con = mysql.createConnection({
    host: "uataps.gt.local",
    database: "uat_aps_dsql"
    //options: {trustedConnection: true}
  });

  const query = "select top(10) c.cprWinUsrName from cdbrights c  join ocsPtrMgrDeptStaff o on c.cprID = o.pmdObjectInstID where o.pmdObjectID = 3 and c.cprWinUsrName is not null"
  
  con.connect(function(err) {
    if (err) throw err;
    con.query(query, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });


}
query_sql()
*/
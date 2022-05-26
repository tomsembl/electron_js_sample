Function query-sql {param([string]$Querytext) Invoke-Sqlcmd -ServerInstance $SQLServer -Database $SQLdb -Query $Querytext -QueryTimeout 600}

$SQLServer = "aps.gt.local"
$SQLdb = "aps_dsql"
$user_list_path ="user_list.json"
$query = "
select lower(c.cprWinUsrName) as username
from cdbrights c  
join ocsPtrMgrDeptStaff o on c.cprID = o.pmdObjectInstID 
where o.pmdObjectID = 3 
and c.cprWinUsrName is not null
and o.pmdterminationdate is null"

$a = [array](query-sql $query).username | Sort-Object
$b = ConvertTo-Json $a
New-Item -Path $PSScriptRoot -Name $user_list_path -ItemType "file" -Value $b -Force | out-null

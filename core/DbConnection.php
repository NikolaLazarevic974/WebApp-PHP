<?php

namespace app\core;

use mysqli;

class DbConnection
{
    public function connection(): mysqli
    {
        return new mysqli("localhost", "root", "root", "wbis2023");
    }

    public function query($queryString)
    {
        $con = $this->connection();
        $result = $con->query($queryString);

        if ($result === false) {
            error_log("SQL Error: " . $con->error . " Query: " . $queryString);
            return false;
        }
    
        return $result;
    }
    
    public function fetchList($dbResult): array
    {
        $resultArray = [];

        while ($result = $dbResult->fetch_assoc()) {
            $resultArray[] = $result;
        }

        return $resultArray;
    }

    public function fetchOne($dbResult)
    {
        return $dbResult->fetch_assoc();
    }
}
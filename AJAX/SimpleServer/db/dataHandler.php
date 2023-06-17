<?php
include("./models/person.php");
class DataHandler
{
    public function queryPersons()
    {
        $res =  $this->getDemoData();
        return $res;
    }

    public function queryPersonById($id)
    {
        $result = array();
        foreach ($this->queryPersons() as $val) {
            if ($val[0]->id == $id) {
                array_push($result, $val);
            }
        }
        return $result;
    }

    public function queryPersonByName($name)
    {
        $result = array();
        foreach ($this->queryPersons() as $val) {
            if ($val[0]->lastname == $name) {
                array_push($result, $val);
            }
            else if($val[0]->firstname == $name){
                array_push($result, $val);
            }
            else if($name == "All"){
                $result = $this->queryPersons();
                array_push($result);
            }
            /*
            else{
                $result = "Not found";
                echo "<script type='text/javascript'>alert('$result');</script>";
            }*/
        }
        return $result;
    }

    public function addPerson($firstname, $lastname, $email, $phone, $department){
        new Person(6, "Megan", "Smith", "Megan.Smith@fhtw.at", 1234567, "Central IT");
    }

    private static function getDemoData()
    {
        $demodata = [
            [new Person(1, "Jane", "Doe", "jane.doe@fhtw.at", 1234567, "Central IT")],
            [new Person(2, "John", "Doe", "john.doe@fhtw.at", 34345654, "Help Desk")],
            [new Person(3, "baby", "Doe", "baby.doe@fhtw.at", 54545455, "Management")],
            [new Person(4, "Mike", "Smith", "mike.smith@fhtw.at", 343477778, "Faculty")],
            [new Person(5, "John", "Smith", "john.Smith@fhtw.at", 4565434, "Help Desk")],
        ];
        return $demodata;
    }
}

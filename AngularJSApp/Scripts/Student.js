var app = angular.module("myApp", []);
app.controller("myCntrl", function ($scope, $http) {
    $scope.GetAllStudent = function () {
        $http({
            method: "get",
            url: "https://localhost:44352/Home/GetAllStudent"
        }).then(function (response) {
            $scope.Student = response.data;
        }, function () {
            debugger;
            alert("Error Occur!");
        })

    };

    $scope.InsertStudent = function () {
        debugger;
        var type = document.getElementById("insertStd").getAttribute("value");
        if (type == "Submit") {
            $scope.Student = {};
            $scope.Student.Name = $scope.SName;
            $scope.Student.Age = $scope.SAge;
            $scope.Student.Department = $scope.SDepartment;
            $http({
                method: "post",
                url: "https://localhost:44352/Home/InsertStudentRecord",
                datatype: "json",
                data: $scope.Student
            }).then(function (response) { 
                alert(response.data);
                $scope.GetAllStudent();
                $scope.SName = "";
                $scope.SAge = "";
                $scope.SDepartment = "";
            })

        }
        else {

            $scope.Student = {};
            $scope.Student.ID = sessionStorage.getItem("SID");
            $scope.Student.Name = $scope.SName;
            $scope.Student.Age = $scope.SAge;
            $scope.Student.Department = $scope.SDepartment;
            $http({
                method: "post",
                url: "https://localhost:44352/Home/UpdateStudentRecord",
                datatype: "json",
                data: JSON.stringify($scope.Student)
            }).then(function (response) {
                alert(response.data);
                $scope.GetAllStudent();
                $scope.SName = "";
                $scope.SAge = "";
                $scope.SDepartment = "";
                document.getElementById("insertStd").setAttribute("value", "Submit");
            })
          
        }
    };

    $scope.UpDateStudent = function (Std) {
        debugger;
        sessionStorage.setItem("SID", Std.ID);
        $scope.SName = Std.Name;
        $scope.SAge = Std.Age;
        $scope.SDepartment = Std.Department;
        document.getElementById("insertStd").setAttribute("value", "Update");

    };

    $scope.DeleteStudent = function (Std) {
        $http({
            method: "post",
            url: "https://localhost:44352/Home/DeleteStudent",
            typedata: "json",
            data: JSON.stringify(Std)
        }).then(function (response) {
            alert("Deleted Successfully");
            $scope.GetAllStudent();
        })
    };

});
